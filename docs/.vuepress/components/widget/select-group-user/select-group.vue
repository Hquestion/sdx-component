<template>
    <div class="index">
        只选择用户组
        <img :src="imgUrl" alt="">
    </div>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            imgUrl:require("../../../public/widget/select-group-user/select-group.png")
        };
    }
}
</script>

<style lang="scss" scoped>
    .index {
        width: 400px;
    }
</style>
