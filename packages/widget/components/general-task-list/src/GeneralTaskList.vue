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
                        <template #toUrl>
                            <sdxu-button
                                :plain="true"
                                v-if="item.showOpenIde"
                            >
                                进入SkyIDE
                            </sdxu-button>
                            <div v-if="item.showJupyterLink">
                                <sdxu-button
                                    :plain="true"
                                >
                                    进入Jupyter Lab
                                </sdxu-button>
                                <sdxu-button
                                    :plain="true"
                                >
                                    进入Jupyter NoteBook
                                </sdxu-button>
                            </div>
                            <sdxu-button
                                :plain="true"
                                v-if="item.showRunningInfo"
                            >
                                查看执行记录
                            </sdxu-button>
                        </template>
                        <template #operations>
                            <sdxu-button
                                v-for="(el, i) in getOperationList(item, false, true)"
                                :key="i"
                                :icon="el.icon"
                                :plain="true"
                                @click="handleOperation(el.value, item)"
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
import { getTaskList } from '@sdx/utils/src/api/task';
import taskMixin from '@sdx/utils/src/mixins/task';
import locale from '@sdx/utils/src/mixins/locale';
import TaskRunningLimit from '@sdx/widget/components/task-running-limit';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import { STATE_MAP_FOLD_LABEL_TYPE } from '@sdx/utils/src/const/task';
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
                CONTAINERDEV: {
                    name: '自定义容器',
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
            taskList: [],
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
    props: {
        projectId: {
            type: String,
            default: ''
        },
        taskType: {
            type: String,
            default: 'dev'
        },
        taskName: {
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
            this.loading = hideLoading ? false : true;
            const params = {
                name: this.taskName,
                ...paginate(this.current, this.pageSize),
                order: this.order,
                orderBy: this.orderBy,
                projectId: this.projectId,
                taskType: this.taskType
            };
            getTaskList(params).then(res => {
                this.taskList = res.items;
                this.total = res.total;
                this.loading = false;
                this.taskList.forEach(item => {
                    const isOwn = getUser().userId === item.owner.uuid;
                    item.showOpenIde = item.type === 'SKYIDE';
                    item.showJupyterLink = item.type === 'JUPYTER';
                    item.showRunningInfo = item.type === 'SKYFLOW';
                    item.meta = {
                        uuid: '123',
                        owner: {uuid: 'd565e2c9-ee81-40b2-8acd-10f4359a6242'},
                        title: item.name,
                        description: item.description,
                        creator: item.ownerName,
                        createdAt: item.createdAt,
                        showEdit: isOwn,
                        showRemove: isOwn,
                        type: 'task',
                        icon: this.iconOptions[item.type].icon,
                        iconName: this.iconOptions[item.type].name,
                        state: {}
                    };
                    item.meta.state.type = STATE_MAP_FOLD_LABEL_TYPE[item.state];
                    switch(item.state) {
                        case 'CREATED':
                            item.meta.state.status = '';
                            item.meta.state.statusText = this.t('view.task.state.CREATED');
                            break;
                        case 'LAUNCHING':
                            item.meta.state.status = 'loading';
                            item.meta.state.statusText = this.t('view.task.state.LAUNCHING');
                            break;
                        case 'LAUNCH_ABNORMAL':
                            item.meta.state.status = 'warning';
                            item.meta.state.statusText = this.t('view.task.state.LAUNCH_ABNORMAL');
                            break;
                        case 'RUNNING':
                            item.meta.state.status = 'loading';
                            item.meta.state.statusText = this.t('view.task.state.RUNNING');
                            break;
                        case 'FINISHED':
                            item.meta.state.status = '';
                            item.meta.state.statusText = this.t('view.task.state.FINISHED');
                            break;
                        case 'KILLED':
                            item.meta.state.status = '';
                            item.meta.state.statusText = this.t('view.task.state.KILLED');
                            break;
                        case 'FAILED':
                            item.meta.state.status = 'warning';
                            item.meta.state.statusText = this.t('view.task.state.FAILED');
                            break;
                        case 'KILLING':
                            item.meta.state.status = 'loading';
                            item.meta.state.statusText = this.t('view.task.state.KILLING');
                            break;
                        default:
                            break;
                    }
                });
            });
        },
        currentChange(val) {
            this.current = val;
            this.initList();
        }
    }
};
</script>
