<template>
    <div
        tabindex="1"
        :class="['sdxu-button',
                 `sdxu-button--${size}`,
                 `sdxu-button--${type}`,
                 plain ? `is-plain` : '',
                 disabled ? `is-disabled` : '',
                 loading ? `is-loading`: '',
                 invert ? 'is-invert' : '',
                 shadow ? 'is-shadow' : '',
                 block ? 'is-block': '',
                 iconOnly ? 'is-icon': ''
        ]"
        @click="handleClick"
        @mouseover="handleMouseOver"
        @mouseout="handleMouseOut"
    >
        <i
            :class="['sdxu-button__icon sdx-icon', iconShown]"
            v-if="iconShown"
        />
        <span class="sdxu-button__main">
            <slot />
        </span>
        <span
            class="sdxu-button__icon--dropdown"
            v-if="$slots.dropdown && !iconOnly"
            :class="[dropdownVisible ? 'is-reverse' : '']"
        >
            <i
                class="sdx-icon"
                :class="[dropdownIconMap[dropdownArrow]]"
            />
        </span>
        <el-collapse-transition>
            <div
                class="sdxu-button__dropdown"
                :style="{width: `calc(${dropdownWidth} + 20px)`}"
                :class="[
                    trigger==='hover' ? 'is-hover' : '',
                    placement === 'right' ? 'sdxu-button__dropdown--place-right' : 'sdxu-button__dropdown--place-left'
                ]"
                v-if="$slots.dropdown"
                v-show="dropdownVisible"
            >
                <div class="sdxu-button__dropdown--main" @click.stop>
                    <slot name="dropdown" />
                </div>
            </div>
        </el-collapse-transition>
    </div>
</template>

<script>
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import emitter from '@sdx/utils/src/mixins/emitter';

export default {
    name: 'SdxuButton',
    componentName: 'SdxuButton',
    data() {
        return {
            dropdownVisible: false,
            dropdownIconMap: {
                solid: 'sdx-icon-arrow-down',
                cover: 'sdx-icon-caret-bottom'
            }
        };
    },
    mixins: [emitter],
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
        iconOnly: {
            type: Boolean,
            default: false
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
            default: '100%'
        },
        placement: {
            type: String,
            default: 'left'
        },
        dropdownArrow: {
            type: String,
            default: 'solid' // solid,cover
        },
        keepDropdownOpen: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        iconShown() {
            if (this.loading) {
                return 'sdx-icon-loading';
            } else {
                return this.icon;
            }
        }
    },
    methods: {
        handleClick() {
            if (this.trigger === 'click') {
                this.dropdownVisible = !this.dropdownVisible;
            } else {
                this.$emit('click');
            }
            this.dispatch('SdxuButton', 'sdxu.button.hideDropdown');
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
            if (!e || !this.$el.contains(e.target)) {
                this.dropdownVisible = false;
            }
        }
    },
    watch: {
        dropdownVisible(val) {
            if (val) {
                this.$emit('dropdown-show');
            } else {
                this.$emit('dropdown-hide');
            }
        }
    },
    mounted() {
        document.addEventListener('click', this.hideDropdown);
        this.dispatch('SdxuButtonGroup', 'button-add');
        this.$on('sdxu.button.hideDropdown', () => {
            !this.keepDropdownOpen && (this.dropdownVisible = false);
        });
    },
    beforeDestroy() {
        document.removeEventListener('click', this.hideDropdown);
        this.dispatch('SdxuButtonGroup', 'button-remove');
        this.$off('sdxu.button.hideDropdown');
    }
};
</script>
