<template>
    <div
        class="sky-cell"
        :class="{'is-active': isActive}"
        @click="selectCell"
    >
        <div class="sky-cell-operations">
            <SdxuIconButton
                icon="sdx-icon sdx-jianqiedaima"
                title="剪切"
                @click.native.stop="cutCell" 
            />
            <SdxuIconButton
                icon="sdx-icon sdx-kaobeidaima"
                title="粘贴"
                @click.native.stop="pasteBelow"
            />
            <SdxuIconButton
                icon="sdx-icon sdx-xiangshangyidong"
                title="上移"
                @click.native.stop="moveUp"
            />
            <SdxuIconButton
                icon="sdx-icon sdx-xiangxiayidong"
                title="下移"
                @click.native.stop="moveDown"
            />
            <SdxuIconButton
                icon="sdx-icon sdx-shanchu"
                title="删除"
                @click.native.stop="deleteCell" 
            />
            <SdxuIconButton
                icon="sdx-icon sdx-qingchuyunhangxiaoguo"
                title="清除输出"
                @click.native.stop="clearOutput"
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

export default {
    name: 'SkyCell',
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

            let cellWidget, model;
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
                    cellWidget.model.mimeType = this.findMimeTypeByExtension('py');
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
            this.snb.cuttingCell = this.cellData;
            this.snb.notebook.cells.splice(this.index, 1);
        },
        pasteBelow() {
            if (!this.snb.cuttingCell) {
                return;
            }
            this.snb.notebook.cells.splice(this.index + 1, 0, this.snb.cuttingCell);
            this.snb.cuttingCell = undefined;
        },
        moveUp() {
            if (this.index === 0) return;
            let index = this.index;
            this.snb.notebook.cells.splice(index, 1);
            this.snb.notebook.cells.splice(index - 1, 0, this.cellData);
        },
        moveDown() {
            if (this.index === this.snb.notebook.cells.length - 1) return;
            let index = this.index;
            this.snb.notebook.cells.splice(index, 1);
            this.snb.notebook.cells.splice(index + 1, 0, this.cellData);
        },
        deleteCell() {
            this.snb.notebook.cells.splice(this.index, 1);
        },
        clearOutput() {
            this.cellData.outputs = [];
            this.cellWidget._model._outputs.clear();
        },
        changeCellType(type) {
            console.log(type);
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
        }
        &.is-active {
            & /deep/ {
                .jp-Collapser {
                    background: #03a9f4;
                    cursor: pointer;
                }
            }
            .sky-cell-operations {
                display: inline-block;
                width: 200px;
                position: absolute;
                z-index: 9;
                right: 8px;
                background: #34446B;
                box-shadow: 0 3px 6px 0 rgba(14,22,46,0.68);
                border-radius: 4px;
                height: 40px;
                line-height: 40px;
                padding: 0px 11px;
                top: -20px
            }
            .sdxu-icon-button + .sdxu-icon-button {
                margin-left: 16px;
            }
        }
        /deep/ {
            .jp-InputArea-editor {
                border: 0;
                background: none;
            }
            .p-Widget.jp-Cell.jp-CodeCell.jp-mod-noOutputs, .p-Widget.jp-Cell.jp-MarkdownCell {
                background: #1B2439;
                padding: 0;
            }
            .jp-Placeholder {
                height: 56px;
                background: #242F49;
                .jp-MoreHorizIcon:before {
                    content: '...';
                    font-size: 31px;
                    position: relative;
                    top: 0px;
                    letter-spacing: 13px;
                    font-weight: 900;
                    line-height: 42px;
                    width: 100px;
                    display: block;
                    height: 56px;
                    padding: 0 20px;
                    background: #1B2439;
                    box-sizing: border-box;
                    color: #A0A5B8;
                }
                .jp-Placeholder-content .jp-MoreHorizIcon:hover {
                    border: none;
                }
            }
        }
    }
</style>
