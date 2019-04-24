<template>
    <div class="cache-container">
        <feb-alive>
            <router-view />
        </feb-alive>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.cache-container {
    min-height: 100%;
    padding: 20px;
}
</style>