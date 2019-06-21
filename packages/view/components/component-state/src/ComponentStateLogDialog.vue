<template>
    <SdxuDialog
        title="日志"
        :visible.sync="dialogVisible"
        :no-footer="true"
        @open="handleOpenDialog"
        @close="handleClose"
    >
        <SdxwLogDetail
            :content="logContent"
            @scroll="handleScroll"
        />
    </SdxuDialog>
</template>

<script>
import SdxuDialog from '@sdx/ui/components/dialog';
import SdxwLogDetail from '@sdx/widget/components/log-detail';

import { getPodLog } from '@sdx/utils/src/api/system';

export default {
    name: 'SdxvComponentStateLogDialog',
    components: {
        SdxuDialog,
        SdxwLogDetail
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        podId: {
            type: String,
            default: '',
            required: true
        }
    },
    data() {
        return {
            start: 1,
            end: 1,
            size: 20,
            isLoading: false,
            logContent: ''
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
        async fetchData(offset, size) {
            if (this.isLoading) {
                return;
            }
            // 修正offset
            offset = size < 0 ? offset + size : offset;
            offset = offset < 1 ? 1 : offset;
            this.isLoading = true;
            try {
                const data = await getPodLog(this.podId, {
                    start: offset,
                    count: Math.abs(size)
                });
                let content = Array.isArray(data.contents) && data.contents.join('');
                if (size < 0) {
                    this.start = this.start - data.contents.length;
                    this.logContent = content + this.logContent;
                } else {
                    this.end = this.end + data.contents.length;
                    this.logContent += content;
                }
                // this.logContent = this.logContent.trim();
                this.isLoading = false;
            } catch (e) {
                this.isLoading = false;
            }
        },
        handleScroll({ scrollInfo, event }) {
            let { scrollTop, warpHeight, offsetHeight } = scrollInfo;
            if (scrollTop + warpHeight === offsetHeight && event.deltaY > 0) {
                this.fetchData(this.end, this.size);
            }
        },
        handleOpenDialog() {
            this.fetchData(this.end, this.size);
        },
        handleClose() {
            this.start = 1;
            this.end = 1;
            this.size = 20;
            this.isLoading = false;
            this.logContent = '';
        }
    }
};
</script>

<style>

</style>
