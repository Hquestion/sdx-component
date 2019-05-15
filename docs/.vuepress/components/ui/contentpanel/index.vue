<template>
    <div class="index">
        <sdxu-content-panel title="我是标题" subtitle="我是副标题">
            我是内容
        </sdxu-content-panel>
        <SdxuPlaceholderBlock></SdxuPlaceholderBlock>
        <sdxu-content-panel>
            <div slot="title">
                我是通过slot设置的title
            </div>
            <div slot="right">
                <i class="sdx-icon sdx-icon-star-off" title="我是通过slot插入的图标"></i>
            </div>
            我是内容
        </sdxu-content-panel>
    </div>
</template>

<script>
import ContentPanel from '@sdx/ui/components/content-panel';
import PlaceholderBlock from '@sdx/ui/components/placeholder-block';
export default {
    name: 'index',
    data() {
        return {};
    },
    components: {
        [ContentPanel.name]: ContentPanel,
        [PlaceholderBlock.name]: PlaceholderBlock
    }
}
</script>

<style lang="scss" scoped>
.index {
    flex: 1;
}
</style>
