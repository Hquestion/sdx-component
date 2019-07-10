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
                        :type="STATE_MAP_FOLD_LABEL_TYPE[task.state]"
                        :status="stateIcon"
                    >
                        {{ STATE_TYPE_LABEL[task.state] }}
                    </SdxwFoldLabel>
                </template>
            </SdxvBaseInfoItem>
            <SdxvBaseInfoItem
                label="创建人"
                :value="task.owner && task.owner.fullName || ''"
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
                :value="task.image && task.image.name || ''"
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
                :value="dealTime(task.runningAt, task.stoppedAt)"
            />
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
        <template #log-info>
            <SdxuEmpty
                v-if="!hasLog"
                empty-content="暂时还没日志哦"
                empty-type="sdx-wushuju"
            />
            <SdxvLogList
                v-else
                :pods="task.pods"
            />
        </template>
        <template #realtime-monitor>
            <SdxuEmpty
                v-if="!hasRealMonitor"
                empty-content="暂时还没实时监控哦"
                empty-type="sdx-wushuju"
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
    name: 'SdxvPythonDetail',
    mixins: [MixinDetail]
};
</script>

<style>

</style>
