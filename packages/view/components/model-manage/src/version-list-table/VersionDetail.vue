<template>
    <SdxvDetailContainer class="sdxv-version-detail">
        <template #base-info>
            <SdxvBaseInfoItem
                :label="t('view.model.versionDetail.name')"
                :value="versionInfo.name"
                :multi-line="true"
            />
            <SdxvBaseInfoItem :label="t('view.model.versionDetail.state')">
                <template #value>
                    <SdxwFoldLabel
                        plain
                        :type="versionInfo.label && versionInfo.label.type"
                        :status="versionInfo.label && versionInfo.label.status"
                    >
                        {{ versionInfo.label && versionInfo.label.text }}
                    </SdxwFoldLabel>
                </template>
            </SdxvBaseInfoItem>
            <SdxvBaseInfoItem
                :label="t('view.model.versionDetail.framework')"
                :value="versionInfo.framework"
            />
            <SdxvBaseInfoItem
                :label="t('view.model.versionDetail.creator')"
                :value="creatorName"
            />
            <SdxvBaseInfoItem
                :label="t('view.model.versionDetail.description')"
                :value="versionInfo.description"
                multi-line
            />
        </template>
        <template #running-info>
            <SdxvBaseInfoItem
                :label="t('view.model.versionDetail.runtimeImage')"
                :value="versionInfo.runtimeImage || ''"
            />
            <SdxvBaseInfoItem
                :label="t('view.model.versionDetail.callNum')"
                :value="versionInfo.api_call_num || ''"
            />
            <SdxvBaseInfoItem
                label="REST API"
                :value="versionInfo.restApi || ''"
            />
            <SdxvBaseInfoItem
                :label="t('view.model.versionDetail.startTime')"
                :value="versionInfo.startedAtFormatted || ''"
            />
            <SdxvBaseInfoItem
                :label="t('view.model.versionDetail.stopTime')"
                :value="versionInfo.stoppedAtFormatted || ''"
            />
            <SdxvBaseInfoItem
                :label="t('view.model.versionDetail.runningLength')"
                :value="dealTime(versionInfo.startedAt, versionInfo.stoppedAt || new Date())"
            />
            <SdxvBaseInfoItem
                label="Key"
                style="word-break: break-all;"
            >
                <template #value>
                    <SdxuButton
                        v-if="!key"
                        type="primary"
                        plain
                        size="small"
                        @click="getToken"
                        :loading="loading"
                        style="line-height: 20px;"
                    >
                        {{ t('view.model.versionDetail.getKey') }}
                    </SdxuButton>
                    <div
                        v-else
                    >
                        {{ key }}
                    </div>
                </template>
            </SdxvBaseInfoItem>
        </template>
        <template #resource-info>
            <div class="sdxv-info-container">
                <SdxvBaseInfoItem
                    label="CPU"
                    :value="milliCoreToCore(versionInfo.runtimeResource && versionInfo.runtimeResource.cpu) + t('view.model.versionDetail.core')"
                    :strip="true"
                />
                <SdxvBaseInfoItem
                    label="GPU"
                    :value="versionInfo.runtimeResource && versionInfo.runtimeResource.gpu + t('view.model.versionDetail.piece')"
                    :strip="true"
                />
                <SdxvBaseInfoItem
                    :label="t('view.model.versionDetail.memory')"
                    :value="byteToGb(versionInfo.runtimeResource && versionInfo.runtimeResource.memory) + 'GB'"
                    :strip="true"
                />
            </div>
        </template>
        <template #log-info>
            <SdxuEmpty
                v-if="!(versionInfo.pods && versionInfo.pods.length)"
                :empty-content="t('view.model.versionDetail.noLog')"
                empty-type="sdx-wushuju"
            />
            <SdxvLogList
                v-else
                :pods="versionInfo.pods"
            />
        </template>
        <template #realtime-monitor>
            <SdxuEmpty
                v-if="!(versionInfo.pods && versionInfo.pods.length)"
                :empty-content="t('view.model.versionDetail.noMonitor')"
                empty-type="sdx-wushuju"
            />
            <SdxvMonitorInfo
                v-else
                :pods="versionInfo.pods"
            />
        </template>
    </SdxvDetailContainer>
