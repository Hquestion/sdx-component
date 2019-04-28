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
        @mouseover="handleMouseOver"
        @mouseout="handleMouseOut"
    >
        <i
            :class="['sdxu-button__icon iconfont', iconShown]"
            v-if="iconShown"
        />
        <slot />
        <span
            class="sdxu-button__icon-dropdown"
            v-if="$slots.dropdown"
            :class="[dropdownVisible ? 'is-reverse' : '']"
        >
            <i
                class="iconfont iconicon-caret-bottom"
            />
        </span>
        <el-collapse-transition>
            <div
                class="sdxu-button__dropdown"
                :style="{width: `calc(${dropdownWidth} + 20px)`}"
                :class="{'is-hover': trigger==='hover'}"
                v-if="$slots.dropdown"
                v-show="dropdownVisible"
            >
                <div class="sdxu-button__dropdown--main">
                    <slot name="dropdown" />
                </div>
            </div>
        </el-collapse-transition>
    </div>
</template>

<script>
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
export default {
    name: 'SdxuButton',
    data() {
        return {
            dropdownVisible: false
        };
    },
    components: {
        [CollapseTransition.name]: CollapseTransition
    },
    props: {
        size: {
            type: String,
            default: 'regular' // regular , small
        },
        type: {
            type: String,
            default: 'primary' // primary, success, warning, error, default, text
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
        },
        trigger: {
            type: String,
            default: 'hover'
        },
        dropdownWidth: {
            type: String,
            default: '100px'
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
            if (this.trigger === 'click') {
                this.dropdownVisible = true;
            } else {
                this.$emit('click');
            }
        },
        handleMouseOver() {
            if (this.trigger === 'hover') {
                this.dropdownVisible = true;
            } else {
                this.$emit('mosueover');
            }
        },
        handleMouseOut() {
            if (this.trigger === 'hover') {
                this.dropdownVisible = false;
            } else {
                this.$emit('mosueout');
            }
        },
        hideDropdown(e) {
            if (!this.$el.contains(e.target)) {
                this.dropdownVisible = false;
            }
        }
    },
    mounted() {
        document.addEventListener('click', this.hideDropdown);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.hideDropdown);
    }
};
</script>
