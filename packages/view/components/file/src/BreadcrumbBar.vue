<template>
    <div class="sdxv-file-breadcrumb-bar">
        <div class="file-breadcrumb"></div>
        <div class="loaded-tip">
            已加载<span>{{ fileManager.loadedTotal }}</span>条，共{{ fileManager.total }}条
        </div>
    </div>
</template>

<script>
export default {
    name: 'BreadcrumbBar',
    inject: ['fileManager'],
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
    .sdxv-file-breadcrumb-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
