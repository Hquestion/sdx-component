<template>
    <div class="sdxv-base-info-container">
        <div class="sdxv-base-info-container__item">
            <SdxwExpandLabel :label="t('view.task.RunningInformation')">
                <template #right>
                    <SdxuButton
                        v-if="isJUPYTER || isSKYIDE || isCONTAINERDEV"
                        type="link"
                        @click="handleSaveAsImage"
                    >
                        {{ t('view.task.SaveAsImage') }}
                    </SdxuButton>
                </template>
            </SdxwExpandLabel>
            <SdxvInfoContainer>
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
                    v-if="isSKYIDE"
                    :label="t('view.task.FilePath')"
                    :value="task.home_path"
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
                <!-- // todo: 列表 -->
                <SdxvInfoItem
                    v-if="isCONTAINERDEV"
                    :label="t('view.task.EnvVars')"
                    :value="task.environments"
                />
                <SdxvInfoItem
                    v-if="isCONTAINERDEV"
                    :label="t('view.task.StartCommand')"
                    :value="task.startCommand"
                />
                <SdxvInfoItem
                    v-if="isCONTAINERDEV"
                    :label="t('view.task.StartupParameter')"
                    :value="task.startArgs"
                />
                <!-- // todo: 结果输出 -->
                <!-- <SdxvInfoItem
                    v-if="isCONTAINERDEV"
                    :label="t('view.task.结果输出')"
                    :value="task.args"
                /> -->
                <SdxvInfoItem
                    v-if="isCONTAINERDEV"
                    :whole-line="true"
                    :label="t('view.task.PortRoute')"
                >
                    <template #value>
                        <SdxuTable
                            :light="true"
                            :data="task.forwardPorts"
                            :empty-text="t('sdxCommon.NoData')"
                        >
                            <el-table-column
                                prop="protocol"
                                :label="t('view.task.Protocol')"
                            />
                            <el-table-column
                                prop="port"
                                :label="t('view.task.Port')"
                            />
                            <el-table-column
                                prop="link"
                                :label="t('view.task.Link')"
                            />
                        </SdxuTable>
                    </template>
                </SdxvInfoItem>
            </SdxvInfoContainer>
        </div>
        <div class="sdxv-base-info-container__item">
            <SdxwExpandLabel :label="t('view.task.ResourceInformation')" />
            <!-- // todo: data service -->
            <!-- <template v-if="isDATA_SERVICE || isSPARK">
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
            </template> -->
            <template>
                <SdxvInfoContainer>
                    <SdxvInfoItem
                        label="CPU"
                        :value="milliCoreToCore(task && task.resourceConfig && task.resourceConfig.EXECUTOR_CPUS || 0) + t('view.task.Core')"
                    />
                    <SdxvInfoItem
                        label="GPU"
                        :value="(task && task.resourceConfig && task.resourceConfig.EXECUTOR_GPUS || 0) + t('view.task.Block')"
                    />
                    <SdxvInfoItem
                        :label="t('view.task.Memory')"
                        :value="byteToGb(task && task.resourceConfig && task.resourceConfig.EXECUTOR_MEMORY || 0) + 'GB'"
                    />
                    <SdxvInfoItem
                        v-if="isCONTAINERDEV"
                        :label="t('view.task.ExectorInstanceCount')"
                        :value="task && task.resourceConfig && task.resourceConfig.EXECUTOR_INSTANCES || 0 + t('view.task.Count')"
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
        <SdxvSaveAsDialog
            v-if="dialogVisible"
            :visible.sync="dialogVisible"
            :task="task"
        />
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
import SdxuButton from '@sdx/ui/components/button';
import SdxuTable from '@sdx/ui/comonents/table';
import ElTableColumn from 'element-ui/lib/table-column';

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
        [SdxwFoldLabel.FoldLabel.name]: SdxwFoldLabel.FoldLabel,
        SdxuButton,
        SdxvSaveAsDialog,
        SdxuTable,
        ElTableColumn
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
        },
        handleSaveAsImage() {
            this.dialogVisible = true;
        }
    }
};
</script>

<style>

</style>
