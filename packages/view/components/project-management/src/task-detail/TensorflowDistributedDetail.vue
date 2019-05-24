<template>
    <SdxvDetailContainer>
        <template #base-info>
            <SdxvBaseInfoItem
                label="任务名称"
                :value="task.name"
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
                :multi-line="true"
            />
        </template>
        <template #running-info>
            <SdxvBaseInfoItem
                label="源代码"
                :value="task.sourcePaths[0]"
            />
            <SdxvBaseInfoItem
                label="运行环境"
                :value="task.dockerImageName"
            />
            <SdxvBaseInfoItem
                label="启动参数"
                :value="task.args"
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
        </template>
        <template #resource-info>
            <div class="sdxv-info-container is-background">
                <SdxvBaseInfoItem
                    label="参数服务器CPU"
                    :value="milliCoreToCore(task.resourceConfig.TF_PS_CPUS) + '核'"
                    :strip="true"
                />
                <SdxvBaseInfoItem
                    label="参数服务器内存"
                    :value="byteToGb(task.resourceConfig.TF_PS_MEMORY) + 'GB'"
                    :strip="true"
                />
                <SdxvBaseInfoItem
                    label="参数服务器实例个数"
                    :value="task.resourceConfig.TF_EXECUTOR_INSTANCES + '个'"
                    :strip="true"
                />
            </div>
            <div class="sdxv-info-container">
                <SdxvBaseInfoItem
                    label="计算节点CPU"
                    :value="milliCoreToCore(task.resourceConfig.TF_WORKER_CPUS) + '核'"
                    :strip="true"
                />
                <SdxvBaseInfoItem
                    label="计算节点内存"
                    :value="byteToGb(task.resourceConfig.TF_WORKER_MEMORY) + 'GB'"
                    :strip="true"
                />
                <SdxvBaseInfoItem
                    label="计算节点GPU"
                    :value="task.resourceConfig.TF_WORKER_GPUS + '块'"
                    :strip="true"
                />
                <SdxvBaseInfoItem
                    label="计算节点实例个数"
                    :value="task.resourceConfig.TF_EXECUTOR_INSTANCES + '个'"
                    :strip="true"
                />
            </div>
        </template>
        <template #log-info>
            <SdxvHasNothing
                v-if="!task.pods.length"
                tips="暂时还没Log日志哦"
            />
            <SdxvLogList
                v-else
                :pods="task.pods"
            />
        </template>
        <template #realtime-monitor>
            <SdxvHasNothing
                v-if="!task.pods.length"
                tips="暂时还没实时监控哦"
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
    name: 'SdxvTensorflowDistributedDetail',
    mixins: [MixinDetail]
};
</script>

<style>

</style>
