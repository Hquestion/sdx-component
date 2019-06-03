<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        :no-footer="true"
        title="日志详情"
        @open="handleOpenDialog"
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
import { Scrollbar } from 'element-ui';

import { getImageBuildLog } from '@sdx/utils/src/api/image';

export default {
    name: 'SdxvBuildLogDialog',
    components: {
        SdxuDialog,
        SdxwLogDetail,
        [Scrollbar.name]: Scrollbar
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
            getImageBuildLog(this.imageBuilderId).then(data => {
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
        }
    }
};
</script>

<style lang="scss">
</style>
