<template>
    <div class="unsupported-file">
        暂不支持当前文件格式
    </div>
</template>

<script>
export default {
    name: 'UnsupportedFile',
    data() {
        return {};
    },
    components: {}
};
</script>

<style scoped lang="scss">
.unsupported-file {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // margin: 20px 0;
    color: #fff;
}
</style>
