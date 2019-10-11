import { CommandIDs } from '../../config/commands';
// import { CodeCell } from '@jupyterlab/cells';
// import { Session } from '@skyide/services';
import { NotebookMode } from '../../config';
import { addCommand } from '../../utils/commandsHelper';

let isInit = true;

export default function setupCommands(commands, app) {
    if (!isInit) return;
    isInit = false;

    addCommand(commands, app, CommandIDs.RUN_CELL, async function(app) {
        let nb = app.docManager.getActiveNotebook();
        if (!nb) return;
        // if (nb.activeCell && nb.activeCell.cell_type === 'code') {
        //     await app.taskManager.run();
        //     let session = await Session.startNew({
        //         path: '',
        //         kernelName: 'python3',
        //         serverSettings: {
        //             baseUrl: '',
        //             wsUrl: '',
        //             ideUuid: app.taskManager.ideUuid
        //         }
        //     });
        //
        //     await CodeCell.execute(nb.activeCellWidget, session);
        //     // 执行完之后再关闭kernel
        //     await session.shutdown();
        // } else if (nb.activeCell && nb.activeCell.cell_type === 'markdown') {
        //     nb.activeCellWidget.rendered = true;
        // }
        nb.runCell(nb.activeCell, nb.activeCellWidget, nb.session, true);
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
}
