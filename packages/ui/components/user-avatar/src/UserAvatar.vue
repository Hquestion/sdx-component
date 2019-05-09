<template>
    <div class="sdxu-user-avatar">
        <div class="sdxu-user-avatar__icon">
            <svg
                class="sdxu-user-avatar__svg"
                aria-hidden="true"
            >
                <use xlink:href="#iconicon-UserInfo" />
            </svg>
        </div>
        <div class="sdxu-user-avatar__name">
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
    }
};
</script>

<style lang="scss" scoped>

</style>
