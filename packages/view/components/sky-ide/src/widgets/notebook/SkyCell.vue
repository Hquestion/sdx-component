<template>
    <div
        class="sky-cell"
        :class="{'is-active': isActive,
                 'is-selected': isSelected}"
        @click.shift.exact="selectMutiCells"
        @click.exact="selectCell"
    >
        <div class="sky-cell-operations">
            <SdxuIconButton
                icon="sdx-icon sdx-jianqiedaima"
                :title="t('view.skyide.shear')"
                @click.native.stop="cutCell"
                :native-tooltip="true"
            />
            <SdxuIconButton
                icon="sdx-icon sdx-kaobeidaima"
                :title="t('view.skyide.paste')"
                @click.native.stop="pasteBelow"
                :native-tooltip="true"
            />
            <SdxuIconButton
                icon="sdx-icon sdx-xiangshangyidong"
                :title="t('view.skyide.shift_up')"
                @click.native.stop="moveUp"
                :native-tooltip="true"
            />
            <SdxuIconButton
                icon="sdx-icon sdx-xiangxiayidong"
                :title="t('view.skyide.shift_down')"
                @click.native.stop="moveDown"
                :native-tooltip="true"
            />
            <SdxuIconButton
                icon="sdx-icon sdx-shanchu"
                :title="t('sdxCommon.Delete')"
                @click.native.stop="deleteCell"
                :native-tooltip="true"
            />
            <SdxuIconButton
                icon="sdx-icon sdx-qingchuyunhangxiaoguo"
                :title="t('view.skyide.Clear_Output')"
                @click.native.stop="clearOutput"
                :native-tooltip="true"
                v-if="cellData.cell_type ==='code' && (typeof(cellData.outputs) === 'string' ? cellData.outputs : cellData.outputs.length)"
            />
        </div>
    </div>
</template>

<script>
import '@jupyterlab/cells/style/index.css';
import './widget.css';
import { v4 as uuid } from 'uuid';
import CodeMirror from 'codemirror';
import { CodeCellModel, CodeCell, MarkdownCell, MarkdownCellModel, RawCell, RawCellModel } from '@jupyterlab/cells';

import { CodeMirrorMimeTypeService, Mode } from '@jupyterlab/codemirror';

import {
    RenderMimeRegistry,
    standardRendererFactories as initialFactories
} from '@jupyterlab/rendermime';

import { Widget } from '@phosphor/widgets';
import SdxuIconButton from '@sdx/ui/components/icon-button';
import { MathJaxTypesetter } from '@jupyterlab/mathjax2';
import locale from '@sdx/utils/src/mixins/locale';
import { CommandIDs } from '../../config/commands';
export default {
    name: 'SkyCell',
    mixins: [locale],
    data() {
        return {
            cellWidget: null
        };
    },
    components: {
        SdxuIconButton
    },
    inject: {
        app: {
            default: {}
        },
        snb: {
            default: {}
        }
    },
    props: {
        cellData: {
            type: Object,
            default: () => {}
        },
        metadata: {
            type: Object,
            default: () => {}
        },
        order: {
            type: Number,
            default: 0
        },
        readonly: {
            type: Boolean,
            default: false
        },
        activate: {
            type: Number,
            default: -1
        },
        index: {
            type: Number,
            default: -1
        }
    },
    computed: {
        isActive() {
            return this.snb.activeCellOrder === this.order;
        },
        isSelected() {
            let index = this.index;
            let source = this.snb.selectedCellsRange.source;
            let target = this.snb.selectedCellsRange.target;
            return index <= target && index >= source || index >= target && index <= source;
        }
    },
    methods: {
        init() {
            const mimeService = new CodeMirrorMimeTypeService();

            // Create the cell widget with a default rendermime instance.
            const rendermime = new RenderMimeRegistry({
                initialFactories,
                latexTypesetter: new MathJaxTypesetter({
                    url: this.snb.mathjaxUrl,
                    config: this.snb.mathjaxConfig
                })
            });

            let cellWidget, model, extension;
            switch (this.cellData.cell_type) {
                case 'code':
                    model = new CodeCellModel({
                        cell: this.cellData
                    });

                    cellWidget = this.cellWidget = new CodeCell({
                        rendermime,
                        model: model,
                        id: uuid()
                    }).initializeState();
                    // 设置编辑器的语言模式
                    extension = this.snb.notebook.metadata.language_info && this.snb.notebook.metadata.language_info.fileExtension || '.py';
                    cellWidget.model.mimeType = this.findMimeTypeByExtension(extension.slice(1));
                    break;
                case 'markdown':
                    cellWidget = this.cellWidget = new MarkdownCell({
                        rendermime,
                        model:  new MarkdownCellModel({
                            cell: this.cellData
                        })
                    }).initializeState();
                    cellWidget.rendered = false;
                    break;
                default:
                    cellWidget = this.cellWidget = new RawCell({
                        rendermime,
                        model:  new RawCellModel({
                            cell: this.cellData
                        })
                    }).initializeState();
                    break;
            }
            cellWidget.editor.setOption('theme', 'seti');
            cellWidget.model.contentChanged.connect(model => {
                Object.assign(this.cellData, model.toJSON());
            });
            this.customizeEditor(cellWidget);
            if (this.readonly) {
                cellWidget.readOnly = true;
            }
            // Attach the panel to the DOM.
            Widget.attach(cellWidget, this.$el);

            cellWidget.editor.editor.on('focus', () => {
                this.selectCell();
            });
            cellWidget.editor.editor.on('mousedown', () => {
                this.selectCell();
            });
            this.$emit('cell-attach', this.cellData, this.cellWidget);
            this.$nextTick(() => {
                if (this.cellData.cell_type === 'markdown') {
                    this.$el.addEventListener('dblclick', this.toggleMarkdownRendered);
                }
            });
        },
        /**
         * 对jupyter的CodeEditor做一些定制
         */
        customizeEditor(cellWidget) {
            cellWidget.editor.setOption('lineNumbers', true);
        },
        /**
         * 根据下标找到合适的Mime类型
         * @param ext
         * @returns {*}
         */
        findMimeTypeByExtension(ext) {
            return CodeMirror.findModeByExtension(ext);
        },
        selectCell() {
            this.$emit('active-cell', this.order);
        },
        selectMutiCells() {
            this.$emit('select-cell', this.index, this.order);
        },
        toggleMarkdownRendered(e) {
            let target = e.target;
            let currentTarget = e.currentTarget;
            while(target !== currentTarget) {
                if (target.classList.contains('jp-MarkdownOutput')) {
                    this.cellWidget.rendered = false;
                    return;
                } else {
                    target = target.parentNode;
                }
            }
        },
        cutCell() {
            this.app.commands.execute(CommandIDs.CELL_CUT);
        },
        pasteBelow() {
            this.app.commands.execute(CommandIDs.CELL_PASTE);
        },
        moveUp() {
            this.app.commands.execute(CommandIDs.CELL_MOVEUP);
        },
        moveDown() {
            this.app.commands.execute(CommandIDs.CELL_MOVEDOWN);
        },
        deleteCell() {
            this.app.commands.execute(CommandIDs.CELL_DELETE);
        },
        clearOutput() {
            this.app.commands.execute(CommandIDs.CELL_OUTPUTS_CLEAR);
        },
        changeCellType(type) {
            console.log(type);
        },
        updateCellMimeType() {
            if (this.cellData.cell_type === 'code') {
                let extension = this.snb.notebook.metadata.language_info && this.snb.notebook.metadata.language_info.fileExtension || '.py';
                this.cellWidget.model.mimeType = this.findMimeTypeByExtension(extension.slice(1));
            }
        }
    },
    mounted() {
        this.init();
    },
    beforeDestroy() {
        this.cellWidget && this.cellWidget.dispose();
        this.$emit('cell-destroy', this.cellData, this.cellWidget);
        if (this.cellData.cell_type === 'markdown') {
            this.$el.removeEventListener('dblclick', this.toggleMarkdownRendered);
        }
    }
};
</script>

