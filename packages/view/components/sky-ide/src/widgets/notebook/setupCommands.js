import { CommandIDs, CommandConfigs } from '../../config/commands';
import { CodeCell } from '@jupyterlab/cells';
import { Session } from '@jupyterlab/services';
import { NotebookMode } from '../../config';
import { addCommand } from '../../utils/commandsHelper';

export default function setupCommands(commands, nb) {
    addCommand(commands, nb, CommandIDs.RUN_CELL, async function(nb) {
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

    commands.addCommand(CommandIDs.COMPLETE, {
        ...CommandConfigs[CommandIDs.COMPLETE],
        execute() {
            if (nb.activeCell && nb.activeCell.cell_type === 'code' && nb.mode === NotebookMode.CELL_DEBUG) {
                if (nb.completer) {
                    nb.completerHandler.invoke();
                }
            }
        },
    });

    commands.addCommand(CommandIDs.COMPLETER_SELECT, {
        ...CommandConfigs[CommandIDs.COMPLETER_SELECT],
        execute() {
            nb.completerHandler.completer.selectActive();
        },
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
