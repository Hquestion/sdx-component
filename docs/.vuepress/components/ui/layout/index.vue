<template>
    <div class="index">
        <SdxuLayout>
            <SdxuButton>按钮一</SdxuButton>
            <SdxuButton>按钮二</SdxuButton>
        </SdxuLayout>
        <SdxuLayout align="left">
            <SdxuButton>按钮一</SdxuButton>
            <SdxuButton>按钮二</SdxuButton>
        </SdxuLayout>
        <SdxuLayout align="right">
            <SdxuButton>按钮一</SdxuButton>
            <SdxuButton>按钮二</SdxuButton>
        </SdxuLayout>
        <SdxuLayout align="right" valign="top" style="height: 60px;background: #dedede">
            <SdxuButton>按钮一</SdxuButton>
            <SdxuButton>按钮二</SdxuButton>
        </SdxuLayout>
        <SdxuLayout align="right" valign="bottom" style="height: 60px;background: #dedede">
            <SdxuButton>按钮一</SdxuButton>
            <SdxuButton>按钮二</SdxuButton>
        </SdxuLayout>
    </div>
</template>

<script>
import SdxuLayout from '@sdx/ui/components/layout';
import SdxuButton from '@sdx/ui/components/button';
export default {
    name: 'index',
    data() {
        return {};
    },
    components: {
        SdxuLayout,
        SdxuButton
    }
}
</script>

<style lang="scss" scoped>
    .index {
        width: 100%;
    }
</style>
