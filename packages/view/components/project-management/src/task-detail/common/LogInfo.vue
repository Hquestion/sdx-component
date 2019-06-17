<template>
    <SdxuContentPanel
        :title="method + '日志'"
        class="sdxv-log-info"
    >
        <template
            v-if="method === 'tail'"
            #right
        >
            <div class="sdxv-log-info__switch">
                <div class="sdxv-log-info__switch--item">
                    <span>自动拉取：</span>
                    <el-switch
                        v-model="autoPull"
                    />
                </div>
                <div class="sdxv-log-info__switch--item">
                    <span>滚动跟随：</span>
                    <el-switch
                        v-model="followScroll"
                    />
                </div>
            </div>
        </template>
        <template #default>
            <SdxwLogDetail
                :content="logContent"
                @scroll="handleScroll"
                ref="log"
            />
        </template>
    </SdxuContentPanel>
</template>

<script>
import SdxuContentPanel from '@sdx/ui/components/content-panel';
import SdxwLogDetail from '@sdx/widget/components/log-detail';
import ElSwitch from 'element-ui/lib/switch';
import ElMessage from 'element-ui/lib/message';

import { getLogs } from '@sdx/utils/src/api/log';

const AUTO_PULL_INTERVAL = 3000;

export default {
    name: 'SdxvLogInfo',
    components: {
        SdxuContentPanel,
        SdxwLogDetail,
        ElSwitch
    },
    props: {
        podId: {
            type: String,
            default: ''
        },
        method: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            start: 0,
            end: 0,
            size: 100,
            isLoading: false,
            autoPull: false,
            followScroll: false,
            autoPullInstance: null,
            logContent: ''
        };
    },
    methods: {
        async fetchData(offset, size) {
            // 修正offset
            offset = size < 0 ? offset + size : offset;
            offset = offset < 0 ? 0 : offset;
            this.isLoading = true;
            try {
                const data = await getLogs({
                    podId: this.podId,
                    start: offset,
                    count: Math.abs(size)
                });
                let content = Array.isArray(data.contents) && data.contents.join('\r\n');
                if (size < 0) {
                    this.start = this.start - data.contents.length;
                    this.logContent = content + (content ? '\r\n' : '') + this.logContent;
                } else {
                    this.end = this.end + data.contents.length;
                    this.logContent += (content ? '\r\n' : '') + content;
                }
                this.isLoading = false;
            } catch (e) {
                this.isLoading = false;
            }
        },
        getBackwardLog() {
            if (this.isLoading) {
                return;
            }
            if (this.start > 0) {
                this.fetchData(this.start, -this.size);
            } else {
                ElMessage.warning({
                    message: '已经到达日志头部'
                });
            }
        },
        async getForwardLog() {
            if (this.isLoading) {
                return;
            }
            await this.fetchData(this.end, this.size);
            this.$nextTick().then(() => {
                if (this.followScroll) {
                    this.gotoBottom();
                }
            });
        },
        handleScroll({ scrollInfo, event }) {
            let { scrollTop, warpHeight, offsetHeight } = scrollInfo;
            if (this.method === 'tail' && scrollTop === 0 && event.deltaY < 0) {
                // 向前获取日志
                this.getBackwardLog();
            } else if (scrollTop + warpHeight === offsetHeight && event.deltaY > 0) {
                // 向后获取日志
                this.getForwardLog();
            }
        },
        gotoBottom() {
            this.$refs.log.$refs.scroll.$refs.scroll.scrollTo({
                y: '100%'
            });
        },
        startAutoPull() {
            if (this.autoPullInstance) {
                return;
            }
            this.autoPullInstance = window.setInterval(() => {
                this.getForwardLog();
            }, AUTO_PULL_INTERVAL);
        },
        stopAutoPull() {
            window.clearInterval(this.autoPullInstance);
            this.autoPullInstance = null;
        },
        async getCodeInfo() {
            // tail 查看时的初始化方法，先查询最新日志
            // 获取日志长度
            const data = await getLogs({
                podId: this.podId,
                start: 1,
                count: Math.abs(1)
            });
            this.start = this.end = data.total;
            this.getBackwardLog();
        }
    },
    created() {
        if (this.method === 'head') {
            this.getForwardLog();
        } else {
            this.getCodeInfo();
            if (this.followScroll) {
                this.gotoBottom();
            }
            if (this.autoPull) {
                this.startAutoPull();
            }
        }
    },
    watch: {
        autoPull(nval) {
            if (nval) {
                this.startAutoPull();
            } else {
                this.stopAutoPull();
            }
        }
    }
};
</script>

<style>

</style>
