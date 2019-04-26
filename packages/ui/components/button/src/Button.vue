<template>
    <div
        :class="['sdxu-button',
                 `sdxu-button--${size}`,
                 `sdxu-button--${type}`,
                 plain ? `is-plain` : '',
                 disabled ? `is-disabled` : '',
                 loading ? `is-loading`: '',
                 invert ? 'is-invert' : '',
                 shadow ? 'is-shadow' : '',
                 block ? 'is-block': ''
        ]"
        @click="handleClick"
    >
        <i
            :class="['sdxu-button__icon iconfont', iconShown]"
            v-if="iconShown"
        />
        <slot />
    </div>
</template>

<script>
export default {
    name: 'SdxuButton',
    data() {
        return {};
    },
    props: {
        size: {
            type: String,
            default: 'regular' // regular , small
        },
        type: {
            type: String,
            default: 'primary' // primary, success, warning, error, default
        },
        invert: {
            type: Boolean,
            default: false
        },
        plain: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        shadow: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: ''
        },
        loading: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        iconShown() {
            if (this.loading) {
                return 'iconicon-success';
            } else {
                return this.icon;
            }
        }
    },
    methods: {
        handleClick() {
            this.$emit('click');
        }
    }
};
</script>
