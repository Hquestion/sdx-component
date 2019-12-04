<template>
    <div class="sky-notebook">
        <SkyNotebookBar />
        <div
            class="sky-notebook__main"
            tabindex="1"
            @contextmenu="handleContextMenu"
        >
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
                @select-cell="onSelectCell"
            />
        </div>
    </div>
</template>

<script>
import { CodeCell } from '@jupyterlab/cells';
import { Session } from '@skyide/services';
import { Completer, CompleterModel, KernelConnector, CompletionHandler } from '@jupyterlab/completer';
import { Widget } from '@phosphor/widgets';

import { readFile, saveFile } from '@sdx/utils/src/api/file';
import SkyNotebookBar from './SkyNotebookBar';
import SkyCell from './SkyCell';
import SkyCodeCellModel from '../../model/CodeCell';
import SkyMarkdownCellModel from '../../model/MarkdownCell';
import SkyRawCellModel from '../../model/RawCell';

import {CommandIDs, initCommands} from '../../config/commands';

import { NotebookMode, NotebookKernelState } from '../../config';

import '@jupyterlab/completer/style/base.css';

import contextMenu from '@sdx/ui/components/context-menu';
import { ContextMenuItemModel, ContextMenuModel, ContextMenuGroupModel } from '@sdx/ui/components/context-menu';
import notebookHelp from '../../mixins/notebookHelper';


