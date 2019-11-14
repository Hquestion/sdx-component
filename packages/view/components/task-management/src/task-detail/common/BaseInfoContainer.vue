<template>
    <div class="sdxv-base-info-container">
        <div class="sdxv-base-info-container__item">
            <SdxwExpandLabel :label="t('view.task.RunningInformation')">
                <template #right>
                    <!-- todo: -->
                </template>
            </SdxwExpandLabel>
            <SdxvInfoContainer>
                <SdxvInfoItem
                    v-if="isSPARK"
                    :label="t('view.task.MainClassName')"
                    :value="task.mainClass"
                />
                <SdxvInfoItem
                    v-if="isPYTHON || isSPARK || isTENSORFLOW_AUTO_DIST || isTENSORFLOW || isTENSORFLOW_DIST"
                    :label="t('view.task.SourceCode')"
                    :value="task.sourcePaths[0]"
                />
                <SdxvInfoItem
                    :label="t('view.task.RuntimeEnvironment')"
                    :value="task && task.image && task.image.name || ''"
                />
                <SdxvInfoItem :label="t('view.task.taskState')">
                    <template #value>
                        <SdxwFoldLabel
                            :plain="true"
                            :type="task && STATE_MAP_FOLD_LABEL_TYPE[task.state] || ''"
                            :status="stateIcon"
                        >
                            {{ task && t(STATE_TYPE_LABEL[task.state]) || '-' }}
                        </SdxwFoldLabel>
                    </template>
                </SdxvInfoItem>
                <SdxvInfoItem
                    v-if="isTENSORBOARD"
                    :label="t('view.task.LogDirectory')"
                    :value="task.logPaths[0]"
                />
                <SdxvInfoItem
                    v-if="isJUPYTER"
                    :label="t('view.task.InstanceCount')"
                    :value="task.resourceConfig.EXECUTOR_INSTANCES"
                />
                <SdxvInfoItem
                    v-if="isPYTHON || isSPARK || isTENSORFLOW_AUTO_DIST || isTENSORFLOW || isTENSORFLOW_DIST"
                    :label="t('view.task.StartupParameter')"
                    :value="task.args"
                />
                <SdxvInfoItem
                    v-if="isTENSORFLOW_AUTO_DIST"
                    :label="t('view.task.TrainingOutputDirectory')"
                    :value="task.outputPaths[0]"
                />
                <SdxvInfoItem
                    v-if="isCONTAINERDEV"
                    label="IP"
                    :value="task.ip"
                />
                <SdxvInfoItem
                    v-if="isCONTAINERDEV"
                    :label="t('view.task.Port')"
                    :value="task.assignedPort"
                />
                <SdxvInfoItem
                    :label="t('view.task.StartupTime')"
                    :value="task && dateFormatter(task.startedAt) || ''"
                />
                <SdxvInfoItem
                    :label="t('view.task.StopTime')"
                    :value="task && dateFormatter(task.stoppedAt) || ''"
                />
                <SdxvInfoItem
                    :label="t('view.task.RunningTime')"
                    :value="task ? dealTime(task.startedAt, task.stoppedAt) : ''"
                />
                <SdxvInfoItem
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
                </SdxvInfoItem>
                <SdxvInfoItem
                    v-if="isJUPYTER && isRunning"
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
                </SdxvInfoItem>
            </SdxvInfoContainer>
        </div>
        <div class="sdxv-base-info-container__item">
            <SdxwExpandLabel :label="t('view.task.ResourceInformation')" />
            <template v-if="isTENSORFLOW_AUTO_DIST || isTENSORFLOW_DIST">
                <SdxvInfoContainer
                    v-if="!isTENSORFLOW_DIST"
                    :background="true"
                >
                    <SdxvInfoItem
                        :label="t('view.task.MainNodeCPU')"
                        :value="milliCoreToCore(task && task.resourceConfig && task.resourceConfig.TF_MASTER_CPUS || 0) + t('view.task.Core')"
                    />
                    <SdxvInfoItem
                        :label="t('view.task.MainNodeMemory')"
                        :value="byteToGb(task && task.resourceConfig && task.resourceConfig.TF_MASTER_MEMORY || 0) + 'GB'"
                    />
                </SdxvInfoContainer>
                <SdxvInfoContainer>
                    <SdxvInfoItem
                        :label="t('view.task.ParametricServerCPU')"
                        :value="milliCoreToCore(task && task.resourceConfig && task.resourceConfig.TF_PS_CPUS || 0) + t('view.task.Core')"
                    />
                    <SdxvInfoItem
                        :label="t('view.task.ParametricServerMemory')"
                        :value="byteToGb(task && task.resourceConfig && task.resourceConfig.TF_PS_MEMORY || 0) + 'GB'"
                    />
                    <SdxvInfoItem
                        :label="t('view.task.ParametricServerInstanceCount')"
                        :value="task && task.resourceConfig && (task.resourceConfig.TF_PS_INSTANCES || task.resourceConfig.TF_EXECUTOR_INSTANCES) || 0 + t('view.task.Count')"
                    />
                </SdxvInfoContainer>
                <SdxvInfoContainer :background="true">
                    <SdxvInfoItem
                        :label="t('view.task.ComputationalNodeCPU')"
                        :value="milliCoreToCore(task && task.resourceConfig && task.resourceConfig.TF_WORKER_CPUS || 0) + t('view.task.Core')"
                    />
                    <SdxvInfoItem
                        :label="t('view.task.ComputationalNodeMemory')"
                        :value="byteToGb(task && task.resourceConfig && task.resourceConfig.TF_WORKER_MEMORY || 0) + 'GB'"
                    />
                    <SdxvInfoItem
                        :label="t('view.task.ComputationalNodeGPU')"
                        :value="task && task.resourceConfig && task.resourceConfig.TF_WORKER_GPUS || 0 + t('view.task.Block')"
                    />
                    <SdxvInfoItem
                        :label="t('view.task.ComputationalNodeInstanceCount')"
                        :value="task && task.resourceConfig && (task.resourceConfig.TF_WORKER_INSTANCES || task.resourceConfig.TF_EXECUTOR_INSTANCES) || 0 + t('view.task.Count')"
                    />
                </SdxvInfoContainer>
            </template>
            <template v-else-if="isDATA_SERVICE || isSPARK">
                <SdxvInfoContainer>
                    <SdxvInfoItem
                        :label="t('view.task.DriverCPU')"
                        :value="milliCoreToCore(task && task.resourceConfig && task.resourceConfig.SPARK_DRIVER_CPUS || 0) + t('view.task.Core')"
                    />
                    <SdxvInfoItem
                        :label="t('view.task.DriverMemory')"
                        :value="byteToGb(task && task.resourceConfig && task.resourceConfig.SPARK_DRIVER_MEMORY || 0) + 'GB'"
                    />
                </SdxvInfoContainer>
                <SdxvInfoContainer>
                    <SdxvInfoItem
                        :label="t('view.task.ExectorCPU')"
                        :value="milliCoreToCore(task && task.resourceConfig && task.resourceConfig.SPARK_EXECUTOR_CPUS || 0) + t('view.task.Core')"
                    />
                    <SdxvInfoItem
                        :label="t('view.task.ExectorMemory')"
                        :value="byteToGb(task && task.resourceConfig && task.resourceConfig.SPARK_EXECUTOR_MEMORY || 0) + 'GB'"
                    />
                    <SdxvInfoItem
                        :label="t('view.task.ExectorInstanceCount')"
                        :value="task && task.resourceConfig && task.resourceConfig.SPARK_EXECUTOR_INSTANCES || 0 + t('view.task.Count')"
                    />
                </SdxvInfoContainer>
            </template>
            <template v-else>
                <SdxvInfoContainer>
                    <SdxvInfoItem
                        label="CPU"
                        :value="milliCoreToCore(task && task.resourceConfig && task.resourceConfig.EXECUTOR_CPUS || 0) + t('view.task.Core')"
                    />
                    <SdxvInfoItem
                        v-if="!isTENSORBOARD"
                        label="GPU"
                        :value="(task && task.resourceConfig && task.resourceConfig.EXECUTOR_GPUS || 0) + t('view.task.Block')"
                    />
                    <SdxvInfoItem
                        :label="t('view.task.Memory')"
                        :value="byteToGb(task && task.resourceConfig && task.resourceConfig.EXECUTOR_MEMORY || 0) + 'GB'"
                    />
                </SdxvInfoContainer>
            </template>
        </div>
        <div class="sdxv-base-info-container__item">
            <SdxwExpandLabel :label="t('view.task.DataInformation')" />
            <DataInfo 
                :is-empty="!hasDataInfo"
                :datasources="task.datasources"
                :datasets="task.datasets"
            />
        </div>
    </div>
</template>

<script>
import DataInfo from './DataInfo';
import locale from '@sdx/utils/src/mixins/locale';
import MixinDetail from '../MixinDetail';
import auth from '@sdx/widget/components/auth';
import SdxwExpandLabel from '@sdx/widget/components/expand-label';
import SdxvInfoContainer from './InfoContainer';
import SdxvInfoItem from './InfoItem';
import SdxwFoldLabel from '@sdx/widget/components/fold-label';
import SdxvSaveAsDialog from './SaveAsDialog';

export default {
    name: 'BaseInfoContainer',
    mixins: [locale, MixinDetail],
    directives: {
        auth
    },
    components: {
        DataInfo,
        SdxvInfoContainer,
        SdxvInfoItem,
        SdxwExpandLabel: SdxwExpandLabel.ExpandLabel,
        [SdxwFoldLabel.FoldLabel.name]: SdxwFoldLabel.FoldLabel
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
