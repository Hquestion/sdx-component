<template>
    <div
        class="sdxv-info-container"
        :class="{'is-background': background}"
    >
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        background: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style>

</style>
