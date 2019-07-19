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
                {{ t('view.task.SaveAsImage') }}
            </SdxuButton>
            <SdxvSaveAsDialog
                :visible.sync="dialogVisible"
                :task="task"
            />
        </template>
        <template #base-info>
            <SdxvBaseInfoItem
                :label="t('view.task.taskName')"
                :value="task && task.name || ''"
                :multi-line="true"
            />
            <SdxvBaseInfoItem :label="t('view.task.taskState')">
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
                :label="t('sdxCommon.Creator')"
                :value="task && task.owner && task.owner.fullName || ''"
            />
            <SdxvBaseInfoItem
                v-if="isModelTask"
                :label="t('view.task.taskType')"
                :value="t(TASK_TYPE_LABEL[task.type])"
            />
            <SdxvBaseInfoItem
                :label="t('view.task.TaskDescription')"
                :value="task && task.description || ''"
            />
        </template>
        <template #running-info>
            <SdxvBaseInfoItem
                v-if="isSPARK"
                :label="t('view.task.MainClassName')"
                :value="task.mainClass"
            />
            <SdxvBaseInfoItem
                v-if="isPYTHON || isSPARK || isTENSORFLOW_AUTO_DIST || isTENSORFLOW || isTENSORFLOW_DIST"
                :label="t('view.task.SourceCode')"
                :value="task.sourcePaths[0]"
            />
            <SdxvBaseInfoItem
                :label="t('view.task.RuntimeEnvironment')"
                :value="task && task.image && task.image.name || ''"
            />
            <SdxvBaseInfoItem
                v-if="isTENSORBOARD"
                :label="t('view.task.LogDirectory')"
                :value="task.logPaths[0]"
            />
            <SdxvBaseInfoItem
                v-if="isJUPYTER"
                :label="t('view.task.InstanceCount')"
                :value="task.resourceConfig.EXECUTOR_INSTANCES"
            />
            <SdxvBaseInfoItem
                v-if="isPYTHON || isSPARK || isTENSORFLOW_AUTO_DIST || isTENSORFLOW || isTENSORFLOW_DIST"
                :label="t('view.task.StartupParameter')"
                :value="task.args"
            />
            <SdxvBaseInfoItem
                v-if="isTENSORFLOW_AUTO_DIST"
                :label="t('view.task.TrainingOutputDirectory')"
                :value="task.outputPaths[0]"
            />
            <SdxvBaseInfoItem
                v-if="isCONTAINERDEV"
                label="IP"
                :value="task.ip"
            />
            <SdxvBaseInfoItem
                v-if="isCONTAINERDEV"
                :label="t('view.task.Port')"
                :value="task.assignedPort"
            />
            <SdxvBaseInfoItem
                :label="t('view.task.StartupTime')"
                :value="task && task.runningAt || ''"
            />
            <SdxvBaseInfoItem
                :label="t('view.task.StopTime')"
                :value="task && task.stoppedAt || ''"
            />
            <SdxvBaseInfoItem
                :label="t('view.task.RunningTime')"
                :value="task ? dealTime(task.runningAt, task.stoppedAt) : ''"
            />
            <SdxvBaseInfoItem
                v-if="isCONTAINERDEV"
                :label="t('view.task.PageTerminal')"
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
                :label="t('view.task.ExternalLinks')"
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
                        :label="t('view.task.MainNodeCPU')"
                        :value="milliCoreToCore(task && task.resourceConfig ? task.resourceConfig.TF_MASTER_CPUS : 0) + t('view.task.Core')"
                        :strip="true"
                    />
                    <SdxvBaseInfoItem
                        :label="t('view.task.MainNodeMemory')"
                        :value="byteToGb(task && task.resourceConfig ? task.resourceConfig.TF_MASTER_MEMORY : 0) + 'GB'"
                        :strip="true"
                    />
                </div>
                <div class="sdxv-info-container">
                    <SdxvBaseInfoItem
                        :label="t('view.task.ParametricServerCPU')"
                        :value="milliCoreToCore(task && task.resourceConfig ? task.resourceConfig.TF_PS_CPUS : 0) + t('view.task.Core')"
                        :strip="true"
                    />
                    <SdxvBaseInfoItem
                        :label="t('view.task.ParametricServerMemory')"
                        :value="byteToGb(task && task.resourceConfig ? task.resourceConfig.TF_PS_MEMORY : 0) + 'GB'"
                        :strip="true"
                    />
                    <SdxvBaseInfoItem
                        :label="t('view.task.ParametricServerInstanceCount')"
                        :value="task && task.resourceConfig ? task.resourceConfig.TF_EXECUTOR_INSTANCES : 0 + t('view.task.Count')"
                        :strip="true"
                    />
                </div>
                <div class="sdxv-info-container is-background">
                    <SdxvBaseInfoItem
                        :label="t('view.task.ComputationalNodeCPU')"
                        :value="milliCoreToCore(task && task.resourceConfig ? task.resourceConfig.TF_WORKER_CPUS : 0) + t('view.task.Core')"
                        :strip="true"
                    />
                    <SdxvBaseInfoItem
                        :label="t('view.task.ComputationalNodeMemory')"
                        :value="byteToGb(task && task.resourceConfig ? task.resourceConfig.TF_WORKER_MEMORY : 0) + 'GB'"
                        :strip="true"
                    />
                    <SdxvBaseInfoItem
                        :label="t('view.task.ComputationalNodeGPU')"
                        :value="task && task.resourceConfig ? task.resourceConfig.TF_WORKER_GPUS : 0 + t('view.task.Block')"
                        :strip="true"
                    />
                    <SdxvBaseInfoItem
                        :label="t('view.task.ComputationalNodeInstanceCount')"
                        :value="task && task.resourceConfig ? task.resourceConfig.TF_EXECUTOR_INSTANCES : 0 + t('view.task.Count')"
                        :strip="true"
                    />
                </div>
            </template>
            <template v-else-if="isDATA_SERVICE || isSPARK">
                <div class="sdxv-info-container">
                    <SdxvBaseInfoItem
                        :label="t('view.task.DriverCPU')"
                        :value="milliCoreToCore(task && task.resourceConfig ? task.resourceConfig.SPARK_DRIVER_CPUS : 0) + t('view.task.Core')"
                        :strip="true"
                    />
                    <SdxvBaseInfoItem
                        :label="t('view.task.DriverMemory')"
                        :value="byteToGb(task && task.resourceConfig ? task.resourceConfig.SPARK_DRIVER_MEMORY : 0) + 'GB'"
                        :strip="true"
                    />
                </div>
                <div class="sdxv-info-container">
                    <SdxvBaseInfoItem
                        :label="t('view.task.ExectorCPU')"
                        :value="milliCoreToCore(task && task.resourceConfig ? task.resourceConfig.SPARK_EXECUTOR_CPUS : 0) + t('view.task.Core')"
                        :strip="true"
                    />
                    <SdxvBaseInfoItem
                        :label="t('view.task.ExectorMemory')"
                        :value="byteToGb(task && task.resourceConfig ? task.resourceConfig.SPARK_EXECUTOR_MEMORY : 0) + 'GB'"
                        :strip="true"
                    />
                    <SdxvBaseInfoItem
                        :label="t('view.task.ExectorInstanceCount')"
                        :value="task && task.resourceConfig ? task.resourceConfig.SPARK_EXECUTOR_INSTANCES : 0 + t('view.task.Count')"
                        :strip="true"
                    />
                </div>
            </template>
            <template v-else>
                <div class="sdxv-info-container">
                    <SdxvBaseInfoItem
                        label="CPU"
                        :value="milliCoreToCore(task && task.resourceConfig ? task.resourceConfig.EXECUTOR_CPUS : 0) + t('view.task.Core')"
                        :strip="true"
                    />
                    <SdxvBaseInfoItem
                        v-if="!isTENSORBOARD"
                        label="GPU"
                        :value="(task && task.resourceConfig ? task.resourceConfig.EXECUTOR_GPUS : 0) + t('view.task.Block')"
                        :strip="true"
                    />
                    <SdxvBaseInfoItem
                        :label="t('view.task.Memory')"
                        :value="byteToGb(task && task.resourceConfig ? task.resourceConfig.EXECUTOR_MEMORY : 0) + 'GB'"
                        :strip="true"
                    />
                </div>
            </template>
        </template>
        <template #data-info>
            <SdxuEmpty
                v-if="!hasDataInfo"
                :empty-content="t('view.task.NoDataInfo')"
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
                :empty-content="t('view.task.NoLog')"
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
                :empty-content="t('view.task.NoRealMonitor')"
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
