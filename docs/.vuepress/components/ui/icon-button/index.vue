<template>
    <div class="index">
        <SdxuIconButton icon="sdx-icon sdx-icon--download"></SdxuIconButton>
        <SdxuIconButton icon="sdx-icon sdx-icon--download" :disable="true"></SdxuIconButton>
        <SdxuIconButton icon="sdx-icon sdx-icon--download" size="small"></SdxuIconButton>
        <SdxuIconButton icon="sdx-icon sdx-icon--download" title="我是title"></SdxuIconButton>
    </div>
</template>

<script>
import IconButton from '@sdx/ui/components/icon-button';
export default {
    name: 'index',
    data() {
        return {};
    },
    components: {
        [IconButton.name]: IconButton
    }
}
</script>

<style lang="scss" scoped>

</style>