<style lang="scss">
    .sky-cell {
        position: relative;
        padding: 8px 0;
        margin-top: 10px;
        .sky-cell-operations {
            display: none;
            font-size: 0;
        }
        &.is-active {
            box-shadow: 0 5px 10px 0 #091023;
            & /deep/ {
                .jp-Collapser {
                    background: #4880F8;
                    cursor: pointer;
                }
            }
            .sky-cell-operations {
                display: inline-block;
                // width: 240px;
                position: absolute;
                z-index: 9;
                right: 8px;
                background: #2F406A;
                box-shadow: 0 3px 6px 0 rgba(14,22,46,0.68);
                border-radius: 4px;
                height: 32px;
                line-height: 32px;
                top: -12px;
                .sdxu-icon-button {
                    width: 40px;
                    height: 32px;
                    line-height: 32px;
                    text-align: center;
                    i {
                        color:  #DDE5FE;
                    }
                }
                .sdxu-icon-button:first-child {
                    border-radius: 4px 0 0 4px;
                }
                .sdxu-icon-button:last-child {
                    border-radius: 0px 4px 4px 0px;
                }
                .sdxu-icon-button:hover {
                    background: #3764C6;
                }
            }
            .sdxu-icon-button + .sdxu-icon-button {
                margin-left: 0px;
            }
        }
        &.is-selected {
            box-shadow: 0 5px 10px 0 #091023;
            & /deep/ {
                .jp-Collapser {
                    background: #4880F8;
                    cursor: pointer;
                }
            }
            .sdxu-icon-button + .sdxu-icon-button {
                margin-left: 0px;
            }
        }
        /deep/ {
            .jp-Collapser {
                background: #151D32;
            }
            .jp-InputArea-editor {
                border: 0;
                background: none;
            }
            .p-Widget.jp-Cell.jp-CodeCell.jp-mod-noOutputs, .p-Widget.jp-Cell.jp-MarkdownCell {
                background: #1B2439;
                padding: 0;
            }
            .jp-Cell-inputArea {
                background: #151D32;
                padding: 16px 0;
            }
            .jp-Placeholder {
                height: 56px;
                background: #222F4F;
                .jp-MoreHorizIcon:before {
                    content: '...';
                    font-size: 31px;
                    position: relative;
                    top: -1px;
                    letter-spacing: 13px;
                    font-weight: 900;
                    line-height: 42px;
                    width: 100px;
                    display: block;
                    height: 56px;
                    padding: 0 20px;
                    background: #151D32;
                    box-sizing: border-box;
                    color: #A0A5B8;
                    left: -68px;
                }
                .jp-Placeholder-content .jp-MoreHorizIcon:hover {
                    border: none;
                }
            }
            .jp-RenderedMarkdown.jp-MarkdownOutput {
                color: #fff;
            }
            .jp-RenderedText pre {
                color: #fff;
            }
            .jp-RenderedText[data-mime-type='application/vnd.jupyter.stderr'] pre{
                color: #000;
            }
            .cm-s-seti .CodeMirror-gutters {
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #838EB5;
                background-color: #222F4F;
                border: none;
            }
            .CodeMirror-lines {
                background: #151D32;
                padding: 6px 0;
            }
            .jp-InputPrompt {
                color: #F2F5FF;
            }
        }
    }
</style>
