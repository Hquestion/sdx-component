<template>
    <div
        class="sdxv-info-container"
        :class="{'is-background': background}"
    >
        <div class="sdxv-info-container__box">
            <slot />
        </div>
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
