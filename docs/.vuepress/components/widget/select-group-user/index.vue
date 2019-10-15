<template>
    <div class="index">
        同时选择用户和用户组
        <img :src="imgUrl" alt="">
    </div>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            imgUrl:require("../../../public/widget/select-group-user/index.png")
        };
    }
}
</script>

<style lang="scss" scoped>
    .index {
        width: 400px;
    }
</style>
