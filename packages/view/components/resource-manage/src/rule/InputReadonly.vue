<template>
    <div
        class="input-readonly"
        :class="[`input-readonly--${size}`]"
    >
        <slot />
    </div>
</template>

<script>
export default {
    name: 'InputReadonly',
    data() {
        return {};
    },
    props: {
        size: {
            type: String,
            default: 'small'
        }
    }
};
</script>

<style lang="scss" scoped>
    @import '~@sdx/utils/src/theme-common/var';
    .input-readonly {
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        background: #F2F6FC;
        color: #000015;
        font-size: 14px;
        padding: 0 6px;
        border-radius: $sdx-border-radius;
        &.input-readonly--small {
            min-width: $sdx-form-element-height-small;
            height: $sdx-form-element-height-small;
            line-height: $sdx-form-element-height-small;
        }
        &.input-readonly--regular {
            min-width: $sdx-form-element-height-regular;
            height: $sdx-form-element-height-regular;
            line-height: $sdx-form-element-height-regular;
        }
        &.input-readonly--large {
            min-width: $sdx-form-element-height-large;
            height: $sdx-form-element-height-large;
            line-height: $sdx-form-element-height-large;
        }
    }
</style>
