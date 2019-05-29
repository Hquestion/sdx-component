<template>
    <div
        class="sdxu-icon-button"
        :class="[
            `sdxu-icon-button--${size}`,
            active ? 'is-active' : '',
            disable ? 'is-disable': ''
        ]"
        v-show="visible"
        :title="title"
        @click.stop="handlerClick"
    >
        <i :class="[icon]" />
    </div>
</template>

<script>
export default {
    name: 'SdxuIconButton',
    data() {
        return {
            visible: true
        };
    },
    props: {
        icon: {
            type: String,
            default: ''
        },
        active: {
            type: Boolean,
            default: false
        },
        disable: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'regular'
        },
        title: {
            type: String,
            default: ''
        }
    },
    methods: {
        handlerClick(e) {
            this.$emit('click', e);
        }
    }
};
</script>
