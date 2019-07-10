<template>
    <div class="sdxv-has-nothing">
        <svg
            class="sdxv-has-nothing__icon"
            aria-hidden="true"
        >
            <use xlink:href="#sdx-wushuju" />
        </svg>
        <div class="sdxv-has-nothing__tips">
            <slot name="tips">
                <span>{{ tips }}</span>
            </slot>
        </div>
    </div>
</template>

<script>
import '@sdx/utils/src/theme-common/iconfont/iconfont.js';

export default {
    name: 'SdxuEmpty',
    props: {
        tips: {
            type: String,
            default: '暂无数据'
        }
    }
};
</script>

<style>

</style>
