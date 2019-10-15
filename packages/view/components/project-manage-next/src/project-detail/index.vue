<template>
    <div class="sdxv-project-detail">
        <sdxu-content-panel
            class="sdxv-project-detail__create-task"
            v-auth.project.button="'TASK:CREATE'"
        >
            <div class="sdxv-project-detail__create-task--content">
                <div
                    v-for="(tool,index) in taskOptions"
                    :key="index"
                    class="sdxv-project-detail__task-card"
                >
                    <div class="sdxv-project-detail__task-card-header">
                        {{ tool.name }}
                    </div>
                    <div class="sdxv-project-detail__task-card-content">
                        <div
                            v-for="(task, index1) in tool.tasks"
                            :key="index1"
                            class="sdxv-project-detail__task"
                            @click.capture="createTask(task)"
                        >
                            <task-icon :icon-class="task.class" />
                            <span
                                class="sdxv-project-detail__task--name"
                                style="width: 160px"
                            >{{ task.name }}</span>
                            <SdxuIconButton
                                icon="sdx-icon sdx-icon-circle-plus"
                                class="sdxv-project-detail__task--button"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </sdxu-content-panel>
        <sdxu-content-panel
            class="sdxv-project-detail__task-list"
            :title="t('view.project.taskList')"
            v-loading="loading"
        >
            <div
                slot="right"
                class="sdxv-project-detail__actions"
            >
                <sdxu-input
                    v-model="searchName"
                    type="search"
                    size="small"
                    :placeholder="t('view.project.enterTaskName')"
                    style="width: 300px;"
                />
                <sdxu-button
                    size="small"
                    @click="searchTask"
                    style="margin: 0 30px 0 20px;"
                >
                    {{ t('sdxCommon.Search') }}
                </sdxu-button>
                <SdxuSortButton
                    :title="t('view.project.sortByCreateTime')"
                    @sortChange="sortChange"
                    :order.sync="order"
                />
            </div>
            <div class="sdxv-project-detail__content">
                <div v-if="taskList.length">
                    <div>
                        <!-- <sdxw-task-running-limit style="margin: 10px 0 20px 0;" /> -->
                        <!-- <task-card-list>
                            <task-card
                                v-for="(item, index) in taskList"
                                :key="index"
                                :meta="item"
                            >
                                <template #footer>
                                    <SdxuIconButton
                                        v-for="(el, i) in getOperationList(item)"
                                        :key="i"
                                        :icon="el.icon"
                                        :title="t(el.label)"
                                        @click="handleOperation(el.value, item)"
                                    />
                                </template>
                            </task-card>
                        </task-card-list> -->
                        <sdxw-subject-card-list>
                            <sdxw-subject-card
                                v-for="(item, index) in taskList"
                                :key="index"
                                :meta="item.meta"
                                @operate="handleOperate"
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
            </div>
            <div
                class="sdxv-project-detail__footer"
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
        </sdxu-content-panel>
    </div>
</template>

