<template>
    <div class="sdxu-empty">
        <div>
            <i
                class="sdx-icon sdx-icon-warning sdxu-empty__icon"
                v-if="emptyType === 'warning'"
            />
            <svg
                class="icon"
                aria-hidden="true"
            >
                <use xlink:href="#iconwushuju" />
            </svg>
        </div>
        <div class="sdxu-empty__desc">
            <slot>暂无内容</slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SdxuEmpty',
    props: {
        emptyType: {
            type: String,
            default: 'nodata',
        }
    },
    data() {
        return {};
    }
};
</script>
