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
                    @search="searchTask"
                />
                <sdxu-button
                    size="small"
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
        </sdxu-content-panel>
    </div>
</template>

<script>
import ContentPanel from '@sdx/ui/components/content-panel';
import Input from '@sdx/ui/components/input';
import Button from '@sdx/ui/components/button';
import IconButton from '@sdx/ui/components/icon-button';
import TaskIcon from './TaskIcon';
import { } from '@sdx/utils/src/api/project';
export default {
    name: 'SdxvProjectDetail',
    data() {
        return {
            searchName: '',
            taskOptions: [
                {
                    name: '开发工具',
                    tasks: [
                        {
                            name: 'Jupter',
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
    components: {
        [ContentPanel.name]: ContentPanel,
        [Input.name]: Input,
        [Button.name]: Button,
        [IconButton.name]: IconButton,
        TaskIcon
    },
    methods: {
        searchTask() {
            console.log('11111111');
        },
        createTask(task) {
            console.log('task', task);
            this.$router.push(
                `/sdxv-project-manage/createTask/${task.type}/${this.$route.params.id}`
            );
        }
    }
};
</script>

<style scoped lang="scss">
</style>
