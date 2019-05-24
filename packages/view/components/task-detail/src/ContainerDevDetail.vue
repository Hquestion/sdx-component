<template>
    <SdxvDetailContainer>
        <template
            v-if="task.state.name === STATE_TYPE.RUNNING"
            #base-info-right
        >
            <SdxuButton @click="dialogVisible = true">
                另存为镜像
            </SdxuButton>
            <SdxvSaveAsDialog
                :visible.sync="dialogVisible"
                :task="task"
            />
        </template>
        <template #base-info>
            <SdxvBaseInfoItem
                label="任务名称"
                :value="task.name"
                :multi-line="true"
            />
            <SdxvBaseInfoItem label="任务状态">
                <template #value>
                    <SdxwFoldLabel
                        :plain="true"
                        :type="STATE_MAP_FOLD_LABEL_TYPE[task.state.name]"
                        :status="stateIcon"
                    >
                        {{ task.state.label }}
                    </SdxwFoldLabel>
                </template>
            </SdxvBaseInfoItem>
            <SdxvBaseInfoItem
                label="创建人"
                :value="task.user.name"
            />
            <SdxvBaseInfoItem
                label="任务描述"
                :value="task.description"
            />
        </template>
        <template #running-info>
            <SdxvBaseInfoItem
                label="运行环境"
                :value="task.dockerImageName"
            />
            <SdxvBaseInfoItem
                label="IP"
                :value="task.ip"
            />
            <SdxvBaseInfoItem
                label="端口"
                :value="task.assignedPort"
            />
            <SdxvBaseInfoItem
                label="启动时间"
                :value="task.runningAt"
            />
            <SdxvBaseInfoItem
                label="停止时间"
                :value="task.stoppedAt"
            />
            <SdxvBaseInfoItem
                label="运行时长"
                :value="dealTime(task.runningAt, task.stoppedAt || new Date())"
            />
            <SdxvBaseInfoItem
                v-if="task.externalUrl"
                label="页面终端"
            >
                <template
                    #value
                >
                    <span
                        class="sdxv-task-detail__external"
                        :plain="true"
                        @click="goTerminal()"
                    >
                        {{ task.externalUrl }}
                    </span>
                </template>
            </SdxvBaseInfoItem>
        </template>
        <template #resource-info>
            <div class="sdxv-info-container">
                <SdxvBaseInfoItem
                    label="CPU"
                    :value="milliCoreToCore(task.resourceConfig.EXECUTOR_CPUS) + '核'"
                    :strip="true"
                />
                <SdxvBaseInfoItem
                    label="GPU"
                    :value="task.resourceConfig.EXECUTOR_GPUS + '块'"
                    :strip="true"
                />
                <SdxvBaseInfoItem
                    label="内存"
                    :value="byteToGb(task.resourceConfig.EXECUTOR_MEMORY) + 'GB'"
                    :strip="true"
                />
            </div>
        </template>
        <template #data-info>
            <SdxvHasNothing
                v-if="!task.datasources.length && !task.datasets.length"
                :tips="暂时还没数据信息哦"
            />
            <SdxvDataInfo
                v-else
                :datasources="task.datasources"
                :datasets="task.datasets"
            />
        </template>
        <template #log-info>
            <SdxvHasNothing
                v-if="!task.pods.length"
                :tips="暂时还没Log日志哦"
            />
            <SdxvLogList
                v-else
                :pods="task.pods"
            />
        </template>
        <template #realtime-monitor>
            <SdxvHasNothing
                v-if="!task.pods.length"
                :tips="暂时还没实时监控哦"
            />
            <SdxvMonitorInfo
                v-else
                :pods="task.pods"
            />
        </template>
    </SdxvDetailContainer>
</template>

<script>
import MixinDetail from './MixinDetail';

export default {
    name: 'SdxvContainerDevDetail',
    mixins: [MixinDetail],
    data() {
        return {
            dialogVisible: false
        };
    },
    methods: {
        goTerminal() {
            window.open(this.task.external_url);
        }
    }

};
</script>

<style>

</style>