</template>

<script>
import MixinDetail from '../../../task-management/src/task-detail/MixinDetail';
import FoldLabel from '@sdx/widget/components/fold-label';
import Button from '@sdx/ui/components/button';
import { getVersionInfo, getVersionToken } from '@sdx/utils/src/api/model';
import { getTaskDetail } from '@sdx/utils/src/api/project';
import { getUserSimpleInfo } from '@sdx/utils/src/api/user';
import { dateFormatter } from '@sdx/utils/src/helper/transform';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'VersionDetail',
    mixins: [MixinDetail, locale],
    data() {
        return {
            versionInfo: {},
            loading: false,
            key: '',
            refreshTimer: null,
            creatorName: ''
        };
    },
    created() {
        this.init();
    },
    beforeDestroy() {
        clearInterval(this.refreshTimer);
    },
    methods: {
        getToken() {
            this.loading = true;
            getVersionToken(this.$route.params.modelId, this.$route.params.versionId).then(res => {
                this.key = res.token;
                this.loading = false;
            });
        },
        init() {
            getVersionInfo(this.$route.params.modelId, this.$route.params.versionId).then(res => {
                this.versionInfo = Object.assign({}, this.versionInfo, res);
                this.versionInfo.label = {};
                if (this.versionInfo.serviceId) {
                    getTaskDetail(this.versionInfo.serviceId).then(res => {
                        this.$set(this.versionInfo, 'pods', res.pods);
                    });
                }
                if (this.versionInfo.state === 'LAUNCHING' || this.versionInfo.state === 'RUNNING' || this.versionInfo.state === 'KILLING') {
                    if (!this.refreshTimer) {
                        this.refreshTimer = setInterval(this.init, 3000);
                    }
                } else {
                    clearInterval(this.refreshTimer);
                }
                if (!this.creatorName) {
                    getUserSimpleInfo(this.versionInfo.creatorId).then(res => {
                        this.creatorName = res.fullName;
                    });
                }
                this.versionInfo.startedAtFormatted = dateFormatter(this.versionInfo.startedAt);
                this.versionInfo.stoppedAtFormatted = dateFormatter(this.versionInfo.stoppedAt);
                switch(this.versionInfo.state) {
                case 'CREATED':
                    this.versionInfo.label.text = this.t('view.model.states.created');
                    this.versionInfo.label.type = 'create';
                    this.versionInfo.label.status = '';
                    break;
                case 'RUNNING':
                    this.versionInfo.label.text = this.t('view.model.states.running');
                    this.versionInfo.label.type = 'running';
                    this.versionInfo.label.status = 'loading';
                    break;
                case 'LAUNCHING':
                    this.versionInfo.label.text = this.t('view.model.states.launching');
                    this.versionInfo.label.type = 'processing';
                    this.versionInfo.label.status = 'loading';
                    break;
                case 'FAILED':
                    this.versionInfo.label.text = this.t('view.model.states.failed');
                    this.versionInfo.label.type = 'error';
                    this.versionInfo.label.status = 'warning';
                    break;
                case 'KILLING':
                    this.versionInfo.label.text = this.t('view.model.states.killing');
                    this.versionInfo.label.type = 'dying';
                    this.versionInfo.label.status = 'loading';
                    break;
                case 'KILLED':
                    this.versionInfo.label.text = this.t('view.model.states.killed');
                    this.versionInfo.label.type = 'die';
                    this.versionInfo.label.status = '';
                    break;
                default:
                    break;
                }
            });
        }
    },
    components: {
        [FoldLabel.FoldLabel.name]: FoldLabel.FoldLabel,
        [Button.name]: Button
    }
};
</script>
