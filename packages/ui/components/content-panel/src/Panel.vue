<template>
    <div class="sdxu-content-panel" :class="{'sdxu-content-panel--fullscreen': fullscreen, 'is-header' : title || $slots.right || $slots.title}">
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
import SdxuScroll from '@sdx/ui/components/scroll';
export default {
    name: 'SdxuContentPanel',
    data() {
        return {};
    },
    components: {
        SdxuScroll
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        subtitle: {
            type: String,
            default: ''
        },
        fullscreen: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'normal' // small, mini
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
