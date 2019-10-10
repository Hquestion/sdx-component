<template>
    <div class="resource-usage">
        <div v-if="cpu > 0">
            <span>CPU: </span>
            <span>{{ cpu }} ({{ t('view.skyide.Core') }})</span>
        </div>
        <div v-if="memory > 0">
            <span>{{ t('view.skyide.Memory') }}: </span>
            <span>{{ memory }} (GB)</span>
        </div>
        <div v-if="gpu > 0">
            <span>GPU({{ t('view.skyide.Model') }}:{{ gpuModel }}): </span>
            <span>{{ gpu }} ({{ t('view.skyide.Piece') }})</span>
        </div>
    </div>
</template>

<script>
import { parseMilli, byteToGB } from '@sdx/utils/lib/helper/transform';
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'ResourceUsage',
    mixins: [locale],
    inject: {
        app: {
            taskManager: {}
        }
    },
    computed: {
        cpu() {
            return this.app.taskManager && this.app.taskManager.task && this.app.taskManager.task.quota && parseMilli(this.app.taskManager.task.quota.cpu) || 0;
        },
        memory() {
            return this.app.taskManager && this.app.taskManager.task && this.app.taskManager.task.quota && byteToGB(this.app.taskManager.task.quota.memory) || 0;
        },
        gpu() {
            return this.app.taskManager && this.app.taskManager.task && this.app.taskManager.task.quota && this.app.taskManager.task.quota.gpu || 0;
        },
        gpuModel() {
            return this.app.taskManager && this.app.taskManager.task && this.app.taskManager.task.quota && this.app.taskManager.task.quota.gpuModel || '-';
        }
    },
    mounted() {
        this.$nextTick(() => {
            console.error(this.app);
        });
    }
};
</script>

<style lang="scss" scoped>
    .resource-usage {
        min-height: 40px;
        background: #31436E;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #DDE5FE;
        letter-spacing: 0.07px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        padding: 12px 16px;
        & > div {
            & + div {
                margin-left: 40px;
            }
        }
    }
</style>
