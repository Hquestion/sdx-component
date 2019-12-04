import { CommandIDs } from '../../config/commands';
// import { CodeCell } from '@jupyterlab/cells';
// import { Session } from '@skyide/services';
import { NotebookMode } from '../../config';
import { addCommand } from '../../utils/commandsHelper';
import undoAndRedo from '../../utils/undoAndRedo';

let isInit = true;

export default function setupCommands(commands, app) {
    if (!isInit) return;
    isInit = false;

    // notebook commands
    addCommand(commands, app, CommandIDs.CELL_COPY, async function(app) {
        let nb = app.docManager.getActiveNotebook();
        if (!nb) return;
        let target = nb.selectedCellsRange.target;
        let source = nb.selectedCellsRange.source;
        let cellList = [];
        if (target !== -1 && source !== -1) {
            if (target > source) {
                cellList = nb.notebook.cells.slice(source, target + 1).map(item => ({...item}));
            } else {
                cellList = nb.notebook.cells.slice(target, source + 1).map(item => ({...item}));
            }
            cellList.forEach(cell => {
                cell.order = nb.nextOrder();
            });
            nb.clipBoardCells = cellList;
        } else if (nb.activeCellOrder !== -1) {
            let activeCell = {...nb.activeCell};
            activeCell.order = nb.nextOrder();
            nb.clipBoardCells = [activeCell];
        }
    });

    addCommand(commands, app, CommandIDs.CELLS_RUN, async function(app) {
        let nb = app.docManager.getActiveNotebook();
        if (!nb) return;
        nb.runNotebook();
    });

    addCommand(commands, app, CommandIDs.CELLS_DEBUG, async function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        if (!nb) return;
        nb.debugByCell();
    });

    addCommand(commands, app, CommandIDs.CELLS_SHUTDOWN, function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        if (!nb) return;
        if (nb.isDebugMode) {
            nb.cancelDebug();
        } else {
            nb.shutdownSession(true);
        }
    });

    addCommand(commands, app, CommandIDs.CELLS_OUTPUTS_CLEAR, function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        if (!nb) return;
        nb.notebook.cells.forEach(cell => {
            cell.outputs = [];
            if (nb.cellMap[cell.order].model.outputs && nb.cellMap[cell.order].model.outputs.clear) {
                nb.cellMap[cell.order].model.outputs.clear && nb.cellMap[cell.order].model.outputs.clear();
            }

        });
    });

    addCommand(commands, app, CommandIDs.COMPLETE, function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        if (!nb) return;
        if (nb.activeCell && nb.activeCell.cell_type === 'code' && nb.mode === NotebookMode.CELL_DEBUG) {
            if (nb.completer) {
                nb.completerHandler.invoke();
            }
        }
    });

    addCommand(commands, app, CommandIDs.COMPLETER_SELECT, function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        if (!nb) return;
        nb.completerHandler.completer.selectActive();
    });

    addCommand(commands, app, CommandIDs.UNDO, function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        if (!nb) return;
        let namespace = nb && nb.file && nb.file.path || '';
        undoAndRedo.undo(namespace);
    });

    addCommand(commands, app, CommandIDs.REDO, function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        if (!nb) return;
        let namespace = nb && nb.file && nb.file.path || '';
        undoAndRedo.redo(namespace);
    });

    // cell commands
    addCommand(commands, app, CommandIDs.CELL_CUT, function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        if (!nb) return;
        let namespace = nb && nb.file && nb.file.path || '';
        let index = nb.notebook.cells.findIndex(item => item.order === nb.activeCellOrder);
        let activeCell = {...nb.activeCell};

        function operateFn() {
            nb.clipBoardCells = [activeCell];
            nb.notebook.cells.splice(index, 1);
        }
        function revokeFn() {
            nb.clipBoardCells = [];
            nb.notebook.cells.splice(index, 0, activeCell);
        }

        undoAndRedo.addOperation(namespace, operateFn, revokeFn);
    });

    addCommand(commands, app, CommandIDs.CELL_PASTE, function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        if (!nb) return;
        let namespace = nb && nb.file && nb.file.path || '';
        let index = nb.notebook.cells.findIndex(item => item.order === nb.activeCellOrder);
        let selectedCells = nb.clipBoardCells;
        function operateFn() {
            nb.notebook.cells.splice(index + 1, 0, ...selectedCells);
            nb.clipBoardCells = [];
        }
        function revokeFn() {
            nb.notebook.cells.splice(index + 1, selectedCells.length);
            nb.clipBoardCells = selectedCells;
        }

        if (nb.clipBoardCells.length > 0) {
            undoAndRedo.addOperation(namespace, operateFn, revokeFn);
        }
    });

    addCommand(commands, app, CommandIDs.CELL_MOVEDOWN, function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        if (!nb) return;
        let namespace = nb && nb.file && nb.file.path || '';
        let index = nb.notebook.cells.findIndex(item => item.order === nb.activeCellOrder);
        let activeCell = {...nb.activeCell};
        const editor = app.docManager.$refs.editor.find(item => item.file.path === namespace);

        function operateFn() {
            nb.notebook.cells.splice(index, 1);
            nb.notebook.cells.splice(index + 1, 0, activeCell);
            editor.focus();
        }
        function revokeFn() {
            nb.notebook.cells.splice(index + 1, 1);
            nb.notebook.cells.splice(index, 0, activeCell);
            editor.focus();
        }

        if (index < nb.notebook.cells.length - 1) {
            undoAndRedo.addOperation(namespace, operateFn, revokeFn);
        }
    });

    addCommand(commands, app, CommandIDs.CELL_MOVEUP, function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        if (!nb) return;
        let namespace = nb && nb.file && nb.file.path || '';
        let index = nb.notebook.cells.findIndex(item => item.order === nb.activeCellOrder);
        let activeCell = {...nb.activeCell};
        const editor = app.docManager.$refs.editor.find(item => item.file.path === namespace);

        function operateFn() {
            nb.notebook.cells.splice(index, 1);
            nb.notebook.cells.splice(index - 1, 0, activeCell);
            editor.focus();
        }
        function revokeFn() {
            nb.notebook.cells.splice(index - 1, 1);
            nb.notebook.cells.splice(index, 0, activeCell);
            editor.focus();
        }

        if (index > 0) {
            undoAndRedo.addOperation(namespace, operateFn, revokeFn);
        }
    });

    addCommand(commands, app, CommandIDs.CELL_DELETE, function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        if (!nb) return;
        let namespace = nb && nb.file && nb.file.path || '';
        let index = nb.notebook.cells.findIndex(item => item.order === nb.activeCellOrder);
        let activeCell = {...nb.activeCell};
        const editor = app.docManager.$refs.editor.find(item => item.file.path === namespace);

        function operateFn() {
            nb.notebook.cells.splice(index, 1);
        }
        function revokeFn() {
            nb.notebook.cells.splice(index, 0, activeCell);
            nb.activeCellOrder = activeCell.order;
            editor.focus();
        }

        undoAndRedo.addOperation(namespace, operateFn, revokeFn);
    });

    addCommand(commands, app, CommandIDs.CELL_OUTPUTS_CLEAR, function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        if (!nb) return;
        nb.activeCell.outputs = [];
        nb.activeCellWidget._model._outputs.clear();
    });

    addCommand(commands, app, CommandIDs.CELL_RUN, async function(app) {
        let nb = app.docManager.getActiveNotebook();
        if (!nb) return;
        nb.runCell(nb.activeCell, nb.activeCellWidget, nb.session, !nb.isDebugMode);
    });

    addCommand(commands, app, CommandIDs.CELL_TOGGLE_CODE, function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        if (!nb) return;
        let namespace = nb && nb.file && nb.file.path || '';
        let activeCell = {...nb.activeCell};
        let modeType = nb && nb.activeCell && nb.activeCell.cell_type;
        let newOrder = nb.nextOrder();
        let activeCellWidget = nb.activeCellWidget;
        let activeCellOrder = nb.activeCellOrder;

        function operateFn() {
            let type = modeType === 'code' ? 'markdown' : 'code';
            if (activeCell.cell_type === type) {
                return;
            }
            let cell = Object.assign({}, activeCell, {
                order: newOrder,
                cell_type: type
            });
            let index = nb.notebook.cells.findIndex(item => item.order === activeCellOrder);
            delete nb.cellMap[activeCellOrder];
            nb.notebook.cells.splice(index, 1, cell);

            setTimeout(() => {
                nb.activeCellOrder = cell.order;
                activeCellWidget.activate();
                if (type === 'code') {
                    activeCellWidget.model.trusted = false;
                }
                if (type === 'markdown') {
                    activeCellWidget.model.rendered = false;
                }
            }, 0);
        }
        function revokeFn() {
            let index = nb.notebook.cells.findIndex(item => item.order === newOrder);
            delete nb.cellMap[newOrder];
            nb.notebook.cells.splice(index, 1, activeCell);

            setTimeout(() => {
                let activeCellWidget = nb.cellMap[activeCell.order];
                if (modeType === 'code') {
                    activeCellWidget.model.trusted = false;
                }
                if (modeType === 'markdown') {
                    activeCellWidget.model.rendered = false;
                }
            }, 0);
        }

        undoAndRedo.addOperation(namespace, operateFn, revokeFn);
    });

    addCommand(commands, app, CommandIDs.CELL_ADD_CODE, function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        if (!nb) return;
        let namespace = nb && nb.file && nb.file.path || '';
        let activeCellOrder = nb.activeCellOrder;
        const editor = app.docManager.$refs.editor.find(item => item.file.path === namespace);

        function operateFn() {
            nb.insertCell('code');
        }
        function revokeFn() {
            nb.notebook.cells.splice(-1, 1);
            nb.activeCellOrder = activeCellOrder;
            editor.focus();
        }

        undoAndRedo.addOperation(namespace, operateFn, revokeFn);
    });

    addCommand(commands, app, CommandIDs.CELL_ADD_MARKDOWN, function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        if (!nb) return;
        let namespace = nb && nb.file && nb.file.path || '';
        let activeCellOrder = nb.activeCellOrder;
        const editor = app.docManager.$refs.editor.find(item => item.file.path === namespace);

        function operateFn() {
            nb.insertCell('markdown');
        }
        function revokeFn() {
            nb.notebook.cells.splice(-1, 1);
            nb.activeCellOrder = activeCellOrder;
            editor.focus();
        }

        undoAndRedo.addOperation(namespace, operateFn, revokeFn);
    });
}
