<template>
    <div class="sdxu-user-avatar">
        <div class="sdxu-user-avatar__icon">
            <svg
                class="sdxu-user-avatar__svg"
                aria-hidden="true"
            >
                <use xlink:href="#sdx-icon-UserInfo" />
            </svg>
        </div>
        <div
            class="sdxu-user-avatar__name"
            v-if="name"
        >
            {{ name }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'SdxuUserAvatar',
    data() {
        return {};
    },
    props: {
        name: {
            type: String,
            default: ''
        }
    },
    mounted() {
        import('@sdx/utils/src/theme-common/iconfont/iconfont.js');
    }
};
</script>

<style lang="scss" scoped>

</style>
