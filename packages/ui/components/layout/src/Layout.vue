<template>
    <div
        class="sdxu-layout"
        :class="[`sdxu-layout--${align}`, `sdxu-layout--v-${valign}`]"
    >
        <slot />
    </div>
</template>

<script>
export default {
    name: 'SdxuLayout',
    data() {
        return {};
    },
    props: {
        align: {
            type: String,
            default: 'center'
        },
        valign: {
            type: String,
            default: 'center'
        },
        gap: {
            type: Number,
            default: 20
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
