<template>
    <div class="sdxui-buttons">
        <div>
            <p>
                <SdxuButton type="default">默认</SdxuButton>
                <SdxuButton type="primary">primary</SdxuButton>
                <SdxuButton type="primary" size="small">small</SdxuButton>
                <SdxuButton type="primary" size="regular" :invert="true">invert</SdxuButton>
                <SdxuButton type="primary" size="regular" :loading="true">loading</SdxuButton>
            </p>
            <p>
                <SdxuButton type="primary" size="regular" :plain="true">文字按钮</SdxuButton>
                <SdxuButton type="primary" size="regular" :disabled="true">禁用</SdxuButton>
                <SdxuButton type="default" size="regular" :shadow="true">投影</SdxuButton>
            </p>
            <p>
                <SdxuButton type="primary" size="regular" :block="true">block</SdxuButton>
            </p>
            <p>
                <SdxuButton type="text" size="regular" trigger="hover">
                    中文
                    <template slot="dropdown">
                        <SdxuButton type="text" size="regular" block>中文</SdxuButton>
                        <SdxuButton type="primary" :invert="true" :plain="true" size="regular" block>English</SdxuButton>
                    </template>
                </SdxuButton>
                <SdxuButton type="primary" size="regular" trigger="click" dropdown-width="150px">
                    中文
                    <template slot="dropdown">
                        <SdxuButton type="primary" size="regular" block>中文</SdxuButton>
                        <SdxuButton type="text" size="regular" block>English</SdxuButton>
                    </template>
                </SdxuButton>
                <SdxuButton type="primary" :iconOnly="true" placement="right">
                    H
                    <template slot="dropdown">
                        <SdxuButton type="primary" size="regular" block>中文</SdxuButton>
                        <SdxuButton type="text" size="regular" block>English</SdxuButton>
                    </template>
                </SdxuButton>
            </p>
        </div>
    </div>
</template>

<script>
import SdxuButton from '@sdx/ui/components/button';
export default {
    name: 'ButtonDemo',
    data() {
        return {};
    },
    components: {
        SdxuButton
    }
}
</script>

<style lang="scss" scoped>
    .sdxui-buttons {

    }
</style>
