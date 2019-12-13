<template>
    <div
        class="sdxu-icon-button"
        :class="[
            `sdxu-icon-button--${size}`,
            active ? 'is-active' : '',
            disable ? 'is-disable': '',
            border ? 'is-border' : ''
        ]"
        v-show="visible"
        @click="handlerClick"
        v-loading="loading"
    >
        <TextTooltip
            :title="title"
            :native-tooltip="nativeTooltip"
        >
            <i :class="[icon]" />
        </TextTooltip>
    </div>
</template>

<script>
import emitter from '@sdx/utils/src/mixins/emitter';
import TextTooltip from '@sdx/ui/components/text-tooltip';
export default {
    name: 'SdxuIconButton',
    mixins: [emitter],
    data() {
        return {
            visible: true
        };
    },
    components: {
        TextTooltip
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
        },
        nativeTooltip: {
            type: Boolean,
            default: false
        },
        border: {
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
