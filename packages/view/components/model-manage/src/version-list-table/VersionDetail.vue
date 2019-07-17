<template>
    <SdxvDetailContainer class="sdxv-version-detail">
        <template #base-info>
            <SdxvBaseInfoItem
                label="版本名称"
                :value="versionInfo.name"
                :multi-line="true"
            />
            <SdxvBaseInfoItem label="版本状态">
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
                label="版本类型"
                :value="versionInfo.framework"
            />
            <SdxvBaseInfoItem
                label="创建人"
                :value="versionInfo.name"
            />
            <SdxvBaseInfoItem
                label="版本描述"
                :value="versionInfo.description"
                multi-line
            />
        </template>
        <template #running-info>
            <SdxvBaseInfoItem
                label="运行环境"
                :value="versionInfo.runtimeImage || ''"
            />
            <SdxvBaseInfoItem
                label="调用次数"
                :value="versionInfo.api_call_num || ''"
            />
            <SdxvBaseInfoItem
                label="REST API"
                :value="versionInfo.restApi || ''"
            />
            <SdxvBaseInfoItem
                label="启动时间"
                :value="versionInfo.startedAtFormatted || ''"
            />
            <SdxvBaseInfoItem
                label="停止时间"
                :value="versionInfo.stoppedAtFormatted || ''"
            />
            <SdxvBaseInfoItem
                label="运行时长"
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
                        获取Key
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
                    :value="milliCoreToCore(versionInfo.runtimeResource && versionInfo.runtimeResource.cpu) + '核'"
                    :strip="true"
                />
                <SdxvBaseInfoItem
                    label="GPU"
                    :value="versionInfo.runtimeResource && versionInfo.runtimeResource.gpu + '块'"
                    :strip="true"
                />
                <SdxvBaseInfoItem
                    label="内存"
                    :value="byteToGb(versionInfo.runtimeResource && versionInfo.runtimeResource.memory) + 'GB'"
                    :strip="true"
                />
            </div>
        </template>
        <template #log-info>
            <SdxuEmpty
                v-if="!(versionInfo.pods && versionInfo.pods.length)"
                empty-content="暂时还没Log日志哦"
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
                empty-content="暂时还没实时监控哦"
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
import { dateFormatter } from '@sdx/utils/src/helper/transform';
export default {
    name: 'VersionDetail',
    mixins: [MixinDetail],
    data() {
        return {
            versionInfo: {},
            loading: false,
            key: '',
            refreshTimer: null
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
                this.versionInfo = res;
                this.versionInfo.label = {};
                if (this.versionInfo.state === 'LAUNCHING' || this.versionInfo.state === 'RUNNING' || this.versionInfo.state === 'KILLING') {
                    if (!this.refreshTimer) {
                        this.refreshTimer = setInterval(this.init, 3000);
                    }
                } else {
                    clearInterval(this.refreshTimer);
                }
                this.versionInfo.startedAtFormatted = dateFormatter(this.versionInfo.startedAt);
                this.versionInfo.stoppedAtFormatted = dateFormatter(this.versionInfo.stoppedAt);
                switch(this.versionInfo.state) {
                case 'CREATED':
                    this.versionInfo.label.text = '新建';
                    this.versionInfo.label.type = 'create';
                    this.versionInfo.label.status = '';
                    break;
                case 'RUNNING':
                    this.versionInfo.label.text = '运行中';
                    this.versionInfo.label.type = 'running';
                    this.versionInfo.label.status = 'loading';
                    break;
                case 'LAUNCHING':
                    this.versionInfo.label.text = '启动中';
                    this.versionInfo.label.type = 'processing';
                    this.versionInfo.label.status = 'loading';
                    break;
                case 'FAILED':
                    this.versionInfo.label.text = '失败';
                    this.versionInfo.label.type = 'error';
                    this.versionInfo.label.status = 'warning';
                    break;
                case 'KILLING':
                    this.versionInfo.label.text = '终止中';
                    this.versionInfo.label.type = 'dying';
                    this.versionInfo.label.status = 'loading';
                    break;
                case 'KILLED':
                    this.versionInfo.label.text = '已终止';
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
