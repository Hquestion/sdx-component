<template>
    <div
        class="sdxu-placeholder-block"
        :class="[`sdxu-placeholder-block--${size}`]"
        :style="{background: color}"
    />
</template>

<script>
export default {
    name: 'SdxuPlaceholderBlock',
    data() {
        return {};
    },
    props: {
        size: {
            type: String,
            default: 'regular' // regular, small, large
        },
        color: {
            type: String,
            default: "#FAFBFC"
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
