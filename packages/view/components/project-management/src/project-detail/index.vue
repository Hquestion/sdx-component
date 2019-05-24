<template>
    <div class="sdxv-project-detail">
        <sdxu-content-panel class="sdxv-project-detail__create-task">
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
                            <span class="sdxv-project-detail__task--name">{{ task.name }}</span>
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
            title="任务列表"
        >
            <div
                slot="right"
                class="sdxv-project-detail__actions"
            >
                <sdxu-input
                    v-model="searchName"
                    type="search"
                    size="small"
                    placeholder="请输入任务名"
                    style="margin-right: 10px;"
                />
                <sdxu-button
                    size="small"
                    @click="searchTask"
                >
                    搜索
                </sdxu-button>
                <sdxu-button
                    size="small"
                    type="default"
                >
                    按创建时间升序
                    <i class="sdx-icon sdx-paixu" />
                </sdxu-button>
            </div>
            <div
                class="sdxv-project-detail__content"
            >
                <task-card-list v-loading="loading">
                    <task-card
                        @operate="handleOperate"
                        v-for="(item, index) in taskList"
                        :key="index"
                        :meta="item"
                    />
                </task-card-list>
            </div>
            <div class="sdxv-project-detail__footer">
                <div />
                <sdxu-pagination
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
import MessageBox from '@sdx/ui/components/message-box';
import TaskCard from './TaskCard';
import TaskCardList from './TaskCardList';
import TaskIcon from './TaskIcon';
import { Message } from 'element-ui';
import { getTaskList, removeTask, startTask, stopTask } from '@sdx/utils/src/api/project';
export default {
    name: 'SdxvProjectDetail',
    data() {
        return {
            searchName: '',
            current: 1,
            pageSize: 10,
            total: 0,
            taskList: [],
            loading: false,
            taskOptions: [
                {
                    name: '开发工具',
                    tasks: [
                        {
                            name: 'Jupyter',
                            class: 'Jupter',
                            type: 'JUPYTER'
                        }
                    ]
                },
                {
                    name: '自定义容器',
                    tasks: [
                        {
                            name: 'ContainerDev',
                            class: 'icon-docker',
                            type: 'CONTAINER_DEV'
                        }
                    ]
                },
                {
                    name: '建模任务',
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
                            name: 'TensorFlow单机版',
                            class: 'icon-tensorflow',
                            type: 'TENSORFLOW'

                        },
                        {
                            name: 'TensorFlow分布式',
                            class: 'icon-tensorflow',
                            type: 'TENSORFLOW_DIST'
                        },
                        {
                            name: 'TensorFlow自动并行',
                            class: 'icon-tensorflow',
                            type: 'TENSORFLOW_AUTO_DIST'
                        },
                        {
                            name: 'TensorBoard',
                            class: 'icon-tensorboard',
                            type: 'TENSORBOARD'
                        }
                    ]
                }
            ]
        };
    },
    created() {
        this.initList();
    },
    components: {
        [ContentPanel.name]: ContentPanel,
        [Input.name]: Input,
        [Button.name]: Button,
        [IconButton.name]: IconButton,
        [Pagination.name]: Pagination,
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
        initList() {
            this.loading = true;
            const params = {
                name: this.searchName,
                start: this.current,
                count: this.pageSize,
                order: 'asc',
                orderBy: '',
                projectId: this.$route.params.id
            };
            getTaskList(params).then(res => {
                this.taskList = res.data.items;
                this.total = res.data.total;
                this.loading = false;
            });
        },
        currentChange(val) {
            this.current = val;
            this.initList();
        },
        handleOperate(operation) {
            console.log('operation', operation);
            switch(operation.type) {
            case 'start':
                MessageBox({
                    title: '确定运行该任务吗？',
                    content: ''
                }).then(() => {
                    startTask(operation.item.uuid).then(() => {
                        Message({
                            message: '运行成功',
                            type: 'success'
                        });
                        this.initList();
                    });
                }).catch(() => {});
                break;
            case 'kill':
                MessageBox({
                    title: '确定停止该任务吗？',
                    content: ''
                }).then(() => {
                    stopTask(operation.item.uuid).then(() => {
                        Message({
                            message: '停止成功',
                            type: 'success'
                        });
                        this.initList();
                    });
                }).catch(() => {});
                break;
            case 'detail':
                this.$router.push({
                    name: 'TaskInfo',
                    params: {
                        type: operation.item.type,
                        taskId: operation.item.uuid
                    }
                });
                break;
            case 'edit':
                this.$router.push({
                    name: 'EditTask',
                    params: {
                        type: operation.item.type,
                        taskId: operation.item.uuid,
                        projectId: this.$route.params.id
                    }
                });
                break;
            case 'remove':
                MessageBox({
                    title: '确定删除吗？',
                    content: '删除后将不可恢复'
                }).then(() => {
                    removeTask(operation.item.uuid).then(() => {
                        Message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.initList();
                    });
                }).catch(() => {});
                break;
            default:
                break;
            }
        }
    }
};
</script>

<style scoped lang="scss">
</style>