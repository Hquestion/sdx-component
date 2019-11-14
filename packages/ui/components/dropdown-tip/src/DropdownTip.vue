<template>
    <div class="sdxu-dropdown-tip">
        <el-popover
            placement="bottom"
            trigger="hover"
            :visible-arrow="false"
            :popper-options="popperOption"
            :disabled="disabled"
            :popper-class="popperClasses"
            v-model="visible"
        >
            <slot
                name="ref"
                slot="reference"
            />
            <div
                class="sdxu-dropdown-tip__title"
                v-show="$slots.title || title"
            >
                <slot name="title">
                    {{ title }}
                </slot>
            </div>
            <div
                class="sdxu-dropdown-tip__content"
                :style="{width: width}"
            >
                <slot />
            </div>
        </el-popover>
    </div>
</template>

<script>
export default {
    name: 'SdxuDropdownTip',
    props: {
        width: {
            type: String,
            default: '200px'
        },
        title: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        popperClass: {
            type: String,
            default: ''
        },
        popperVisible: {
            type: Boolean,
            default: false
        }
    },
    model: {
        prop: 'popperVisible',
        event: 'visible'
    },
    computed: {
        popperClasses() {
            return `${this.popperClass} sdxu-dropdown-tip__popper`;
        },
        visible: {
            get() {
                return this.popperVisible;
            },
            set(val) {
                this.$emit('visible', val);
            }
        }
    },
    data() {
        var offsetTopModifier = function(data) {
            data.offsets.popper.top -= 12;
            return data;
        };
        return {
            popperOption: {
                gpuAcceleration: false,
                modifiers: [ offsetTopModifier, 'applyStyle']
            }
        };
    }
};
</script>
