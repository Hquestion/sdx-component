<template>
    <div class="sdxu-contnet-panel">
        <div class="sdxu-panel__header">
            <div class="sdxu-panel__title">
                {{title}}
            </div>
            <div class="sdxu-panel__right">
                <slot name="right"></slot>
            </div>
        </div>
        <div class="sdxu-panel__main">
            <slot>
                <div class="sdxu-panel__main__empty">
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
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
