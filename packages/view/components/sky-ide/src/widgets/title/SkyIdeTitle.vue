<template>
    <div class="skyide-title">
        <div class="logo">
            SkyIde
        </div>
        <div class="content">
            SDX_FULL项目
        </div>
    </div>
</template>

<script>
export default {
    name: 'SkyIdeTitle'
};
</script>
<style lang="scss" scoped>
    .skyide-title {
        background: #1C253D;
        height: 64px;
        line-height: 64px;
        position: relative;
        display: flex;
        justify-content: center;
        color: #fff;
        .logo {
            position: absolute;
            left: 20px;
        }
    }
</style>