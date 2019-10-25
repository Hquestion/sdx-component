<template>
    <div class="index" style="height: 300px;width: 500px;border: 1px solid #ccc">
        <SdxuScroll>
            <div class="main" style="height: 500px;"></div>
        </SdxuScroll>
    </div>
</template>

<script>
import SdxuScroll from '@sdx/ui/components/scroll';
export default {
    name: 'index',
    data() {
        return {};
    },
    components: {
        SdxuScroll
    }
}
</script>

<style lang="scss" scoped>
    .main {
        background-image: -webkit-linear-gradient(top, #000, #f00);
    }
</style>
