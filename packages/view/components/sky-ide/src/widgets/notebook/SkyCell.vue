<template>
    <div
        class="sky-cell"
        :class="{'is-active': isActive}"
        @click="selectCell"
    >
        <div class="sky-cell-operations">
            <SdxuIconButton icon="sdx-icon sdx-icon-check" title="剪切" @click.native.stop="cutCell"></SdxuIconButton>
            <SdxuIconButton icon="sdx-icon sdx-kaobei" title="粘贴" @click.native.stop="pasteBelow"></SdxuIconButton>
            <SdxuIconButton icon="sdx-icon sdx-icon-back" title="上移" @click.native.stop="moveUp"></SdxuIconButton>
            <SdxuIconButton icon="sdx-icon sdx-icon-back" title="下移" @click.native.stop="moveDown"></SdxuIconButton>
            <SdxuIconButton icon="sdx-icon sdx-icon-delete" title="删除" @click.native.stop="deleteCell"></SdxuIconButton>
            <SdxuIconButton icon="sdx-icon sdx-fabu" title="清除输出" @click.native.stop="clearOutput"></SdxuIconButton>
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
        this.$emit('cell-destroy', this.cellData, this.cellWidget);
        if (this.cellData.cell_type === 'markdown') {
            this.$el.removeEventListener('dblclick', this.toggleMarkdownRendered);
        }
    }
};
</script>

<style lang="scss">
    .sky-cell {
        &.is-active {
            & /deep/ {
                .jp-Collapser {
                    background: #03a9f4;
                }
            }
        }
    }
</style>