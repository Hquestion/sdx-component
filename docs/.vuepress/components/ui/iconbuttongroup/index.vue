<template>
    <div class="index">
        <SdxuIconButtonGroup>
            <SdxuIconButton icon="sdx-icon sdx-icon--download" title="按钮一"></SdxuIconButton>
            <SdxuIconButton icon="sdx-icon sdx-icon--download" title="按钮二"></SdxuIconButton>
            <SdxuIconButton icon="sdx-icon sdx-icon--download" title="按钮三"></SdxuIconButton>
            <SdxuIconButton icon="sdx-icon sdx-icon--download" title="按钮四"></SdxuIconButton>
        </SdxuIconButtonGroup>
        <SdxuIconButtonGroup>
            <SdxuIconButton icon="sdx-icon sdx-icon--download" title="按钮一"></SdxuIconButton>
            <SdxuIconButton icon="sdx-icon sdx-icon--download" title="按钮二"></SdxuIconButton>
            <SdxuIconButton icon="sdx-icon sdx-icon--download" title="按钮三"></SdxuIconButton>
        </SdxuIconButtonGroup>
    </div>
</template>

<script>
import IconButton from '@sdx/ui/components/icon-button';
import IconButtonGroup from '@sdx/ui/components/icon-button-group';
export default {
    name: 'index',
    data() {
        return {};
    },
    components: {
        [IconButton.name]: IconButton,
        [IconButtonGroup.name]: IconButtonGroup
    }
}
</script>

<style lang="scss" scoped>

</style>
