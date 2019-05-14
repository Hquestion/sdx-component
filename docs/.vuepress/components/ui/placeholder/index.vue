<template>
    <div class="index">
        <SdxuPlaceholderBlock></SdxuPlaceholderBlock>
        <SdxuPlaceholderBlock size="small" color="#f00"></SdxuPlaceholderBlock>
        <SdxuPlaceholderBlock size="large" color="#0f0"></SdxuPlaceholderBlock>
    </div>
</template>

<script>
import PlaceholderBlock from '@sdx/ui/components/placeholder-block';
export default {
    name: 'index',
    data() {
        return {};
    },
    components: {
        [PlaceholderBlock.name]: PlaceholderBlock
    }
}
</script>

<style lang="scss" scoped>
.index {
    flex: 1;
}
</style>