export default {
    name: 'SkyNotebook',
    componentName: 'SkyNotebook',
    components: {
        SkyNotebookBar,
        SkyCell
    },
    mixins: [notebookHelp],
    data() {
        return {
            notebook: {
                cells: [],
                metadata: {},
            },
            editorSupport: true,
            activeCellOrder: -1,
            selectedCellsRange: {
                source: -1,
                target: -1
            },
            order: 0,
            cellMap: {},
            clipBoardCells: [],
            session: null,
            mode: NotebookMode.EDIT,
            completer: null,
            completerHandler: null,
            kernelState: NotebookKernelState.STOPPED
        };
    },
    props: {
        file: {
            type: Object,
            default: () => {}
        },
        mathjaxUrl: {
            type: String,
            default: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js'
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
        },
        isPyFile() {
            return this.file.fileExtension === '.py' || this.file.path.endsWith('.py');
        },
        isNbFile() {
            return this.file.fileExtension === '.ipynb' || this.file.path.endsWith('.ipynb');
        },
        isDebugMode() {
            return this.mode === NotebookMode.CELL_DEBUG || this.mode === NotebookMode.DEBUG;
        },
        isEditMode() {
            return this.mode === NotebookMode.EDIT;
        },
        isReadonlyMode() {
            return this.mode === NotebookMode.READONLY;
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
            if (this.isPyFile) {
                let cell = new SkyCodeCellModel({
                    source: content
                });
                cell.order = this.nextOrder();
                this.notebook.cells = [cell];
                this.notebook.metadata = this.makeMetadataByLang('python3');
            } else if (this.isNbFile) {
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
            this.resetSelectedCells();
        },
        onAttachCell(data, widget) {
            this.cellMap[data.order] = widget;
        },
        onRemoveCell(data, widget) {
            delete this.cellMap[data.order];
        },
        onSelectCell(index, order) {
            if (order === this.activeCellOrder || index === this.selectedCellsRange.source) {
                this.onActiveCell(order);
            } else {
                this.selectedCellsRange.source = this.selectedCellsRange.source === -1 ? this.notebook.cells.findIndex(item => item.order === this.activeCellOrder) : this.selectedCellsRange.source;
                this.selectedCellsRange.target = this.notebook.cells.findIndex(item => item.order === order);
                this.activeCellOrder = -1;
            }
        },
        resetSelectedCells() {
            this.selectedCellsRange = {
                source: -1,
                target: -1
            };
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
        async runCell(cell, widget, session, shutdownAfterRun = false) {
            cell = cell || this.activeCell;
            widget = widget || this.activeCellWidget;
            if (cell && cell.cell_type === 'code') {
                if (!session) {
                    session = await this.startSession();
                }
                await CodeCell.execute(widget, session);
                // if (shutdownAfterRun) {
                //     this.shutdownSession(true);
                // }
                return undefined;
            } else if (cell && cell.cell_type === 'markdown') {
                widget.rendered = true;
                return undefined;
            } else {
                // do nothing
                return undefined;
            }
        },
        /**
         * 运行Notebook
         * 遍历cells数组，按顺序执行每个cell
         */
        async runNotebook() {
            let session = this.session;
            if (!session) {
                session = await this.startSession();
            }
            let execCount = 0;
            while(execCount < this.notebook.cells.length) {
                const cell = this.notebook.cells[execCount];
                await this.runCell(cell, this.cellMap[cell.order], session, false);
                execCount++;
            }
            // if (!this.isDebugMode) {
            //     await this.shutdownSession(true);
            // }
            return true;
        },
        /**
         * 创建session，如果已存在则返回该session
         */
        async startSession() {
            if (this.session) {
                return this.session;
            }
            this.kernelState = NotebookKernelState.STARTING;
            await this.app.taskManager.run();
            this.session = await Session.startNew({
                path: this.file.path,
                kernelName: this.notebook.metadata.kernelspec.name,
                serverSettings: this.app.makeSettings()
            });
            this.app.nbSessionMap[this.file.path] = this.session;
            this.kernelState = NotebookKernelState.RUNNING;
            return this.session;
        },

        /**
         * 连接到session,用于恢复状态。
         * 例如：在刷新时重新连接到之前session
         */
        async connectToSession(sessionList) {
            if (!this.initConnection) {
                if (!this.session) {
                    let session = sessionList.find(session => session.path.replace('/user', '') === this.file.path);
                    if (session) {
                        this.session = await Session.connectTo(session, this.app.makeSettings());
                        this.mode = NotebookMode.CELL_DEBUG;
                        this.app.nbSessionMap[this.file.path] = this.session;
                        this.kernelState = NotebookKernelState.RUNNING;
                    }
                }
                this.initConnection = true;
            }
        },

        async shutdownSession(shutdownTask = true) {
            if (!this.session) return true;
            this.kernelState = NotebookKernelState.STOPPING;
            await this.session.shutdown();
            delete this.app.nbSessionMap[this.file.path];
            this.mode = NotebookMode.EDIT;
            this.session = null;
            // 同时停止任务
            // if (shutdownTask && (!this.app.terminal.tabTerminal || this.app.terminal.tabTerminal.length === 0)) {
            //     await this.app.taskManager.stop();
            // }
            this.kernelState = NotebookKernelState.STOPPED;
            return true;
        },
        /**
         * 按cell调试
         * 切换到调试模式，创建session并缓存，并设置cell的completer
         */
        async debugByCell() {
            this.session = await this.startSession();
            this.mode = NotebookMode.CELL_DEBUG;
            // 设置completer
            this.setupCompleter();
        },
        async cancelDebug() {
            if (this.isDebugMode) {
                await this.shutdownSession(true);
                this.mode = NotebookMode.EDIT;
                return null;
            }
            return null;
        },
        async setupCompleter() {
            if (!this.session) {
                window.console.warn('没有活动的session，创建completer失败！');
                if (this.completer) {
                    Widget.detach(this.completer);
                    this.completerHandler.dispose();
                }
                return;
            }
            if (!this.activeCell || this.activeCell.cell_type !== 'code') {
                return;
            }
            const activeWidget = this.activeCellWidget || this.cellMap[this.notebook.cells[0].order];
            const editor = activeWidget.editor;
            const model = new CompleterModel();
            const completer = new Completer({ editor, model });
            const connector = new KernelConnector({ session: this.session });
            const handler = new CompletionHandler({ completer, connector });
            handler.editor = editor;
            completer.hide();
            Widget.attach(completer, this.$el);
            this.completer = completer;
            this.completerHandler = handler;
            // watch activeCell 变化，改变completer的editor
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
        },
        async save() {
            if (this.isPyFile) {
                let code = '';
                this.notebook.cells.forEach(cell => {
                    if (Array.isArray(cell.source)) {
                        code += cell.source.join('\n');
                    } else {
                        code += cell.source;
                    }
                    code += '\n';
                });
                return await saveFile(code, this.file.path, this.file.ownerId).then(res => {
                    return res;
                });
            } else if (this.isNbFile) {
                return await saveFile(JSON.stringify(this.notebook), this.file.path, this.file.ownerId).then(res => {
                    return res;
                });
            } else {
                return Promise.reject('File not support');
            }
        },
        async changeLangKernel(lang) {
            if (lang !== this.notebook.metadata.kernelspec.name) {
                this.notebook.metadata = this.makeMetadataByLang(lang);
                if (this.isDebugMode) {
                    // 如果在debug模式，则切换session到当前语言
                    await this.shutdownSession(false);
                    await this.startSession();
                } else if (this.session){
                    // 如果当前存在session，则关闭session
                    await this.shutdownSession(true);
                }
                // 修改IDE语法支持
                this.updateNotebookMimeType();
            }
        },
        handleContextMenu(e) {
            // // 暂不支持
            // return;
            // // eslint-disable-next-line
            // if (e.shiftKey) {
            //     return;
            // }
            // e.preventDefault();

            // const ins = new ContextMenuModel();
            // const group = new ContextMenuGroupModel({
            //     name: 'Action',
            //     menus: [
            //         new ContextMenuItemModel({
            //             name: '22',
            //             label: 'xxs',
            //             icon: '',
            //         }),
            //         new ContextMenuItemModel({
            //             name: 'run:cell',
            //             label: 'Run Cell',
            //             icon: '',
            //             disabled: () => {
            //                 return this.activeCell && this.activeCell.cell_type === 'raw';
            //             },
            //             callback: () => {
            //                 this.app.commands.execute(CommandIDs.CELL_RUN);
            //             }
            //         }),
            //         new ContextMenuItemModel({
            //             name: '444',
            //             label: 'dddee',
            //             icon: '',
            //             shortcut: 'Ctrl+C'
            //         })
            //     ]
            // });
            // ins.addGroup(group);
            // ins.addGroup(new ContextMenuGroupModel({
            //     name: 'action2',
            //     menus: [
            //         new ContextMenuItemModel({
            //             name: '22',
            //             label: 'xxs',
            //             icon: '',
            //         }),
            //         new ContextMenuItemModel({
            //             name: 'run:cell',
            //             label: 'Run Cell',
            //             icon: '',
            //             disabled: () => {
            //                 return this.activeCell && this.activeCell.cell_type === 'raw';
            //             },
            //             callback: () => {
            //                 this.app.commands.execute(CommandIDs.CELL_RUN);
            //             }
            //         }),
            //         new ContextMenuItemModel({
            //             name: '444',
            //             label: 'dddee',
            //             icon: '',
            //             shortcut: 'Ctrl+C'
            //         })
            //     ]
            // }));

            // contextMenu.open(e.clientX,e.clientY, ins, menu => {
            //     // 这里也可以定义点击menu的回调，可以对命令做一些处理,

            // });
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
        },
        activeCell(val) {
            if (this.completerHandler) {
                this.completerHandler.editor = this.cellMap[val.order].editor;
            }
        },
        notebook: {
            deep: true,
            handler() {
                if (!this.initiated) {
                    this.initiated = true;
                    return;
                }
                this.$emit('modify', this.file);
            }
        }
    },
    async created() {
        // 恢复session连接
        const self = this;
        this.$on('sessionReady', async () => {
            await self.connectToSession(self.app.sessionList);
        });
        if (this.app.sessionList && this.app.sessionList.length > 0) {
            await this.connectToSession(this.app.sessionList);
        }
    }
};
</script>

<style lang="scss" scoped>
.sky-notebook {
    height: 100%;
    overflow: hidden;
    background: #222F4F;
    .sky-notebook__main {
        height: calc(100% - 48px);
        padding: 16px;
        overflow: auto;
    }
}
</style>
