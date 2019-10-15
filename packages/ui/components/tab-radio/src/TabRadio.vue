<template>
    <div
        class="sdxu-tab-radio"
        @click="handleClick"
        :class="[
            active.name === name ? 'is-active' : '',
            `sdxu-tab-radio--${size}`
        ]"
    >
        <slot />
    </div>
</template>

<script>
import emitter from '@sdx/utils/src/mixins/emitter';
export default {
    name: 'SdxuTabRadioItem',
    data() {
        return {};
    },
    inject: ['active'],
    mixins: [emitter],
    props: {
        name: {
            type: String,
            default: '',
            required: true
        },
        size: {
            type: String,
            default: 'regular'
        }
    },
    methods: {
        handleClick() {
            this.active.name = this.name;
        }
    },
    mounted() {
        this.dispatch('SdxuTabRadioGroup', 'sdxu.tab-radio.add');
    },
    destroyed() {
        this.dispatch('SdxuTabRadioGroup', 'sdxu.tab-radio.minus');
    }
};
</script>
