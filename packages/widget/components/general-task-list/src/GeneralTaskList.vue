<template>
    <div
        class="sdxw-general-task-list"
        v-loading="loading"
    >
        <div v-if="taskList.length">
            <div>
                <SdxwTaskRunningLimit style="margin-top: 20px;" />
                <sdxw-subject-card-list
                    class="sdxw-general-task-list__container"
                >
                    <sdxw-subject-card
                        v-for="(item, index) in taskList"
                        :key="index"
                        :meta="item.meta"
                        class="sdxw-general-task-list__container--element"
                    >
                        <template #footerLeft>
                            <sdxu-button
                                type="link"
                                v-if="item.showOpenIde"
                                @click="gotoIde(item)"
                            >
                                {{ t('view.task.EnterIde') }}
                            </sdxu-button>
                            <div v-if="item.showJupyterLink">
                                <sdxu-button
                                    type="link"
                                    @click="handleExternalLink(item, 'lab?')"
                                >
                                    {{ t('view.task.EnterJupyterlab') }}
                                </sdxu-button>
                                <sdxu-button
                                    type="link"
                                    @click="handleExternalLink(item, 'tree?')"
                                >
                                    {{ t('view.task.EnterNotebook') }}
                                </sdxu-button>
                            </div>
                            <sdxu-button
                                type="link"
                                v-if="item.showRunningInfo"
                            >
                                {{ t('view.task.ShowRunningRecord') }}
                            </sdxu-button>
                        </template>
                        <template #footerRight>
                            <sdxu-button
                                v-for="(el, i) in getOperationList(item, false, true)"
                                :key="i"
                                :icon="el.icon"
                                @click="handleOperation(el.value, item, projectId)"
                                type="text"
                            >
                                {{ t(el.label) }}
                            </sdxu-button>
                        </template>
                    </sdxw-subject-card>
                </sdxw-subject-card-list>
            </div>
        </div>
        <SdxuEmpty v-else />
        <div
            class="sdxw-general-task-list__footer"
            slot="footer"
        >
            <div />
            <sdxu-pagination
                v-if="total"
                :current-page.sync="current"
                :page-size="pageSize"
                :total="total"
                @current-change="currentChange"
            />
        </div>
    </div>
</template>

