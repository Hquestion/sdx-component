import { CommandConfigs } from '../config/commands';

export function addCommand(commands, ctx, commandId, exec) {
    commands.addCommand(commandId, {
        ...(CommandConfigs[commandId] || {}),
        execute() {
            return exec.call(ctx, ctx);
        }
    });

    setupKeyBindings(commands, commandId);
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
