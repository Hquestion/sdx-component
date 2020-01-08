<template>
    <div class="sdxv-string-view">
        {{ stringText }}
    </div>
</template>

<script>
export default {
    name: 'SdxvStringView',
    props: {
        stringText: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss" scoped>
.sdxv-string-view {
    word-break: break-all;
    padding-top: 20px;
}
</style>