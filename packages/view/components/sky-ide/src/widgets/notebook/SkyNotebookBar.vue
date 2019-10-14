<template>
    <div class="sky-notebook-bar">
        <div>
            <SdxuIconButton
                @click="saveNotebook"
                icon="sdx-icon sdx-baocun"
                :title="t('view.skyide.save')"
                :native-tooltip="true"
            />
            <SdxuIconButton
                icon="sdx-icon sdx-fuzhidaima"
                :title="t('view.skyide.copy')"
                :native-tooltip="true"
            />
            <el-dropdown
                @command="insertCell"
                trigger="click"
                placement="bottom-start"
            >
                <SdxuIconButton
                    icon="sdx-icon sdx-xinzengbiaoqian"
                    class="marginleft32 marginright8"
                />
                <el-dropdown-menu
                    slot="dropdown"
                    class="sky-notebook-bar-dropdown"
                >
                    <el-dropdown-item command="code">
                        code
                    </el-dropdown-item>
                    <el-dropdown-item command="markdown">
                        markdown
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <SdxuButton
                @click="toggleMode()"
                icon="sdx-icon sdx-zhuanhuandaima"
                :native-tooltip="true"
            >
                {{ ( snb.activeCell && snb.activeCell.cell_type) === 'code' ? t('view.skyide.Turn_to_MD') : t('view.skyide.Turn_to_code') }}
            </SdxuButton>
            <SdxuIconButton
                icon="sdx-icon sdx-yunhang"
                :title="t('sdxCommon.Run')"
                class="marginleft32"
                :native-tooltip="true"
                @click="runCell"
            />
            <SdxuIconButton
                @click="runNotebook"
                icon="sdx-icon sdx-quanbuyunhang"
                :title="t('view.skyide.Run_all')"
                :native-tooltip="true"
            />
            <SdxuIconButton
                icon="sdx-icon sdx-tingzhi1"
                :title="t('sdxCommon.Stop')"
                :native-tooltip="true"
                @click="stop"
            />
            <SdxuIconButton
                icon="sdx-icon sdx-chongzi"
                :title="t('view.skyide.debug')"
                :native-tooltip="true"
                @click="debugByCell"
            />
            <SdxuIconButton
                @click="clearAllOutput"
                icon="sdx-icon sdx-qingchu"
                :title="t('view.skyide.Clear_Output')"
                :native-tooltip="true"
            />
            <SdxuIconButton
                @click="debugByCell"
                icon="sdx-icon sdx-tiaoshi"
                class="marginleft32 marginright8"
                v-if="false"
                :native-tooltip="true"
            />
            <el-popover
                trigger="click"
                placement="bottom-start"
                popper-class="sky-popover"
                width="300"
                style="margin-left: 32px"
            >
                <SkyCommands />
                <SdxuIconButton
                    slot="reference"
                    icon="sdx-icon sdx-bianzu4"
                    :title="t('view.skyide.View_commands')"
                    :native-tooltip="true"
                />
            </el-popover>
            <el-popover
                ref="codeSnippetPop"
                trigger="click"
                placement="bottom-start"
                popper-class="sky-popover"
                width="300"
                style="margin-left: 10px"
            >
                <SkyCodeSnippets @close="$refs.codeSnippetPop.doClose()" />
                <sdxu-button
                    :native-tooltip="true"
                    slot="reference"
                >
                    {{ t('view.skyide.code_snippet') }}
                    <i
                        class="sdx-icon sdx-xialaxuanxiang"
                        style="font-size: 12px; margin-left: 5px;"
                    />
                </sdxu-button>
            </el-popover>
        </div>
        <div>
            <kernel-state></kernel-state>
            <el-select
                v-model="codeType"
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
import IconButton from '@sdx/ui/components/icon-button';
import Button from '@sdx/ui/components/button';
import { Select, Popover, Dropdown, DropdownMenu, DropdownItem} from 'element-ui';
import SkyCommands from './SkyCommands';
import SkyCodeSnippets from './SkyCodeSnippets';
import KernelState from './KernelState';
import locale from '@sdx/utils/src/mixins/locale';
import {CommandIDs} from '../../config/commands';
export default {
    name: 'SkyNotebookBar',
    mixins: [locale],
    data() {
        return {
            codeOptions: [{
                value: 'python3',
                label: 'Python 3'
            }, {
                value: 'ir',
                label: 'R'
            }]
        };
    },
    computed: {
        kernelStatus: {
            get() {
                return !!this.snb.session;
            },
            set(val) {
                if (val) {
                    // 启动
                    this.snb.debugByCell();
                } else {
                    this.snb.cancelDebug();
                }
            }
        },
        codeType: {
            get() {
                return this.snb.notebook.metadata.kernelspec && this.snb.notebook.metadata.kernelspec.name;
            },
            set(val) {
                this.snb.changeLangKernel(val);
            }
        }
    },
    components: {
        [IconButton.name]: IconButton,
        [Button.name]: Button,
        [Select.name]: Select,
        [Popover.name]: Popover,
        SkyCommands,
        SkyCodeSnippets,
        [Dropdown.name]: Dropdown,
        [DropdownMenu.name]: DropdownMenu,
        [DropdownItem.name]: DropdownItem,
        KernelState
    },
    inject: {
        snb: {
            default: {}
        },
        app: {
            commands: {}
        }
    },
    methods: {
        saveNotebook() {
            this.app.commands.execute(CommandIDs.SAVE_DOC);
        },
        insertCell(type) {
            if(type === 'code') {
                this.app.commands.execute(CommandIDs.CELL_ADD_CODE);
            } else if(type === 'markdown') {
                this.app.commands.execute(CommandIDs.CELL_ADD_MARKDOWN);
            }
        },
        insertRawCell() {
            this.snb.insertCell('raw');
        },
        toggleMode() {
            this.app.commands.execute(CommandIDs.CELL_TOGGLE_CODE);
        },
        clearAllOutput() {
            this.app.commands.execute(CommandIDs.CELLS_OUTPUTS_CLEAR);
        },
        runNotebook() {
            this.app.commands.execute(CommandIDs.CELLS_RUN);
        },
        runCell() {
            this.app.commands.execute(CommandIDs.CELL_RUN);
        },
        stop() {
            this.app.commands.execute(CommandIDs.CELLS_SHUTDOWN);
        },
        debugByCell() {
            this.app.commands.execute(CommandIDs.CELLS_DEBUG);
        },
        changeSwitch() {
            window.console.log(this.kernelStatus);
        }
    },
};
</script>

