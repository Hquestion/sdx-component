<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        :no-footer="true"
        :title="t('view.image.LogDetail')"
        @open="handleOpenDialog"
        @close="handleCloseDialog"
        class="sdxv-build-log"
    >
        <SdxwLogDetail
            :content="logInfo"
        />
    </sdxu-dialog>
</template>

<script>
import SdxuDialog from '@sdx/ui/components/dialog';
import SdxwLogDetail from '@sdx/widget/components/log-detail';

import { getImageBuildLog } from '@sdx/utils/src/api/image';
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'SdxvBuildLogDialog',
    mixins: [locale],
    components: {
        SdxuDialog,
        SdxwLogDetail
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
            logInfo: ''
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
            getImageBuildLog(this.imageBuilderId, params).then(data => {
                this.logInfo = this.filterIp(data.content);
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
            this.logInfo = '';
        }
    }
};
</script>

<style lang="scss">
</style>
