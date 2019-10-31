<template>
    <div class="sdxu-dropdown-tip">
        <el-popover
            placement="bottom"
            :width="width"
            trigger="hover"
            :visible-arrow="false"
            :popper-options="popperOption"
            popper-class="sdxu-dropdown-tip__popper"
        >
            <slot
                name="ref"
                slot="reference"
            />
            <div class="sdxu-dropdown-tip__title" v-show="$slots.title || title">
                <slot name="title">
                    {{ title }}
                </slot>
            </div>
            <div class="sdxu-dropdown-tip__content">
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
