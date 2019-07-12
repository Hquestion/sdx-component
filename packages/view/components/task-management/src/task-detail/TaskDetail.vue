<template>
    <SdxvDetailContainer>
        <template
            v-if="showSaveAsImage"
            #base-info-right
        >
            <SdxuButton
                v-auth.project.button="'TASK:SAVE_IMAGE'"
                @click="dialogVisible = true"
            >
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
                :value="task && task.name || ''"
                :multi-line="true"
            />
            <SdxvBaseInfoItem label="任务状态">
                <template #value>
                    <SdxwFoldLabel
                        :plain="true"
                        :type="task && STATE_MAP_FOLD_LABEL_TYPE[task.state] || ''"
                        :status="stateIcon"
                    >
                        {{ task && t(STATE_TYPE_LABEL[task.state]) || '-' }}
                    </SdxwFoldLabel>
                </template>
            </SdxvBaseInfoItem>
            <SdxvBaseInfoItem
                label="创建人"
                :value="task && task.owner && task.owner.fullName || ''"
            />
            <SdxvBaseInfoItem
                v-if="isModelTask"
                label="任务类型"
                :value="t(TASK_TYPE_LABEL[task.type])"
            />
            <SdxvBaseInfoItem
                label="任务描述"
                :value="task && task.description || ''"
            />
        </template>
        <template #running-info>
            <SdxvBaseInfoItem
                v-if="isSPARK"
                label="主类名称"
                :value="task.mainClass"
            />
            <SdxvBaseInfoItem
                v-if="isPYTHON || isSPARK || isTENSORFLOW_AUTO_DIST || isTENSORFLOW || isTENSORFLOW_DIST"
                label="源代码"
                :value="task.sourcePaths[0]"
            />
            <SdxvBaseInfoItem
                label="运行环境"
                :value="task && task.image && task.image.name || ''"
            />
            <SdxvBaseInfoItem
                v-if="isTENSORBOARD"
                label="日志目录"
                :value="task.logPaths[0]"
            />
            <SdxvBaseInfoItem
                v-if="isJUPYTER"
                label="实例个数"
                :value="task.resourceConfig.EXECUTOR_INSTANCES"
            />
            <SdxvBaseInfoItem
                v-if="isPYTHON || isSPARK || isTENSORFLOW_AUTO_DIST || isTENSORFLOW || isTENSORFLOW_DIST"
                label="启动参数"
                :value="task.args"
            />
            <SdxvBaseInfoItem
                v-if="isTENSORFLOW_AUTO_DIST"
                label="训练输出目录"
                :value="task.outputPaths[0]"
            />
            <SdxvBaseInfoItem
                v-if="isCONTAINERDEV"
                label="IP"
                :value="task.ip"
            />
            <SdxvBaseInfoItem
                v-if="isCONTAINERDEV"
                label="端口"
                :value="task.assignedPort"
            />
            <SdxvBaseInfoItem
                label="启动时间"
                :value="task && task.runningAt || ''"
            />
            <SdxvBaseInfoItem
                label="停止时间"
                :value="task && task.stoppedAt || ''"
            />
            <SdxvBaseInfoItem
                label="运行时长"
                :value="task ? dealTime(task.runningAt, task.stoppedAt) : ''"
            />
            <SdxvBaseInfoItem
                v-if="isCONTAINERDEV"
                label="页面终端"
            >
                <template
                    #value
                >
                    <span
                        v-if="task.externalUrl"
                        class="sdxv-task-detail__external"
                        :plain="true"
                        @click="goTerminal()"
                    >
                        {{ task.externalUrl }}
                    </span>
                    <span v-else>
                        -
                    </span>
                </template>
            </SdxvBaseInfoItem>
            <SdxvBaseInfoItem
                v-if="isJUPYTER"
                label="外部链接"
            >
                <template
                    #value
                >
                    <span
                        class="sdxv-task-detail__external"
                        :plain="true"
                        @click="goJupyter('lab?')"
                    >
                        Jupyter lab
                    </span>
                    <span
                        class="sdxv-task-detail__external"
                        :plain="true"
                        @click="goJupyter('tree?')"
                    >
                        Jupyter notebook
                    </span>
                </template>
            </SdxvBaseInfoItem>
        </template>
        <template #resource-info>
            <template v-if="isTENSORFLOW_AUTO_DIST || isTENSORFLOW_DIST">
                <div 
                    v-if="!isTENSORFLOW_DIST"
                    class="sdxv-info-container is-background"
                >
                    <SdxvBaseInfoItem
                        label="主节点CPU"
                        :value="milliCoreToCore(task && task.resourceConfig ? task.resourceConfig.TF_MASTER_CPUS : 0) + '核'"
                        :strip="true"
                    />
                    <SdxvBaseInfoItem
                        label="主节点内存"
                        :value="byteToGb(task && task.resourceConfig ? task.resourceConfig.TF_MASTER_MEMORY : 0) + 'GB'"
                        :strip="true"
                    />
                </div>
                <div class="sdxv-info-container">
                    <SdxvBaseInfoItem
                        label="参数服务器CPU"
                        :value="milliCoreToCore(task && task.resourceConfig ? task.resourceConfig.TF_PS_CPUS : 0) + '核'"
                        :strip="true"
                    />
                    <SdxvBaseInfoItem
                        label="参数服务器内存"
                        :value="byteToGb(task && task.resourceConfig ? task.resourceConfig.TF_PS_MEMORY : 0) + 'GB'"
                        :strip="true"
                    />
                    <SdxvBaseInfoItem
                        label="参数服务器实例个数"
                        :value="task && task.resourceConfig ? task.resourceConfig.TF_EXECUTOR_INSTANCES : 0 + '个'"
                        :strip="true"
                    />
                </div>
                <div class="sdxv-info-container is-background">
                    <SdxvBaseInfoItem
                        label="计算节点CPU"
                        :value="milliCoreToCore(task && task.resourceConfig ? task.resourceConfig.TF_WORKER_CPUS : 0) + '核'"
                        :strip="true"
                    />
                    <SdxvBaseInfoItem
                        label="计算节点内存"
                        :value="byteToGb(task && task.resourceConfig ? task.resourceConfig.TF_WORKER_MEMORY : 0) + 'GB'"
                        :strip="true"
                    />
                    <SdxvBaseInfoItem
                        label="计算节点GPU"
                        :value="task && task.resourceConfig ? task.resourceConfig.TF_WORKER_GPUS : 0 + '块'"
                        :strip="true"
                    />
                    <SdxvBaseInfoItem
                        label="计算节点实例个数"
                        :value="task && task.resourceConfig ? task.resourceConfig.TF_EXECUTOR_INSTANCES : 0 + '个'"
                        :strip="true"
                    />
                </div>
            </template>
            <template v-else-if="isDATA_SERVICE || isSPARK">
                <div class="sdxv-info-container">
                    <SdxvBaseInfoItem
                        label="驱动器CPU"
                        :value="milliCoreToCore(task && task.resourceConfig ? task.resourceConfig.SPARK_DRIVER_CPUS : 0) + '核'"
                        :strip="true"
                    />
                    <SdxvBaseInfoItem
                        label="驱动器内存"
                        :value="byteToGb(task && task.resourceConfig ? task.resourceConfig.SPARK_DRIVER_MEMORY : 0) + 'GB'"
                        :strip="true"
                    />
                </div>
                <div class="sdxv-info-container">
                    <SdxvBaseInfoItem
                        label="执行器CPU"
                        :value="milliCoreToCore(task && task.resourceConfig ? task.resourceConfig.SPARK_EXECUTOR_CPUS : 0) + '核'"
                        :strip="true"
                    />
                    <SdxvBaseInfoItem
                        label="执行器内存"
                        :value="byteToGb(task && task.resourceConfig ? task.resourceConfig.SPARK_EXECUTOR_MEMORY : 0) + 'GB'"
                        :strip="true"
                    />
                    <SdxvBaseInfoItem
                        label="执行器实例数"
                        :value="task && task.resourceConfig ? task.resourceConfig.SPARK_EXECUTOR_INSTANCES : 0 + '个'"
                        :strip="true"
                    />
                </div>
            </template>
            <template v-else>
                <div class="sdxv-info-container">
                    <SdxvBaseInfoItem
                        label="CPU"
                        :value="milliCoreToCore(task && task.resourceConfig ? task.resourceConfig.EXECUTOR_CPUS : 0) + '核'"
                        :strip="true"
                    />
                    <SdxvBaseInfoItem
                        v-if="!isTENSORBOARD"
                        label="GPU"
                        :value="(task && task.resourceConfig ? task.resourceConfig.EXECUTOR_GPUS : 0) + '块'"
                        :strip="true"
                    />
                    <SdxvBaseInfoItem
                        label="内存"
                        :value="byteToGb(task && task.resourceConfig ? task.resourceConfig.EXECUTOR_MEMORY : 0) + 'GB'"
                        :strip="true"
                    />
                </div>
            </template>
        </template>
        <template #data-info>
            <SdxuEmpty
                v-if="!hasDataInfo"
                empty-content="暂时还没数据信息哦"
                empty-type="sdx-wushuju"
            />
            <SdxvDataInfo
                v-else
                :datasources="task.datasources"
                :datasets="task.datasets"
            />
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
import locale from '@sdx/utils/src/mixins/locale';
import auth from '@sdx/widget/components/auth';

export default {
    name: 'SdxvTaskDetail',
    mixins: [MixinDetail, locale],
    directives: {
        auth
    },
    data() {
        return {
            dialogVisible: false
        };
    },
    methods: {
        goTerminal() {
            window.open(this.task.external_url);
        },
        goJupyter(param) {
            window.open(`${this.task.external_url}/${param}`);
        }
    }

};
</script>

<style>

</style>
