import { CommandIDs } from '../../config/commands';
// import { CodeCell } from '@jupyterlab/cells';
// import { Session } from '@skyide/services';
import { NotebookMode } from '../../config';
import { addCommand } from '../../utils/commandsHelper';

let isInit = true;

export default function setupCommands(commands, app) {
    if (!isInit) return;
    isInit = false;

    // notebook commands
    addCommand(commands, app, CommandIDs.CELLS_RUN, async function(app) {
        let nb = app.docManager.getActiveNotebook();
        if (nb) {
            nb.runNotebook();
        }
    });

    addCommand(commands, app, CommandIDs.CELLS_DEBUG, async function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        if (nb) {
            nb.debugByCell();
        }
    });

    addCommand(commands, app, CommandIDs.CELLS_SHUTDOWN, function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        if (nb) {
            if (nb.isDebugMode) {
                nb.cancelDebug();
            } else {
                nb.shutdownSession(true);
            }
        }
    });

    addCommand(commands, app, CommandIDs.CELLS_OUTPUTS_CLEAR, function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        if (nb) {
            nb.notebook.cells.forEach(cell => {
                cell.outputs = [];
                if (nb.cellMap[cell.order].model.outputs && nb.cellMap[cell.order].model.outputs.clear) {
                    nb.cellMap[cell.order].model.outputs.clear && nb.cellMap[cell.order].model.outputs.clear();
                }

            });
        }
    });

    addCommand(commands, app, CommandIDs.COMPLETE, function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        if (nb.activeCell && nb.activeCell.cell_type === 'code' && nb.mode === NotebookMode.CELL_DEBUG) {
            if (nb.completer) {
                nb.completerHandler.invoke();
            }
        }
    });

    addCommand(commands, app, CommandIDs.COMPLETER_SELECT, function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        nb.completerHandler.completer.selectActive();
    });

    // cell commands
    addCommand(commands, app, CommandIDs.CELL_CUT, function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        let index = nb.notebook.cells.findIndex(item => item.order === nb.activeCellOrder);

        nb.cuttingCell = nb.activeCell;
        nb.notebook.cells.splice(index, 1);
    });

    addCommand(commands, app, CommandIDs.CELL_PASTE, function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        let index = nb.notebook.cells.findIndex(item => item.order === nb.activeCellOrder);

        if (nb.cuttingCell) {
            nb.notebook.cells.splice(index + 1, 0, nb.cuttingCell);
            nb.cuttingCell = undefined;
        }
    });

    addCommand(commands, app, CommandIDs.CELL_MOVEDOWN, function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        let index = nb.notebook.cells.findIndex(item => item.order === nb.activeCellOrder);

        if (index < nb.notebook.cells.length - 1) {
            let cellData = nb.activeCell;
            nb.notebook.cells.splice(index, 1);
            nb.notebook.cells.splice(index + 1, 0, cellData);
        }
    });

    addCommand(commands, app, CommandIDs.CELL_MOVEUP, function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        let index = nb.notebook.cells.findIndex(item => item.order === nb.activeCellOrder);
        if (index > 0) {
            let cellData = nb.activeCell;
            nb.notebook.cells.splice(index, 1);
            nb.notebook.cells.splice(index - 1, 0, cellData);
        }
    });

    addCommand(commands, app, CommandIDs.CELL_DELETE, function execute(app) {
        let nb = app.docManager.getActiveNotebook();
        let index = nb.notebook.cells.findIndex(item => item.order === nb.activeCellOrder);
        nb.notebook.cells.splice(index, 1);
    });

    addCommand(commands, app, CommandIDs.CELL_OUTPUTS_CLEAR, function execute(app) {
        let nb = app.docManager.getActiveNotebook();
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

        let modeType = nb && nb.activeCell && nb.activeCell.cell_type;
        modeType = modeType === 'code' ? 'markdown' : 'code';
        nb.changeCellType(modeType);
    });

    addCommand(commands, app, CommandIDs.CELL_ADD_CODE, function execute(app) {
        let nb = app.docManager.getActiveNotebook();

        nb.insertCell('code');
    });

    addCommand(commands, app, CommandIDs.CELL_ADD_MARKDOWN, function execute(app) {
        let nb = app.docManager.getActiveNotebook();

        nb.insertCell('markdown');
    });

    addCommand(commands, app, CommandIDs.CELL_COPY, function execute(app) {

    });
}
