<template>
    <SdxuLogDetail
        :pre-loading="preLoading"
        :suf-loading="sufLoading"
        :loading="loading"
        :content="logContent"
        @scroll="handleScroll"
        :is-dark="isDark"
        ref="log"
    />
</template>

<script>
import SdxuLogDetail from '@sdx/ui/components/log-detail';

import ElMessage from 'element-ui/lib/message';

import { getPodLog } from '@sdx/utils/src/api/system';
import { getTaskList } from '@sdx/utils/src/api/project';
import locale from '@sdx/utils/src/mixins/locale';
import { dateFormatter } from '@sdx/utils/src/helper/transform';

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
        },
        isDark: {
            type: Boolean,
            default: false
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
        },
        loading() {
            return this.isLoading && this.logContent === '';
        }
    },
    methods: {
        async fetchData(offset, size) {
            let count = size;
            // 修正offset
            if (size < 0) {
                count = offset < -size ? offset - 1 : -size;
                offset = offset + size < 1 ? 1 : offset + size;
            }
            const params = {
                start: offset,
                count: count
            };
            if (this.startedAt) {
                params.startedAt = this.startedAt;
            }
            try {
                const data = await getPodLog(this.podName, params);
                let content = '';
                let length = 0;
                if (data && Array.isArray(data.contents)) {
                    data.contents.forEach(item => {
                        content += `[${dateFormatter(item.timestamp)}]  ${item.message.trim()}\r\n`;
                    });
                    length = data.contents.length;
                }
                if (size < 0) {
                    this.start = this.start - length;
                    this.logContent = content + this.logContent;
                } else {
                    this.end = this.end + length;
                    this.logContent += content;
                }
                return length;
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
            } else if (!this._isDestroyed) {
                ElMessage.warning({
                    message: this.logContent ? this.t('view.task.ReachedTheHeadOfLog') : this.t('view.task.NoNewLogsYet')
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
            if (!this._isDestroyed) {
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
            }
        },
        gotoBottom() {
            this.$refs.log.$refs.scroll.$refs.scroll.scrollTo({
                y: '99.99%'
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
            const params = {
                start: 1,
                count: 1
            };
            if (this.startedAt) {
                params.startedAt = this.startedAt;
            }
            this.preLoading = true;
            // tail 查看时的初始化方法，先查询最新日志
            // 获取日志长度
            try {
                const data = await getPodLog(this.podName, params);
                this.start = this.end = data.total + 1;
                this.preLoading = false;
                this.getBackwardLog();
            } catch(e) {
                window.console.error(e);
                this.preLoading = false;
            }
        },
        getTaskInfo() {
            return new Promise(resolve => {
                getTaskList({ podName: this.podName }).then(data => {
                    const task = data && Array.isArray(data.data) && data.data[0] || null;
                    this.startedAt = task && (new Date(task.startedAt).getTime() / 1000).toFixed() || '';
                    resolve();
                }).catch(() => {
                    resolve();
                });
            });
        },
        handleScroll({ scrollInfo }) {
            let { scrollTop, warpHeight, offsetHeight } = scrollInfo;
            if (this.method === 'tail' && scrollTop === 0) {
                // 向前获取日志
                this.getBackwardLog();
            } else if (scrollTop + warpHeight >= offsetHeight) {
                // 向后获取日志
                this.getForwardLog();
            }
        },
        getLogByMethod() {
            this.init();
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
        init() {
            this.start = 1;
            this.end = 1;
            this.size = 100;
            this.logContent = '';
        }
    },
    created() {
        if (this.type === 'user') {
            this.getTaskInfo().then(() => {
                this.getLogByMethod();
            });
        } else {
            this.getLogByMethod();
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
        },
        podName() {
            this.getLogByMethod();
        },
        method() {
            this.getLogByMethod();
        }
    }
};
</script>

<style>

</style>
