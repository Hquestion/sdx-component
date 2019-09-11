<template>
    <div class="sky-notebook">
        <SkyNotebookBar />
        <div class="sky-notebook__main" tabindex="1">
            <!--展示notebook cells-->
            <SkyCell
                v-for="(cell, index) in notebook.cells"
                :key="cell.order"
                :index="index"
                :order="cell.order"
                :cell-data="cell"
                :metadata="notebook.metadata"
                @active-cell="onActiveCell"
                @cell-attach="onAttachCell"
                @cell-destroy="onRemoveCell"
            />
        </div>
    </div>
</template>

<script>
import { readFile } from '@sdx/utils/src/api/file';
import SkyNotebookBar from './SkyNotebookBar';
import SkyCell from './SkyCell';
import SkyCodeCellModel from '../../model/CodeCell';
import SkyMarkdownCellModel from '../../model/MarkdownCell';
import SkyRawCellModel from '../../model/RawCell';
import { CodeCell } from '@jupyterlab/cells';
import setupCommands from './setupCommands';
import { initCommands } from '../../config/commands';

export default {
    name: 'SkyNotebook',
    components: {
        SkyNotebookBar,
        SkyCell
    },
    data() {
        return {
            notebook: {
                cells: [],
                metadata: {},
            },
            editorSupport: true,
            activeCellOrder: -1,
            order: 0,
            cellMap: {},
            cuttingCell: undefined
        };
    },
    props: {
        file: {
            type: Object,
            default: () => {}
        },
        mathjaxUrl: {
            type: String,
            default: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js',
            required: true
        },
        mathjaxConfig: {
            type: String,
            default: 'TeX-AMS_CHTML-full,Safe'
        }
    },
    provide() {
        return {
            snb: this
        };
    },
    inject: {
        app: {
            default: {
                commands: initCommands()
            }
        }
    },
    computed: {
        activeCell() {
            if (this.activeCellOrder >= 0) {
                return this.notebook.cells.find(cell => cell.order === this.activeCellOrder);
            }
            return undefined;
        },
        activeCellWidget() {
            if (this.activeCellOrder >= 0) {
                return this.cellMap[this.activeCellOrder];
            }
            return undefined;
        }
    },
    methods: {
        nextOrder() {
            return ++this.order;
        },
        async readFile(file) {
            return await readFile(file.path, file.ownerId);
        },
        makeCells(content, file) {
            if (file.fileExtension === '.py' || file.path.endsWith('.py')) {
                let cell = new SkyCodeCellModel({
                    source: content
                });
                cell.order = this.nextOrder();
                this.notebook.cells = [cell];
                this.notebook.metadata = {
                    'kernelspec': {
                        'display_name': 'Python 3',
                        'language': 'python',
                        'name': 'python3'
                    },
                    'language_info': {
                        'codemirror_mode': {
                            'name': 'ipython',
                            'version': 3
                        },
                        'file_extension': '.py',
                        'mimetype': 'text/x-python',
                        'name': 'python',
                        'nbconvert_exporter': 'python',
                        'pygments_lexer': 'ipython3',
                        'version': '3.6.5'
                    }
                };
            } else if (file.fileExtension === '.ipynb' || file.path.endsWith('.ipynb')) {
                let contentJSON = typeof content === 'string' ? JSON.parse(content) : content;
                contentJSON.cells.forEach(cell => {
                    cell.order = this.nextOrder();
                });
                this.notebook.cells = contentJSON.cells;
                this.notebook.metadata = contentJSON.metadata;
            } else {
                // 不支持的类型
                this.notebook.cells = [];
                this.notebook.metadata = {};
                this.editorSupport = false;
            }
        },
        async renderNotebook(file) {
            let content = await this.readFile(file);
            this.makeCells(content, file);
            requestAnimationFrame(() => {
                window.console.log('Notebook渲染完毕');
                this.activateCell(this.cells[0]);
            });
        },
        onActiveCell(order) {
            this.activeCellOrder = order;
        },
        onAttachCell(data, widget) {
            this.cellMap[data.order] = widget;
        },
        onRemoveCell(data, widget) {
            delete this.cellMap[data.order];
        },
        /**
        * 插入cell
        */
        insertCell(type, model) {
            let cell;
            if (type === 'code') {
                cell = model || new SkyCodeCellModel({});
            } else if (type === 'markdown') {
                cell = model || new SkyMarkdownCellModel({});
            } else {
                cell = model || new SkyRawCellModel({});
            }
            cell.order = this.nextOrder();
            this.notebook.cells.push(cell);
            this.$nextTick(() => {
                this.activateCell(cell);
            });
        },
        activateCell(cell) {
            let widget = this.cellMap[cell.order];
            if (widget) {
                widget.activate();
            }
        },
        runCell() {
            if (this.activeCell && this.notebook.cells[this.activeCellOrder].cell_type === 'code') {
                CodeCell.execute(this.cellMap[this.activeCell.order], {kernel: {}});
            } else if (this.activeCell && this.notebook.cells[this.activeCellOrder].cell_type === 'markdown') {
                this.activeCell.rendered = true;
            } else {
                // do nothing
            }
        },
        /**
         * 切换cell类型
         * @param type
         */
        changeCellType(type) {
            let activeCell = this.activeCell;
            if (activeCell.cell_type === type) {
                return;
            }
            let cell = this.activeCellWidget.model.toJSON();
            cell.order = this.nextOrder();
            cell.cell_type = type;
            let index = this.notebook.cells.findIndex(cell => cell.order === this.activeCellOrder);
            this.notebook.cells.splice(index, 1, cell);

            this.$nextTick(() => {
                this.activeCellOrder = cell.order;
                this.activeCellWidget.activate();
                if (type === 'code') {
                    this.activeCellWidget.model.trusted = false;
                }
                if (type === 'markdown') {
                    this.activeCellWidget.model.rendered = false;
                }
            });
        }
    },
    watch: {
        // 文件变化时，读取文件内容展示，主要用于初始化
        file: {
            immediate: true,
            deep: true,
            async handler(val) {
                if (val && val.path) {
                    const content = await this.readFile(val);
                    this.makeCells(content, val);
                }
            }
        }
    },
    mounted() {
        setupCommands(this.app.commands, this);
    }
};
</script>

<style lang="scss" scoped>
.sky-notebook {
    height: 100%;
    overflow: auto;
}
</style>
