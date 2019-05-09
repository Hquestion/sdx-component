<template>
    <div class="sdxu-contnet-panel">
        <div class="sdxu-contnet-panel__header">
            <div class="sdxu-contnet-panel__title">
                <span>{{ title }}</span>
                <span class="sdxu-contnet-panel__subtitle">{{ subtitle }}</span>
            </div>
            <div class="sdxu-contnet-panel__right">
                <slot name="right" />
            </div>
        </div>
        <div class="sdxu-contnet-panel__main">
            <slot>
                <div class="sdxu-contnet-panel__main__empty">
                    暂无内容
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SdxuContentPanel',
    data() {
        return {};
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        subtitle: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
