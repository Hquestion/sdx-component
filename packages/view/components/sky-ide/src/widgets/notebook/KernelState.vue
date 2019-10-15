<template>
    <div class="kernel-state-main">
        <span class="kernel-state-name">Kernel</span>
        <div class="kernel-state-wrapper" :class="[stateClass]">
            <div class="kernel-state-icon">
                <i v-show="isStopped" class="sdx-icon sdx-qidongkernel" />
                <i v-show="isRunning" class="sdx-icon sdx-tingzhikernel" />
                <i v-show="isStarting || isStopping" class="sdx-icon sdx-bianjizhong" />
            </div>
            <div class="kernel-state-label">
                <span v-if="isStopped">{{ t('view.skyide.State_Stopped') }}</span>
                <span v-if="isStarting">{{ t('view.skyide.State_Starting') }}</span>
                <span v-if="isStopping">{{ t('view.skyide.State_Stopping') }}</span>
                <span v-if="isRunning">{{ runningTime | seconds2HMS }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import {NotebookKernelState} from '../../config';
import locale from '@sdx/utils/src/mixins/locale';
import { getKernelSpecs } from '@sdx/utils/src/api/skyide';
import dayjs from 'dayjs';
import transformFilter from '@sdx/utils/src/mixins/transformFilter';
import { BubbleTipManager } from '@sdx/ui/components/bubble-tip';

export default {
    name: 'KernelState',
    mixins: [locale, transformFilter],
    data() {
        return {
            runningTime: 0,
            kernelInfo: null
        };
    },
    inject: {
        snb: {
            default: {}
        },
        app: {
            commands: {}
        }
    },
    computed: {
        isStopped() {
            return this.snb.kernelState === NotebookKernelState.STOPPED;
        },
        isStarting() {
            return this.snb.kernelState === NotebookKernelState.STARTING;
        },
        isRunning() {
            return this.snb.kernelState === NotebookKernelState.RUNNING;
        },
        isStopping() {
            return this.snb.kernelState === NotebookKernelState.STOPPING;
        },
        stateClass() {
            if (this.isStopped) {
                return 'is-stopped';
            }
            if (this.isStopping) {
                return 'is-stopping';
            }
            if (this.isRunning) {
                return 'is-running';
            }
            if (this.isStarting) {
                return 'is-starting';
            }
            return '';
        }
    },
    methods: {
        startTimer() {
            this.timer = setInterval(() => {
                if (this.kernelInfo) {
                    let now = new Date();
                    this.runningTime = (now - dayjs(this.kernelInfo.lastActivity).$d) / 1000;
                }
            }, 1000);
        },
        cancelTimer() {
            clearInterval(this.timer);
        }
    },
    watch: {
        'snb.session'(val) {
            if (val) {
                getKernelSpecs(this.app.taskManager.ideUuid, val.kernel.id).then(res => {
                    this.kernelInfo = res;
                    this.startTimer();
                });
            } else {
                this.kernelInfo = null;
                this.cancelTimer();
            }
        },
        isRunning(val) {
            if (val) {
                BubbleTipManager.warning({
                    content: '当前Kernel30分钟内无活跃操作，将会自动断开连接释放资源。',
                    ref: this.$el
                });
            }
        }
    },
    beforeDestroy() {
        this.cancelTimer();
    }
};
</script>

<style lang="scss" scoped>
.kernel-state-main {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    color: #98A6D1;
    .kernel-state-name {
        padding: 0 5px;
    }
    .kernel-state-wrapper {
        display: inline-flex;
        justify-content: flex-start;
        align-items: center;
        width: 88px;
        height: 24px;
        line-height: 24px;
        background: #4E69AE;
        border-radius: 12px;
        .kernel-state-icon {
            width: 24px;
            height: 24px;
            background: #4E69AE;
            color: #fff;
            border-radius: 12px;
            line-height: 24px;
            text-align: center;
            .sdx-icon {
                font-size: 16px;
            }
            /deep/ {
                .sdx-bianjizhong {
                    animation: rotating 2s linear infinite;
                    display: inline-block;
                }
            }
        }
        .kernel-state-label {
            font-size: 12px;
            padding-left: 4px;
        }
        &.is-stopped {
            .kernel-state-icon {
                background: #6D8FE4;
                color: #CAD7FF;
            }
        }
        &.is-starting {
            .kernel-state-icon {
                background: #71CD97;
                color: #CAD7FF;
            }
        }
        &.is-running {
            .kernel-state-icon {
                background: #71CD97;
                color: #fff;
            }
        }
        &.is-stopping {
            .kernel-state-icon {
                background: #6D8FE4;
                color: #CAD7FF;
            }
        }
    }
}
</style>
