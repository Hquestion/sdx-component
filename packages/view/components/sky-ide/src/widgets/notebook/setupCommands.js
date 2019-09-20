import { CommandIDs, CommandConfigs } from '../../config/commands';
import { CodeCell } from '@jupyterlab/cells';
import { Session } from '@jupyterlab/services';
import { NotebookMode } from '../../config';
import { addCommand } from '../../utils/commandsHelper';

export default function setupCommands(commands, app) {

    addCommand(commands, app, CommandIDs.RUN_CELL, async function(app) {
        let nb = app.docManager.getActiveNotebook();
        if (!nb) return;
        if (nb.activeCell && nb.activeCell.cell_type === 'code') {
            let session = await Session.startNew({
                path: '',
                kernelName: 'python3'
            });

            await CodeCell.execute(nb.activeCellWidget, session);
            // 执行完之后再关闭kernel
            await session.shutdown();
        } else if (nb.activeCell && nb.activeCell.cell_type === 'markdown') {
            nb.activeCellWidget.rendered = true;
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

    setupKeyBindings(commands, CommandIDs.COMPLETE);
    setupKeyBindings(commands, CommandIDs.COMPLETER_SELECT);
}

export function setupKeyBindings(commands, commandId) {
    let commandCfg = CommandConfigs[commandId];
    if (commandCfg.key && commandCfg.key.length > 0) {
        commands.addKeyBinding({
            selector: commandCfg.selector,
            keys: commandCfg.key,
            command: commandId
        });
    }
}
