<template>
    <div class="sdxu-content-panel">
        <div
            class="sdxu-content-panel__header"
            v-if="title || $slots.right || $slots.title"
        >
            <div
                class="sdxu-content-panel__title"
                :class="{'is-slot': $slots.title}"
                v-if="title || $slots.title"
            >
                <slot name="title">
                    <span>{{ title }}</span>
                    <span class="sdxu-content-panel__subtitle">{{ subtitle }}</span>
                </slot>
            </div>
            <div class="sdxu-content-panel__right">
                <slot name="right" />
            </div>
        </div>
        <div class="sdxu-content-panel__main">
            <slot>
                <div class="sdxu-content-panel__empty">
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
