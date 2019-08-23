<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        :no-footer="true"
        :title="t('view.image.LogDetail')"
        @open="handleOpenDialog"
        @close="handleCloseDialog"
        class="sdxv-build-log"
    >
        <div class="sdxv-build-log__switch">
            <span>{{ t('view.task.AutoPull') }}: </span>
            <el-switch
                v-model="autoPull"
            />
        </div>
        <SdxuLogDetail
            :content="logInfo"
            :loading="loading"
            @scroll="handleScroll"
        />
    </sdxu-dialog>
</template>

<script>
import SdxuDialog from '@sdx/ui/components/dialog';
import SdxuLogDetail from '@sdx/ui/components/log-detail';
import ElSwitch from 'element-ui/lib/switch';

import { getImageBuildLog } from '@sdx/utils/src/api/image';
import locale from '@sdx/utils/src/mixins/locale';

const POLLING_INTERVAL = 3 * 1000;

export default {
    name: 'SdxvBuildLogDialog',
    mixins: [locale],
    components: {
        SdxuDialog,
        SdxuLogDetail,
        ElSwitch
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        imageBuilderId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            logInfo: '',
            autoPull: false,
            loading: false,
            pollingId: ''
        };
    },
    computed: {
        dialogVisible: {
            get() {
                return this.visible;
            },
            set(nval) {
                this.$emit('update:visible', nval);
            }
        }
    },
    methods: {
        fetchLogInfo() {
            const params = {
                length: -1 // 获取全部日志
            };
            this.loading = true;
            getImageBuildLog(this.imageBuilderId, params).then(data => {
                this.logInfo = this.filterIp(data.content);
                this.loading = false;
                if (this.autoPull) {
                    this.startPolling();
                }
            }).catch(() => {
                this.loading = false;
            });
        },
        filterIp(content) {
            return content.replace(
                /([0-9]{1,3}\.){3}[0-9]{1,3}(:[0-9]{1,5})?/g,
                '{{IP}}'
            );
        },
        handleOpenDialog() {
            this.fetchLogInfo();
        },
        handleCloseDialog() {
            this.stopPolling();
            this.logInfo = '';
        },
        handleScroll({ scrollInfo }) {
            let { scrollTop, warpHeight, offsetHeight } = scrollInfo;
            if (scrollTop + warpHeight >= offsetHeight) {
                this.fetchLogInfo();
            }
        },
        startPolling() {
            if (!this._isDestroyed) {
                clearTimeout(this.pollingId);
                this.pollingId = setTimeout(this.fetchLogInfo, POLLING_INTERVAL);
            }
        },
        stopPolling() {
            clearTimeout(this.pollingId);
            this.pollingId = '';
        }
    },
    beforeDestroy() {
        this.stopPolling();
    },
    watch: {
        autoPull: {
            immediate: true,
            handler: function(nval) {
                if (nval) {
                    this.startPolling();
                } else {
                    this.stopPolling();
                }
            }
        }
    }
};
</script>

<style lang="scss">
</style>