<style lang="scss">
.sky-notebook-bar {
    background: #394C7E;
    height: 40px;
    line-height: 40px;
    padding-left: 16px;
    font-family: PingFangSC-Regular;
    letter-spacing: 0.07px;
    display: flex;
    justify-content: space-between;
    .marginleft32 {
        margin-left: 32px !important;
    }
    .marginright8 {
        margin-right: 8px;
    }
    .basic-btn-style {
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border-radius: 4px;
        color: #DDE5FE;
    }
    .switch-content {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #DDE5FE;
        padding-left: 16px;
    }
    .el-select {
        width: 120px;
        height: 40px;
        margin-left: 24px;
        /deep/ {
            .el-input__inner {
                border-radius: 0;
                border-color: transparent;
                border: 0;
                height: 40px;
                background: #4E69AE;
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
            background: #4E69AE;
            @extend .basic-btn-style;
        }
        .sdxu-icon-button + .sdxu-icon-button, .sdxu-button + .sdxu-button {
            margin-left: 8px;
        }
        .sdxu-button--regular  {
            border: none;
            background: #4E69AE;
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
        .el-select-dropdown.el-popper {
            margin-top: 0;
        }
    }
}
.sky-popover {
    padding: 0 !important;
    border: 0 !important;
    .popper__arrow {
        display: none !important;
    }
}
.sky-notebook-bar-dropdown.el-popper.el-dropdown-menu {
    margin-top: 0 !important;
    border: 0;
    background: #344777;
    box-shadow: 0 5px 10px 0 #0E162E;
    border-radius: 4px;
    font-size: 14px;
    padding: 0;
    /deep/ {
        .el-dropdown-menu__item {
            line-height: 40px;
            height: 40px;
            padding: 0 8px;
            color: #DDE5FE;
        }
        .el-dropdown-menu__item:hover {
            background: #2A51A7;
        }
        .popper__arrow::after {
            display: none;
        }
    }
}
</style>

