<template>
    <div class="sdxu-empty">
        <div>
            <i class="sdx-icon sdx-icon-warning sdxu-empty__icon"></i>
        </div>
        <div class="sdxu-empty__desc">
            <slot>暂无内容</slot>
        </div>

    </div>
</template>

<script>
export default {
    name: 'SdxuEmpty',
    data() {
        return {};
    }
};
</script>
