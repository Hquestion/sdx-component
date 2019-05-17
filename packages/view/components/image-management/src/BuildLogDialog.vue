<template>
    <sdxu-dialog
        :visible.sync="dialogVisible"
        :no-footer="true"
        title="日志详情"
        @open="handleOpenDialog"
        class="sdxv-build-log"
    >
        <el-scrollbar
            wrap-class="sdxv-build-log__scrollbar--wrap"
            view-class="sdxv-build-log__scrollbar--list"
        >
            <p class="sdxv-build-log__content">
                {{ logInfo }}
            </p>
        </el-scrollbar>
    </sdxu-dialog>
</template>

<script>
import SdxuDialog from '@sdx/ui/components/dialog';
import { Scrollbar } from 'element-ui';

import { getImageBuildLog } from '@sdx/utils/src/api/image';

export default {
    name: 'SdxvBuildLogDialog',
    components: {
        SdxuDialog,
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
    .sdxv-build-log {
        .sdxv-build-log__scrollbar--wrap {
            height: 60vh;
        }
        .sdxv-build-log__content {
            white-space: pre-wrap;
            word-break: break-all;
            text-align: left;
        }
    }
</style>
