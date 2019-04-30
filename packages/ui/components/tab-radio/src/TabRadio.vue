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
export default {
    name: 'SdxuTabRadioItem',
    data() {
        return {};
    },
    inject: ['active'],
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
    }
};
</script>
