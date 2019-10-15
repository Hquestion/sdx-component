<template>
    <div class="index">
        选择共享设置
        <img :src="imgUrl" alt="">
    </div>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            imgUrl:require("../../../public/widget/share-setting/index.png")
        };
    }
}
</script>

<style lang="scss" scoped>
    .index {
        width: 400px;
    }
</style>