<script>
import ContentPanel from '@sdx/ui/components/content-panel';
import Input from '@sdx/ui/components/input';
import Button from '@sdx/ui/components/button';
import Pagination from '@sdx/ui/components/pagination';
import IconButton from '@sdx/ui/components/icon-button';
import SortButton from '@sdx/ui/components/sort-button';
import Empty from '@sdx/ui/components/empty';
// import TaskCard from './TaskCard';
// import TaskCardList from './TaskCardList';
import SubCard from '@sdx/widget/components/subject-card';
import { paginate } from '@sdx/utils/src/helper/tool';
import TaskIcon from './TaskIcon';
import { getTaskList } from '@sdx/utils/src/api/task';
import auth from '@sdx/widget/components/auth';
import taskMixin from '@sdx/utils/src/mixins/task';
import locale from '@sdx/utils/src/mixins/locale';
import TaskRunningLimit from '@sdx/widget/components/task-running-limit';
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import { STATE_MAP_FOLD_LABEL_TYPE } from '@sdx/utils/src/const/task';
export default {
    name: 'SdxvProjectDetail',
    mixins: [taskMixin, locale],
    data() {
        return {
            searchName: '',
            current: 1,
            pageSize: 10,
            total: 0,
            order: 'desc',
            orderBy: 'createdAt',
            taskList: [],
            loading: false,
            refreshTimer: null,
            iconOptions: {
                SKYIDE: 'sdx-skyIDElogo',
                CONTAINERDEV: 'sdx-Apache_Spark_logo',
                JUPYTER: 'sdx-Jupter',
                SKYFLOW: 'sdx-icon-tensorboard'
            },
            taskOptions: [
                {
                    name: '开发工具',
                    tasks: [
                        {
                            name: '新建Jupyter',
                            class: 'Jupter',
                            type: 'JUPYTER'
                        },
                        {
                            name: '新建SkyIDE',
                            class: 'icon-python',
                            type: 'PYTHON'
                        },
                        {
                            name: '自定义容器',
                            class: 'Apache_Spark_logo',
                            type: 'SPARK'
                        }
                    ]
                },
                {
                    name: '可视化分析与建模',
                    tasks: [
                        {
                            name: '新建SkyFlow',
                            class: 'icon-tensorflow',
                            type: 'TENSORFLOW_AUTO_DIST'
                        }
                    ]
                }
            ],
            clientWidth: 1500
        };
    },
    created() {
        this.initList();
        this.fetchDataMinxin = this.initList;
    },
    directives: {
        auth
    },
    beforeDestroy () {
        clearInterval(this.refreshTimer);
        this.refreshTimer = null;
    },
    components: {
        [ContentPanel.name]: ContentPanel,
        [Input.name]: Input,
        [Button.name]: Button,
        [IconButton.name]: IconButton,
        [SortButton.name]: SortButton,
        [Pagination.name]: Pagination,
        [TaskRunningLimit.name]: TaskRunningLimit,
        [Empty.name]: Empty,
        TaskIcon,
        [SubCard.SubjectCard.name]: SubCard.SubjectCard,
        [SubCard.SubjectCardList.name]: SubCard.SubjectCardList,
        // TaskCard,
        // TaskCardList
    },
    methods: {
        searchTask() {
            this.initList();
        },
        createTask(task) {
            this.$router.push(
                {
                    name: 'CreateTask',
                    params: {
                        type: task.type,
                        projectId: this.$route.params.id
                    }
                }
            );
        },
        initList(hideLoading) {
            if (this._isDestroyed) {
                clearInterval(this.refreshTimer);
                this.refreshTimer = null;
            }
            this.loading = hideLoading ? false : true;
            const params = {
                name: this.searchName,
                ...paginate(this.current, this.pageSize),
                order: this.order,
                orderBy: this.orderBy,
                projectId: this.$route.params.id
            };
            getTaskList(params).then(res => {
                this.taskList = res.items;
                this.total = res.total;
                this.loading = false;
                this.taskList.forEach(item => {
                    const isOwn = getUser().userId === item.owner.uuid;
                    item.showOpenIde = item.type === 'SKYIDE';
                    // item.showJupyterLink = item.type === 'JUPYTER' && item.state === 'RUNNING' && item.externalUrl;
                    item.showJupyterLink = item.type === 'JUPYTER';
                    item.meta = {
                        title: item.name,
                        description: item.description,
                        creator: item.ownerName,
                        createdAt: item.createdAt,
                        showEdit: isOwn,
                        showRemove: isOwn,
                        type: 'task',
                        icon: this.iconOptions[item.type],
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
                // if (this.taskList.length && this.taskList.find(item => (item.state === 'LAUNCHING' || item.state === 'RUNNING' || item.state === 'KILLING'))) {
                //     if (!this.refreshTimer) {
                //         this.refreshTimer = setInterval(this.initList, 3000, true);
                //     }
                // } else {
                //     clearInterval(this.refreshTimer);
                //     this.refreshTimer = null;
                // }
            });
        },
        currentChange(val) {
            this.current = val;
            this.initList();
        },
        sortChange() {
            this.initList();
        },
        handleOperate() {

        }
        // handleOperate(operation) {
        //     // console.log('operation', operation);
        //     switch(operation.type) {
        //     case 'start':
        //         MessageBox({
        //             title: '确定运行该任务吗？',
        //             content: ''
        //         }).then(() => {
        //             startTask(operation.item.uuid).then(() => {
        //                 Message({
        //                     message: '运行成功',
        //                     type: 'success'
        //                 });
        //                 this.initList();
        //             });
        //         }).catch(() => {});
        //         break;
        //     case 'kill':
        //         MessageBox({
        //             title: '确定停止该任务吗？',
        //             content: ''
        //         }).then(() => {
        //             stopTask(operation.item.uuid).then(() => {
        //                 Message({
        //                     message: '停止成功',
        //                     type: 'success'
        //                 });
        //                 this.initList();
        //             });
        //         }).catch(() => {});
        //         break;
        //     case 'detail':
        //         this.$router.push({
        //             name: 'TaskInfo',
        //             params: {
        //                 type: operation.item.type,
        //                 taskId: operation.item.uuid
        //             }
        //         });
        //         break;
        //     case 'edit':
        //         this.$router.push({
        //             name: 'EditTask',
        //             params: {
        //                 type: operation.item.type,
        //                 taskId: operation.item.uuid,
        //                 projectId: this.$route.params.id
        //             }
        //         });
        //         break;
        //     case 'remove':
        //         MessageBox({
        //             title: '确定删除吗？',
        //             content: '删除后将不可恢复'
        //         }).then(() => {
        //             removeTask(operation.item.uuid).then(() => {
        //                 Message({
        //                     message: '删除成功',
        //                     type: 'success'
        //                 });
        //                 this.initList();
        //             });
        //         }).catch(() => {});
        //         break;
        //     default:
        //         break;
        //     }
        // }
    }
};
</script>
