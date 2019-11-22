<template>
    <div class="sdxv-base-info-container">
        <div class="sdxv-base-info-container__item">
            <SdxuArticlePanel
                :title="t('view.task.RunningInformation')"
                class="sdxv-base-info-container__panel"
            >
                <template #right>
                    <SdxuButton
                        v-if="hasSaveImage && isRunning"
                        type="link"
                        @click="handleSaveAsImage"
                    >
                        {{ t('view.task.SaveAsImage') }}
                    </SdxuButton>
                </template>
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
                                {{ task && task.state && t(STATE_TYPE_LABEL[task.state]) || '-' }}
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
                        :value="task ? calculateDateDiffFormatter(task.startedAt, task.stoppedAt) : ''"
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
                    <SdxvInfoItem
                        v-if="isCONTAINERDEV"
                        :label="t('view.task.StartCommand')"
                        :value="task.startCommand"
                    />
                    <SdxvInfoItem
                        v-if="isCONTAINERDEV"
                        :label="t('view.task.DisplayPath')"
                        :value="task.displayPath"
                    />
                    <SdxvInfoItem
                        v-if="isCONTAINERDEV"
                        :whole-line="true"
                        :label="t('view.task.EnvVars')"
                    >
                        <template #value>
                            <span v-if="environments.length < 1">-</span>
                            <SdxuTable
                                v-else
                                :light="true"
                                :data="task.environments"
                                :empty-text="t('sdxCommon.NoData')"
                            >
                                <el-table-column
                                    align="center"
                                    prop="name"
                                    :label="t('view.task.ParamName')"
                                />
                                <el-table-column
                                    align="center"
                                    prop="value"
                                    :label="t('view.task.ParamValue')"
                                />
                            </SdxuTable>
                        </template>
                    </SdxvInfoItem>
                    <SdxvInfoItem
                        v-if="isCONTAINERDEV"
                        :whole-line="true"
                        :label="t('view.task.StartupParameter')"
                    >
                        <template #value>
                            <span v-if="startArgs.length < 1">-</span>
                            <div v-else>
                                <div
                                    v-for="(value, i) in startArgs"
                                    :key="i"
                                    class="sdxv-base-info-container__list"
                                >
                                    <div>{{ i + 1 }}、 </div><div>{{ value }}</div>
                                </div>
                            </div>
                        </template>
                    </SdxvInfoItem>
                    <SdxvInfoItem
                        v-if="isCONTAINERDEV"
                        :whole-line="true"
                        :label="t('view.task.PortRoute')"
                    >
                        <template #value>
                            <span v-if="customerServeList.length === 0">-</span>
                            <SdxuTable
                                v-else
                                :light="true"
                                :data="customerServeList"
                                :empty-text="t('sdxCommon.NoData')"
                            >
                                <el-table-column
                                    align="center"
                                    prop="protocol"
                                    :label="t('view.task.Protocol')"
                                    width="150px"
                                />
                                <el-table-column
                                    align="center"
                                    prop="proxyPort"
                                    :label="t('view.task.Port')"
                                    width="150px"
                                />
                                <el-table-column
                                    header-align="center"
                                    :label="t('view.task.Link')"
                                >
                                    <template #default="{ row }">
                                        <span
                                            v-if="row.protocol === 'HTTP'"
                                            @click="goToNewPage(origin + '/' + row.urlSuffix)"
                                            type="link"
                                            class="sdxv-base-info-container__link--http"
                                        >
                                            {{ origin + '/' + row.urlSuffix }}
                                        </span>
                                        <span
                                            v-else
                                        >
                                            {{ hostname + ':' + row.proxyPort }}
                                        </span>
                                    </template>
                                </el-table-column>
                            </SdxuTable>
                        </template>
                    </SdxvInfoItem>
                </SdxvInfoContainer>
            </SdxuArticlePanel>
        </div>
        <div class="sdxv-base-info-container__item">
            <SdxuArticlePanel
                :title="t('view.task.ResourceInformation')"
                class="sdxv-base-info-container__panel"
            >
                <template v-if="isDeployTask">
                    <SdxvInfoContainer>
                        <SdxvInfoItem
                            label="CPU"
                            :value="milliCoreToCore(resourceConfig && resourceConfig.DEPLOY && resourceConfig.DEPLOY.requests && resourceConfig.DEPLOY.requests.cpu || 0) + t('view.task.Core')"
                        />
                        <SdxvInfoItem
                            label="GPU"
                            :value="(resourceConfig && resourceConfig.DEPLOY && resourceConfig.DEPLOY.requests && resourceConfig.DEPLOY.requests['nvidia.com/gpu'] || 0) + t('view.task.Block')"
                        />
                        <SdxvInfoItem
                            :label="t('view.task.Memory')"
                            :value="byteToGb(resourceConfig && resourceConfig.DEPLOY && resourceConfig.DEPLOY.requests && resourceConfig.DEPLOY.requests.memory || 0) + 'GB'"
                        />
                        <SdxvInfoItem
                            v-if="isCONTAINERDEV"
                            :label="t('view.task.InstanceCount')"
                            :value="resourceConfig && resourceConfig.DEPLOY && resourceConfig.DEPLOY.instance || 0 + t('view.task.Count')"
                        />
                    </SdxvInfoContainer>
                </template>
            </SdxuArticlePanel>
        </div>
        <div class="sdxv-base-info-container__item">
            <SdxuArticlePanel
                :title="t('view.task.DataInformation')"
                class="sdxv-base-info-container__panel"
            >
                <DataInfo 
                    :is-empty="!hasDataInfo"
                    :datasources="task.datasources"
                    :datasets="task.datasets"
                />
            </SdxuArticlePanel>
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
import SdxuArticlePanel from '@sdx/ui/components/article-panel';
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
        SdxuArticlePanel,
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
        },
        resourceConfig() {
            let obj = null;
            try {
                obj = JSON.parse(this.task.resourceConfig);
            } catch(err) {
                window.console.error(err);
            }
            return obj;
        },
        environments() {
            return this.task.environments || [];
        },
        startArgs() {
            return this.task.startArgs || [];
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
