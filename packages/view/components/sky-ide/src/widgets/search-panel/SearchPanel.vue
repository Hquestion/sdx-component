<template>
    <div class="sky-seach-panel">
        <SdxuInput
            size="small"
            v-model="command"
            @input="$emit('seach-value', command)"
            :placeholder="t('sdxCommon.Search')"
        >
            <span
                slot="prefix"
                class="sdx-icon sdx-icon-search"
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
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'SkySeachPanel',
    mixins: [locale],
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
    background: #29395F;
    padding: 10px;
    box-shadow: 0 5px 10px 0 #0E162E;
    border-radius: 4px;
    /deep/ {
        .sdxu-input--small .el-input__inner {
            height: 32px;
            line-height: 32px;
            background: #435480;
            color: #DDE5FE;
            border-radius: 4px;
            font-size: 12px;
        }
        .el-input__prefix {
            left: 8px;
            color: #A0A5B8;
        }
        input.el-input__inner {
            border: 1px solid #435480;
        }
        input.el-input__inner:focus {
            border: 1px solid #4880F8;
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
