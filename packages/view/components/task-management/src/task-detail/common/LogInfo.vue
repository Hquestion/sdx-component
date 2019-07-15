<template>
    <SdxuContentPanel
        :title="method + t('Log')"
        class="sdxv-log-info"
    >
        <template
            v-if="method === 'tail'"
            #right
        >
            <div class="sdxv-log-info__switch">
                <div class="sdxv-log-info__switch--item">
                    <span>{{ t('view.task.AutoPull') }}：</span>
                    <el-switch
                        v-model="autoPull"
                    />
                </div>
                <div class="sdxv-log-info__switch--item">
                    <span>{{ t('view.task.RollingFollow') }}：</span>
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

import { getPodLog } from '@sdx/utils/src/api/system';
import { getTaskList } from '@sdx/utils/src/api/project';
import locale from '@sdx/utils/src/mixins/locale';

const AUTO_PULL_INTERVAL = 3000;

export default {
    name: 'SdxvLogInfo',
    mixins: [locale],
    components: {
        SdxuContentPanel,
        SdxwLogDetail,
        ElSwitch
    },
    props: {
        podName: {
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
            start: 1,
            end: 1,
            size: 100,
            isLoading: false,
            autoPull: false,
            followScroll: false,
            autoPullInstance: null,
            logContent: '',
            startedAt: ''
        };
    },
    methods: {
        async fetchData(offset, size) {
            // 修正offset
            offset = size < 0 ? offset + size : offset;
            offset = offset < 1 ? 1 : offset;
            this.isLoading = true;
            const params = {
                start: offset,
                count: Math.abs(size)
            };
            if (this.startedAt) {
                params.startedAt = this.startedAt;
            }
            try {
                const data = await getPodLog(this.podName, params);
                let content = Array.isArray(data.contents) && data.contents.join('');
                if (size < 0) {
                    this.start = this.start - data.contents.length;
                    this.logContent = content + this.logContent;
                } else {
                    this.end = this.end + data.contents.length;
                    this.logContent += content;
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
            if (this.start > 1) {
                this.fetchData(this.start, -this.size);
            } else {
                ElMessage.warning({
                    message: this.t('view.task.ReachedTheHeadOfLog')
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
            try {
                const data = await getPodLog(this.podName, {
                    start: 1,
                    count: 1
                });
                this.start = this.end = data.total + 1;
                this.getBackwardLog();
            } catch(e) {
                // todo:
            }
        },
        getTaskInfo() {
            return new Promise(resolve => {
                getTaskList({ podName: this.podName }).then(data => {
                    const task = data && Array.isArray(data.items) && data.items[0] || null;
                    this.startedAt = task && new Date(task.runningAt).getTime() || '';
                    resolve();
                }).catch(() => {
                    resolve();
                });
            });
        }
    },
    created() {
        this.getTaskInfo().then(() => {
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
        });
    },
    beforeDestroy() {
        this.stopAutoPull();
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
