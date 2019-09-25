<template>
    <div class="sky-notebook-bar">
        <div>
            <SdxuIconButton
                @click="saveNotebook"
                icon="sdx-icon sdx-baocun"
            />
            <SdxuIconButton
                icon="sdx-icon sdx-fuzhidaima"
            />
            <SdxuButton
                @click="insertCodeCell"
                icon="sdx-icon sdx-xinzengbiaoqian"
                class="marginleft32"
            >      
                code
            </SdxuButton>
            <SdxuButton
                @click="insertMarkdownCell"
                icon="sdx-icon sdx-xinzengbiaoqian"
            >
                markdown
            </SdxuButton>
            <SdxuButton
                @click="insertRawCell"
                v-if="false"
            >
                +Raw
            </SdxuButton>
            <SdxuButton
                @click="toggleMode()"
                icon="sdx-icon sdx-zhuanhuandaima"
            >
                {{ modeType === 'code' ? '转为MD' : '转为code' }}
            </SdxuButton>
            <SdxuIconButton
                @click="toggleMode('raw')"
                v-if="false"
            >
                切换为Raw
            </SdxuIconButton>
            <span class="btnlist marginleft32">
                <SdxuIconButton
                    @click="runNotebook"
                    icon="sdx-icon sdx-quanbuyunhang"
                    size="small"
                />
                <SdxuIconButton
                    icon="sdx-icon sdx-yunhang"
                    size="small"
                />
                <SdxuIconButton
                    icon="sdx-icon sdx-tingzhi1"
                    size="small"
                />
            </span>
            <SdxuIconButton
                icon="sdx-icon sdx-chongzi"
            />
            <SdxuIconButton
                @click="clearOutput"
                icon="sdx-icon sdx-qingchu"
            />
            <SdxuIconButton
                @click="debugByCell"
                icon="sdx-icon sdx-tiaoshi"
                class="marginleft32"
            />
            <SdxuIconButton
                icon="sdx-icon sdx-bianzu4"
            />
            <sdxu-button
                placement="right"
                trigger="click"
                style="margin-left: 10px;"
            >
                添加代码片段
                <template slot="dropdown">
                    <SdxuButton
                        type="text"
                        size="regular"
                        block
                        v-for="(item, index) in sinppets"
                        :key="index"
                        @click="addSnippet(item)"
                    >
                        {{ item.name }}
                    </SdxuButton>
                </template>
            </sdxu-button>
        </div>
        <div>
            <el-switch
                v-model="kernelValue"
                active-color="rgb(74,128,245)"
                inactive-color="rgb(189,206,242)"
                @change="changeSwitch"
            /><span class="switch-content">{{ kernelValue ? 'Kernel已连接' : 'Kernel未连接' }}</span>
            <el-select
                v-model="codeType"
                placeholder="请选择"
                :popper-append-to-body="false"
            >
                <el-option
                    v-for="item in codeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
        </div>
    </div>
</template>

<script>
import { saveFile, readFile } from '@sdx/utils/src/api/file';
import sinppets from '../../config/snippets';
import SkyCodeCellModel from '../../model/CodeCell';
import IconButton from '@sdx/ui/components/icon-button';
import Button from '@sdx/ui/components/button';
import { Select} from 'element-ui';
export default {
    name: 'SkyNotebookBar',
    data() {
        return {
            sinppets,
            kernelValue: false,
            codeType: 'Python3',
            codeOptions: [{
                value: 'Python3',
                label: 'Python3'
            }, {
                value: 'R',
                label: 'R'
            }],
            modeType: 'code'
        };
    },
    components: {
        [IconButton.name]: IconButton,
        [Button.name]: Button,
        [Select.name]: Select
    },
    inject: {
        snb: {
            default: {}
        }
    },
    methods: {
        saveNotebook() {
            this.snb.save();
        },
        insertCodeCell() {
            this.snb.insertCell('code');
        },
        addSnippet(item) {
            this.snb.insertCell('code', new SkyCodeCellModel({
                source: item.code
            }));
        },
        insertMarkdownCell() {
            this.snb.insertCell('markdown');
        },
        insertRawCell() {
            this.snb.insertCell('raw');
        },
        toggleMode() {
            this.modeType = this.modeType === 'code' ? 'markdown' : 'code';
            this.snb.changeCellType(this.modeType);
        },
        clearOutput() {
            if (this.snb.activeCell) {
                this.snb.activateCell.outputs = [];
                this.snb.cellMap[this.snb.activeCellOrder].model.outputs.clear();
            }
        },
        runNotebook() {
            this.snb.runNotebook();
        },
        debugByCell() {
            this.snb.debugByCell();
        },
        changeSwitch() {
            window.console.log(this.kernelValue);
        }
    },
};
</script>

<style lang="scss" scoped>
.sky-notebook-bar {
    background: #35466D;
    height: 48px;
    line-height: 48px;
    padding-left: 16px;
    font-family: PingFangSC-Regular;
    letter-spacing: 0.07px;
    display: flex;
    justify-content: space-between;
    .marginleft32 {
        margin-left: 32px !important;
    }
    .basic-btn-style {
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border-radius: 4px;
    }
    .btnlist {
        background: #4D639A;
        border-radius: 4px;
        height: 24px;
        line-height: 21px;
        vertical-align: middle;
        display: inline-block;
        padding: 0 8px;
        margin-right: 8px;
        .sdxu-icon-button {
            @extend .basic-btn-style;
        }
    }
    .switch-content {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #DDE5FE;
        padding-left: 16px;
    }
    .el-select {
        width: 120px;
        height: 48px;
        margin-left: 24px;
        /deep/ {
            .el-input__inner {
                border-radius: 0;
                border-color: transparent;
                border: 0;
                height: 48px;
                background: #4880F8;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #DDE5FE;
                letter-spacing: 0.08px;
            }
            .el-select-dropdown__list {
                padding: 0;
                background: #223050;
                box-shadow: 0 5px 10px 0 #0E162E;
                border-radius: 4px;
            }
            .el-select-dropdown__item.hover {
                background-color: #34539B;
            }
            .el-select-dropdown__item {
                color: #ffffff;
                padding: 0 16px;
                height: 50px;
                line-height: 50px;
            }
            .el-select-dropdown {
                border: none;
            }
        }
    }
    /deep/ {
        .sdxu-icon-button--regular {
            font-size: 14px;
            background: #4D639A;
            @extend .basic-btn-style;
        }
        .sdxu-icon-button + .sdxu-icon-button, .sdxu-button + .sdxu-button {
            margin-left: 8px;
        }
        .sdxu-button--regular  {
            border: none;
            background: #4D639A;
            border-radius: 4px;
            font-size: 12px;
            color: #DDE5FE;
            height: 24px;
            line-height: 24px;
            vertical-align: middle;
            padding: 0 8px;
        }
        .sdxu-button__icon {
            font-size: 12px !important;
            margin-right: 4px;
        }
        .sdx-zhuanhuandaima {
            font-size: 16px !important;
        }
        .sdxu-button__main {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #DDE5FE;
            letter-spacing: 0.07px;
        }
        .sdxu-icon-button:hover, .sdxu-button:hover {
            color: #DDE5FE;
            background: #4880F8;
        }
        .el-switch__core {
            height: 6px;
            width: 24px !important;
        }
        .el-switch__core:after {
            top: -4px;
            left: -1px;
            width: 12px;
            height: 12px;
            background-color: rgb(189,206,242);
        }
        .el-switch.is-checked .el-switch__core::after {
            background-color: rgb(133,171,252);
            margin-left: -10px;
        }
    }   
}
</style>
