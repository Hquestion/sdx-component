<template>
    <SdxuLogDetail
        :pre-loading="preLoading"
        :suf-loading="sufLoading"
        :content="logContent"
        @scroll="handleScroll"
    />
</template>

<script>
import SdxuLogDetail from '@sdx/ui/components/log-detail';

import ElMessage from 'element-ui/lib/message';

import { getPodLog } from '@sdx/utils/src/api/system';
import { getTaskList } from '@sdx/utils/src/api/project';
import locale from '@sdx/utils/src/mixins/locale';

const AUTO_PULL_INTERVAL = 3000;

export default {
    name: 'SdxwPodLog',
    mixins: [locale],
    components: {
        SdxuLogDetail
    },
    props: {
        autoPull: {
            type: Boolean,
            default: false
        },
        followScroll: {
            type: Boolean,
            default: false
        },
        method: {
            type: String,
            default: 'head',
            validator: value => {
                return ['head', 'tail'].includes(value);
            }
        },
        podName: {
            type: String,
            required: true
        },
        type: { // 日志来源: 系统pod 用户pod
            type: String,
            default: 'user',
            validator: value => {
                return ['user', 'system'].includes(value);
            }
        }
    },
    data() {
        return {
            start: 1,
            end: 1,
            size: 100,
            autoPullInstance: null,
            logContent: '',
            startedAt: '',
            preLoading: false,
            sufLoading: false
        };
    },
    computed: {
        isLoading() {
            return this.preLoading || this.sufLoading;
        }
    },
    methods: {
        async fetchData(offset, size) {
            // 修正offset
            offset = size < 0 ? offset + size : offset;
            offset = offset < 1 ? 1 : offset;
            const params = {
                start: offset,
                count: Math.abs(size)
            };
            if (this.startedAt) {
                params.startedAt = this.startedAt;
            }
            try {
                const data = await getPodLog(this.podName, params);
                let content = Array.isArray(data.contents) && data.contents.join('') || '';
                if (size < 0) {
                    this.start = this.start - data.contents.length;
                    this.logContent = content + this.logContent;
                } else {
                    this.end = this.end + data.contents.length;
                    this.logContent += content;
                }
                return data && data.contents && data.contents.length || 0;
            } catch (e) {
                window.console.error(e);
                return 0;
            }
        },
        async getBackwardLog() {
            if (this.isLoading) {
                return;
            }
            if (this.start > 1) {
                this.preLoading = true;
                await this.fetchData(this.start, -this.size);
                this.preLoading = false;
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
            this.sufLoading = true;
            let logLength = await this.fetchData(this.end, this.size);
            this.sufLoading = false;
            if (logLength === 0) {
                ElMessage.warning({
                    message: this.t('view.task.NoNewLogsYet')
                });
            }
            this.$nextTick().then(() => {
                if (this.followScroll) {
                    this.gotoBottom();
                }
            });
        },
        gotoBottom() {
            this.$refs.scroll.$refs.scroll.scrollTo({
                y: '100%'
            });
        },
        startAutoPull() {
            if (this.autoPullInstance) {
                return;
            }
            this.autoPullInstance = setInterval(() => {
                this.getForwardLog();
            }, AUTO_PULL_INTERVAL);
        },
        stopAutoPull() {
            clearInterval(this.autoPullInstance);
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
                window.console.error(e);
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
        },
        handleScroll({ scrollInfo, event }) {
            let { scrollTop, warpHeight, offsetHeight } = scrollInfo;
            if (this.method === 'tail' && event.deltaY < 0 && scrollTop === 0) {
                // 向前获取日志
                this.getBackwardLog();
            } else if (event.deltaY > 0 && scrollTop + warpHeight >= offsetHeight) {
                // 向后获取日志
                this.getForwardLog();
            }
        }
    },
    created() {
        if (this.type === 'user') {
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
        } else {
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
        }
        
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
