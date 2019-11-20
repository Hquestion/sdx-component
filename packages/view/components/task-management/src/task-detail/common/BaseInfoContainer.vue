<template>
    <div class="sdxv-base-info-container">
        <div class="sdxv-base-info-container__item">
            <SdxwExpandLabel :label="t('view.task.RunningInformation')">
                <template #right>
                    <SdxuButton
                        v-if="hasSaveImage && isRunning"
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
                        >
                            {{ task && STATE_TYPE_LABEL[task.state] || '-' }}
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
                    :value="task ? timeDuration(task.startedAt, task.stoppedAt || new Date()) : ''"
                />
                <SdxvInfoItem
                    v-if="isSKYIDE"
                    :label="t('view.task.FilePath')"
                    :value="task.homePath"
                />
                <SdxvInfoItem
                    v-if="isCONTAINERDEV"
                    :label="t('view.task.PageTerminal')"
                >
                    <template
                        #value
                    >
                        <template v-if="buildInServeList.length > 0">
                            <div>
                                <div
                                    v-for="(item, i) in buildInServeList"
                                    :key="i"
                                    class="sdxv-base-info-container__link"
                                >
                                    <div
                                        v-if="item.protocol === 'HTTP'" 
                                        @click="goToNewPage(origin + '/' + item.urlSuffix)"
                                        class="sdxv-base-info-container__link--http"
                                    >
                                        {{ origin + '/' + item.urlSuffix }}
                                    </div>
                                    <!-- // todo: click -->
                                    <div v-else>
                                        {{ hostname + ':' + item.proxyPort }}
                                    </div>
                                </div>
                            </div>
                        </template>
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
                <!-- // todo: 列表 -->
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
                            :data="customerServeList"
                            :empty-text="t('sdxCommon.NoData')"
                        >
                            <el-table-column
                                align="center"
                                prop="protocol"
                                :label="t('view.task.Protocol')"
                            />
                            <el-table-column
                                align="center"
                                prop="proxyPort"
                                :label="t('view.task.Port')"
                            />
                            <el-table-column
                                header-align="center"
                                :label="t('view.task.Link')"
                            >
                                <template #default="{ row }">
                                    <SdxuButton
                                        v-if="row.protocol === 'HTTP'"
                                        @click="goToNewPage(origin + '/' + row.urlSuffix)"
                                        type="link"
                                    >
                                        {{ origin + '/' + row.urlSuffix }}
                                    </SdxuButton>
                                    <!-- // todo: -->
                                    <SdxuButton
                                        v-else
                                    >
                                        {{ hostname + ':' + row.proxyPort }}
                                    </SdxuButton>
                                </template>
                            </el-table-column>
                        </SdxuTable>
                    </template>
                </SdxvInfoItem>
            </SdxvInfoContainer>
        </div>
        <div class="sdxv-base-info-container__item">
            <SdxwExpandLabel :label="t('view.task.ResourceInformation')" />
            <template v-if="isDeployTask">
                <SdxvInfoContainer>
                    <SdxvInfoItem
                        label="CPU"
                        :value="(task && task.resourceConfig && task.resourceConfig.DEPLOY && task.resourceConfig.DEPLOY.requests && task.resourceConfig.DEPLOY.requests.cpu || 0) + t('view.task.Core')"
                    />
                    <SdxvInfoItem
                        label="GPU"
                        :value="(task && task.resourceConfig && task.resourceConfig.DEPLOY && task.resourceConfig.DEPLOY.requests && task.resourceConfig.DEPLOY.requests['nvidia.com/gpu'] || 0) + t('view.task.Block')"
                    />
                    <SdxvInfoItem
                        :label="t('view.task.Memory')"
                        :value="byteToGb(task && task.resourceConfig && task.resourceConfig.DEPLOY && task.resourceConfig.DEPLOY.requests && task.resourceConfig.DEPLOY.requests.memory || 0) + 'GB'"
                    />
                    <SdxvInfoItem
                        v-if="isCONTAINERDEV"
                        :label="t('view.task.ExectorInstanceCount')"
                        :value="task && task.resourceConfig && task.resourceConfig.DEPLOY && task.resourceConfig.DEPLOY.instance || 0 + t('view.task.Count')"
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
// todo:
import auth from '@sdx/widget/components/auth';
import SdxwExpandLabel from '@sdx/widget/components/expand-label';
import SdxvInfoContainer from './InfoContainer';
import SdxvInfoItem from './InfoItem';
import SdxwFoldLabel from '@sdx/widget/components/fold-label';
import SdxvSaveAsDialog from './SaveAsDialog';
import SdxuButton from '@sdx/ui/components/button';
import SdxuTable from '@sdx/ui/components/table';
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
        SdxwExpandLabel,
        [SdxwFoldLabel.FoldLabel.name]: SdxwFoldLabel.FoldLabel,
        SdxuButton,
        SdxvSaveAsDialog,
        SdxuTable,
        ElTableColumn
    },
    data() {
        return {
            dialogVisible: false,
            hostname: location.hostname,
            origin: location.origin
        };
    },
    computed: {
        buildInServeList() {
            let list = this.task.serviceList || [];
            return list.filter(item => item.proxyType === 'BUILD-IN');
        },
        customerServeList() {
            let list = this.task.serviceList || [];
            return list.filter(item => item.proxyType === 'CUSTOMER');
        }
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
        },
        goToNewPage(url) {
            window.open(url);
        }
    }
};
</script>

<style>

</style>
