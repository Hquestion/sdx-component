<template>
    <div class="sdxv-resource-info">
        <div class="sdxv-resource-info__title">
            <span>{{ title }}</span>
            <span class="sdxv-resource-info__title--unit">{{ unit }}</span>
        </div>
        <div class="sdxv-resource-info__content">
            <div class="sdxv-resource-info__content--item">
                <span>{{ t('view.monitor.resourceStatistic.Used') }}</span><span>{{ used }}</span>
            </div>
            <div class="sdxv-resource-info__content--item">
                <span>{{ totalDesc }}</span><span>{{ total }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'SdxvResourceInfo',
    mixins: [locale],
    props: {
        type: {
            type: String,
            default: 'cpu',
            validator: (value) => {
                return ['cpu', 'gpu', 'mem'].includes(value);
            }
        },
        total: {
            type: Number,
            default: 0
        },
        used: {
            type: Number,
            default: 0
        }
    },
    computed: {
        title() {
            return this.type === 'cpu' 
                ? 'CPU' 
                : this.type === 'gpu' 
                    ? 'GPU' : this.t('view.monitor.resourceStatistic.Memory');
        },
        unit() {
            return this.type === 'cpu' 
                ? `(${this.t('view.monitor.resourceStatistic.Memory')})` 
                : this.type === 'gpu' 
                    ? `(${this.t('view.monitor.resourceStatistic.Block')})` : '(GB)';
        },
        totalDesc() {
            return this.type === 'cpu' 
                ? this.t('view.monitor.resourceStatistic.CPUTotal')
                : this.type === 'gpu' 
                    ? this.t('view.monitor.resourceStatistic.GPUTotal') : this.t('view.monitor.resourceStatistic.MemoryTotal');
        }
    }
};
</script>

<style>

</style>
