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
                                :style="clientWidth > 2060 ? 'width: 160px' : 'width: 92px'"
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
                        <sdxw-task-running-limit style="margin: 10px 0 20px 0;" />
                        <task-card-list>
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
                        </task-card-list>
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
import TaskCard from './TaskCard';
import TaskCardList from './TaskCardList';
import { paginate } from '@sdx/utils/src/helper/tool';
import TaskIcon from './TaskIcon';
import { getTaskList } from '@sdx/utils/src/api/project';
import auth from '@sdx/widget/components/auth';
import taskMixin from '@sdx/utils/src/mixins/task';
import locale from '@sdx/utils/src/mixins/locale';
import TaskRunningLimit from '@sdx/widget/components/task-running-limit';
import { getClientWidth } from '@sdx/utils/lib/helper/dom';
import debounce from '@sdx/utils/src/helper/debounce';
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
            taskOptions: [
                {
                    name: this.t('view.project.modelDev'),
                    tasks: [
                        {
                            name: 'Jupyter',
                            class: 'Jupter',
                            type: 'JUPYTER'
                        }
                    ]
                },
                {
                    name: this.t('view.project.modelTraining'),
                    tasks: [
                        {
                            name: 'Python',
                            class: 'icon-python',
                            type: 'PYTHON'
                        },
                        {
                            name: 'Spark',
                            class: 'Apache_Spark_logo',
                            type: 'SPARK'
                        },
                        {
                            name: 'TensorFlow',
                            class: 'icon-tensorflow',
                            type: 'TENSORFLOW'

                        },
                        {
                            name: this.t('view.task.officiaType.TENSORFLOW_DIST'),
                            class: 'icon-tensorflow',
                            type: 'TENSORFLOW_DIST'
                        },
                        {
                            name: this.t('view.task.officiaType.TENSORFLOW_AUTO_DIST'),
                            class: 'icon-tensorflow',
                            type: 'TENSORFLOW_AUTO_DIST'
                        }
                    ]
                },
                {
                    name: this.t('view.project.modelAssess'),
                    tasks: [

                        {
                            name: 'TensorBoard',
                            class: 'icon-tensorboard',
                            type: 'TENSORBOARD'
                        }
                    ]
                },
                {
                    name: this.t('view.task.type.CONTAINERDEV'),
                    tasks: [
                        {
                            name: 'ContainerDev',
                            class: 'icon-docker',
                            type: 'CONTAINERDEV'
                        }
                    ]
                },
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
    mounted() {
        this.clientWidth = getClientWidth();
        this.__resizeHanlder = debounce(() => {
            this.clientWidth = getClientWidth();
        }, 300);
        window.addEventListener('resize', this.__resizeHanlder);
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.__resizeHanlder);
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
        TaskCard,
        TaskCardList
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
                if (this.taskList.length && this.taskList.find(item => (item.state === 'LAUNCHING' || item.state === 'RUNNING' || item.state === 'KILLING'))) {
                    if (!this.refreshTimer) {
                        this.refreshTimer = setInterval(this.initList, 3000, true);
                    }
                } else {
                    clearInterval(this.refreshTimer);
                    this.refreshTimer = null;
                }
            });
        },
        currentChange(val) {
            this.current = val;
            this.initList();
        },
        sortChange() {
            this.initList();
        },
        getClientWidth
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
