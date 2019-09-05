import { CommandIDs, CommandConfigs } from '../../config/commands';
import { CodeCell } from '@jupyterlab/cells';

export default function setupCommands(commands, nb) {
    commands.addCommand(CommandIDs.RUN_CELL, {
        ...CommandConfigs[CommandIDs.RUN_CELL],
        execute: () => {
            if (nb.activeCell && nb.activeCell.cell_type === 'code') {
                CodeCell.execute(nb.activeCellWidget, {kernel: {}});
            } else if (nb.activeCell && nb.activeCell.cell_type === 'markdown') {
                nb.activeCellWidget.rendered = true;
            }
        }
    });

    setupKeyBindings(commands, CommandIDs.RUN_CELL);
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
