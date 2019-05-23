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
import '@sdx/utils/src/theme-common/iconfont/iconfont.js';
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

    }
};
</script>

<style lang="scss" scoped>

</style>
