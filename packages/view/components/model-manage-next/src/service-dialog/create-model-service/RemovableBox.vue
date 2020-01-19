<template>
    <div class="sdxv-removable-box">
        <div class="sdxv-removable-box__content">
            <slot />
        </div>
        <SdxuIconButton
            icon="sdx-icon sdx-kapianshanchu"
            class="sdxv-removable-box__remove"
            @click="$emit('remove')"
        />
    </div>
</template>

<script>
import IconButton from '@sdx/ui/components/icon-button';
export default {
    name: 'RemovableBox',
    data() {
        return {};
    },
    components: {
        [IconButton.name]: IconButton
    }
};
</script>

<style scoped lang="scss">
.sdxv-removable-box {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    .sdxv-removable-box__content {
        border: 1px solid #D8DEEA;
        border-radius: 2px;
        padding: 8px 16px 8px 0;
        width: 450px;
    }
    .sdxv-removable-box__remove {
        border: 1px solid #D8DEEA;
        border-radius: 2px;
        margin-left: 16px;
        padding: 8px;
    }
}
</style>
