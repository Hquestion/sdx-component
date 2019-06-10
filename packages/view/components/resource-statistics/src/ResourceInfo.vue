<template>
    <div class="sdxv-resource-info">
        <div class="sdxv-resource-info__title">
            <span>{{ title }}</span>
            <span class="sdxv-resource-info__title--unit">{{ unit }}</span>
        </div>
        <div class="sdxv-resource-info__content">
            <div class="sdxv-resource-info__content--item">
                <span>已使用</span><span>{{ used }}</span>
            </div>
            <div class="sdxv-resource-info__content--item">
                <span>{{ totalDesc }}</span><span>{{ total }}</span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'SdxvResourceInfo',
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
                    ? 'GPU' : '内存';
        },
        unit() {
            return this.type === 'cpu' 
                ? '(核)' 
                : this.type === 'gpu' 
                    ? '(块)' : '(GB)';
        },
        totalDesc() {
            return this.type === 'cpu' 
                ? '总核数' 
                : this.type === 'gpu' 
                    ? '总块数' : '总资源';
        }
    }
};
</script>

<style>

</style>
