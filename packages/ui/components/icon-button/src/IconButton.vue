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
        v-loading="loading"
    >
        <i :class="[icon]" />
    </div>
</template>

<script>
import emitter from '@sdx/utils/src/mixins/emitter';
export default {
    name: 'SdxuIconButton',
    mixins: [emitter],
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
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handlerClick(e) {
            this.$emit('click', e);
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.dispatch('SdxuIconButtonGroup', 'sdxu.change');
        });
    },
    beforeDestroy() {
        this.$nextTick(() => {
            this.dispatch('SdxuIconButtonGroup', 'sdxu.change');
        });
    }
};
</script>
