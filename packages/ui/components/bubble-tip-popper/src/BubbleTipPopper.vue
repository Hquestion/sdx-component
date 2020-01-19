<template>
    <el-popover
        placement="bottom-start"
        :trigger="trigger"
        :visible-arrow="false"
        :disabled="disabled"
        :popper-class="popperClasses"
        v-model="visible"
    >
        <slot
            name="ref"
            slot="reference"
        />
        <BubbleTip
            :type="type"
            :content="content"
            :visible="true"
            :show-footer="false"
            :light="light"
            :title="title"
        >
            <slot />
        </BubbleTip>
    </el-popover>
</template>

<script>
import BubbleTip from '../../bubble-tip/src/BubbleTip';
export default {
    name: 'SdxuBubbleTipPopper',
    props: {
        trigger: {
            type: String,
            default: 'hover' // click, hover
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
        },
        title: {
            type: String,
            default: ''
        },
        light: {
            type: Boolean,
            default: false
        },
        content: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'warning'
        }
    },
    components: {
        BubbleTip
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
};
</script>

<style scoped>

</style>