<script>
import Button from '@sdx/ui/components/button';
import Pagination from '@sdx/ui/components/pagination';
import Empty from '@sdx/ui/components/empty';
import SubCard from '@sdx/widget/components/subject-card';
import { paginate } from '@sdx/utils/src/helper/tool';
import { taskList } from '@sdx/utils/src/api/task';
import { getProjectTasks } from '@sdx/utils/src/api/project';
import taskMixin from '@sdx/utils/src/mixins/taskNext';
import locale from '@sdx/utils/src/mixins/locale';
import TaskRunningLimit from '@sdx/widget/components/task-running-limit';
// import { getUser } from '@sdx/utils/src/helper/shareCenter';
import { STATE_MAP_FOLD_LABEL_TYPE, STATE_TYPE_LABEL } from '@sdx/utils/src/const/task';
export default {
    name: 'SdxwGeneralTaskList',
    mixins: [taskMixin, locale],
    data() {
        return {
            current: 1,
            pageSize: 10,
            total: 0,
            refreshTimer: null,
            iconOptions: {
                SKYIDE: {
                    name: 'SkyIDE',
                    icon: 'sdx-SkyIDErenwu'
                },
                CONTAINER_DEV: {
                    name: this.t('view.task.type.CONTAINERDEV'),
                    icon: 'sdx-zidingyirongqirenwu'
                },
                JUPYTER: {
                    name: 'Jupyter',
                    icon: 'sdx-Jupyterrenwu'
                },
                SKYFLOW: {
                    name: 'SkyFlow',
                    icon: 'sdx-skyflowrenwu'
                }
            },
            loading: false,
            taskList: []
        };
    },
    components: {
        [Button.name]: Button,
        [Pagination.name]: Pagination,
        [TaskRunningLimit.name]: TaskRunningLimit,
        [Empty.name]: Empty,
        [SubCard.SubjectCard.name]: SubCard.SubjectCard,
        [SubCard.SubjectCardList.name]: SubCard.SubjectCardList
    },
    created() {
        this.initList();
        this.fetchDataMinxin = this.initList;
    },
    beforeDestroy () {
        clearInterval(this.refreshTimer);
        this.refreshTimer = null;
    },
    props: {
        projectId: {
            type: String,
            default: ''
        },
        taskCategory: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        order: {
            type: String,
            default: ''
        },
        orderBy: {
            type: String,
            default: ''
        }
    },
    methods: {
        initList(hideLoading) {
            if (this._isDestroyed) {
                clearInterval(this.refreshTimer);
                this.refreshTimer = null;
            }
            this.loading = hideLoading ? false : true;
            const params = {
                name: this.name,
                ...paginate(this.current, this.pageSize),
                order: this.order,
                orderBy: this.orderBy,
            };

            if (this.projectId) {
                params.taskCategory = this.taskCategory;
                getProjectTasks(this.projectId, params).then(res => {
                    this.handleResp(res);
                }).catch(() => {
                    this.loading = false;
                    this.taskList = [];
                });
            } else {
                taskList(params).then(res => {
                    this.handleResp(res);
                }).catch(() => {
                    this.loading = false;
                    this.taskList = [];
                });
            }
        },
        gotoIde(item) {
            window.open(`/#/sdxv-skyide/${item.uuid}`);
        },
        currentChange(val) {
            this.current = val;
            this.initList();
        },
        handleExternalLink(meta, param) {
            window.open(`${meta.externalUrl}/` + (param ? `${param}` : ''));
        },
        handleResp(res) {
            this.taskList = res.items || res.data;
            this.total = res.total;
            this.loading = false;
            if (this.taskList.length && this.taskList.find(item => (item.state === 'Terminating' || item.state === 'Running' || item.state === 'Pending' || item.state === 'Scheduling' || item.state === 'Error'))) {
                if (!this.refreshTimer && !this._isDestroyed) {
                    this.refreshTimer = setInterval(this.initList, 3000, true);
                }
            } else {
                clearInterval(this.refreshTimer);
                this.refreshTimer = null;
            }
            this.taskList.forEach(item => {
                // const isOwn = getUser().userId === item.owner.uuid;
                // const isOwn = getUser().userId === item.owner_id;
                item.showOpenIde = item.type === 'SKYIDE';
                item.showJupyterLink = item.type === 'JUPYTER' && item.state === 'Running' && item.externalUrl;
                item.showRunningInfo = item.type === 'SKYFLOW';
                item.meta = {
                    uuid: item.uuid,
                    owner: item.owner,
                    title: item.name,
                    description: item.description,
                    creator: item.owner.fullName,
                    createdAt: item.createdAt,
                    icon: this.iconOptions[item.type].icon,
                    iconName: this.iconOptions[item.type].name,
                    state: {}
                };
                item.meta.state.type = STATE_MAP_FOLD_LABEL_TYPE[item.state];
                switch(item.state) {
                    case 'Created':
                        item.meta.state.status = '';
                        item.meta.state.statusText = STATE_TYPE_LABEL[item.state];
                        break;
                    case 'Scheduling':
                    case 'Pending':
                        item.meta.state.status = 'loading';
                        item.meta.state.statusText = STATE_TYPE_LABEL[item.state];
                        break;
                    case 'Failed':
                        item.meta.state.status = 'warning';
                        item.meta.state.statusText = STATE_TYPE_LABEL[item.state];
                        break;
                    case 'Running':
                        item.meta.state.status = 'loading';
                        item.meta.state.statusText = STATE_TYPE_LABEL[item.state];
                        break;
                    case 'Succeeded':
                        item.meta.state.status = '';
                        item.meta.state.statusText = STATE_TYPE_LABEL[item.state];
                        break;
                    case 'Terminated':
                        item.meta.state.status = '';
                        item.meta.state.statusText = STATE_TYPE_LABEL[item.state];
                        break;
                    case 'Error':
                        item.meta.state.status = 'warning';
                        item.meta.state.statusText = STATE_TYPE_LABEL[item.state];
                        break;
                    case 'Terminating':
                        item.meta.state.status = 'loading';
                        item.meta.state.statusText = STATE_TYPE_LABEL[item.state];
                        break;
                    default:
                        break;
                }
            });
        }
    }
};
</script>
