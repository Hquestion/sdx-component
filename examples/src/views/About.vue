<template>
    <div class="about">
        <h1>This is an about page</h1>
        <SdxuButton
            :loading="false"
            :plain="false"
            type="default"
            :invert="true"
            :shadow="true"
        >
            你好
        </SdxuButton>
        <SdxuIconButtonGroup>
            <SdxuIconButton
                icon="sdx-icon sdx-icon-delete"
                title="删除"
            />
            <SdxuIconButton
                icon="sdx-icon sdx-icon-delete"
                title="删除"
            />
            <SdxuIconButton
                icon="sdx-icon sdx-icon-delete"
                title="删除"
            />
            <SdxuIconButton
                icon="sdx-icon sdx-icon-delete"
                title="删除"
            />
            <SdxuIconButton
                icon="sdx-icon sdx-icon-delete"
                title="删除"
            />
            <SdxuIconButton
                icon="sdx-icon sdx-icon-delete"
                title="删除"
                @click="onClick(1)"
            />
        </SdxuIconButtonGroup>
    </div>
</template>
<script>
import SdxuButton from '@sdx/ui/components/button';
import SdxuIconButtonGroup from '@sdx/ui/components/icon-button-group/src/IconButtonGroup';
import SdxuIconButton from '@sdx/ui/components/icon-button';
export default {
    name: 'About',
    data() {
        return {
            a: 1
        };
    },
    components: {
        SdxuIconButtonGroup,
        SdxuButton,
        SdxuIconButton
    },
    methods: {
        onClick(a) {
            alert(a+5);
            this.a = a + 5;
        }
    }
};
</script>
