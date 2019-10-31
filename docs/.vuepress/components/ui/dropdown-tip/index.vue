<template>
    <div class="index">
        <SdxuDropdownTip>
            <i class="sdx-icon sdx-tiaofutishi" slot="ref"></i>
            <span slot="title">你好</span>
            <div>xsajkhckjsahcjksahkchaskchkashkcas</div>
        </SdxuDropdownTip>
    </div>
</template>

<script>
    import DropdownTip from '@sdx/ui/components/dropdown-tip';
    import PlaceholderBlock from '@sdx/ui/components/placeholder-block';
    export default {
        name: 'index',
        data() {
            return {};
        },
        components: {
            [DropdownTip.name]: DropdownTip,
            [PlaceholderBlock.name]: PlaceholderBlock
        }
    }
</script>

<style lang="scss" scoped>
    .index {
        flex: 1;
    }
</style>
