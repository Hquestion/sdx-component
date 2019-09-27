<template>
    <div class="sky-seach-panel">
        <SdxuInput
            size="small"
            v-model="command"
            @input="$emit('seach-value', command)"
        >
            <span
                slot="prefix"
                class="sdx-icon sdxu-input__icon sdx-icon-search"
            />
        </SdxuInput>
        <div :style="{'height': contentMaxHeight, 'min-height': contentMinHeight}">
            <SdxuScroll>
                <slot />
            </SdxuScroll>
        </div>
    </div>
</template>

<script>
import SdxuInput from '@sdx/ui/components/input';
import SdxuScroll from '@sdx/ui/components/scroll';
export default {
    name: 'SkySeachPanel',
    components: {
        SdxuInput,
        SdxuScroll
    },
    props: {
        contentMaxHeight: {
            type: String,
            default: '356px'
        },
        contentMinHeight: {
            type: String,
            default: '100px'
        }
    },
    data() {
        return {
            command: ''
        };
    }
};
</script>

<style lang="scss" scoped>
.sky-seach-panel {
    background: #1F2942;
    color: #DDE5FE;
    padding: 10px;
    /deep/ {
        .sdxu-input--small .el-input__inner {
            height: 32px;
            line-height: 32px;
            background: #2C3A60;
            color: #DDE5FE;
        }
        .el-input__prefix {
            left: 8px;
            color: #A0A5B8;
        }
        input.el-input__inner {
            border: none !important;
        }
        .__bar-is-vertical {
            background: #3A63BF !important;
            border-radius: 3px !important;
            width: 6px !important;
        }
        .__bar-wrap-is-vertical {
            width: 4px!important;
            background: #34446A !important;
            border-radius: 2px !important;
        }
    }
}
</style>
