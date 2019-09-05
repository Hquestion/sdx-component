import { CommandRegistry } from '@phosphor/commands';

let commands;

export const CommandIDs = {
    RUN_CELL: 'run:cell'
};

const notebookCommands = [
    CommandIDs.RUN_CELL
];

const CommandCategories = {
    'Notebook': notebookCommands
};

export function initCommands() {
    return commands = new CommandRegistry();
}

export const CommandConfigs = {
    [CommandIDs.RUN_CELL]: {
        label: 'Run Cell',
        iconClass: '',
        key: ['Shift Enter'],
        selector: '.jp-InputArea-editor'
    }
};

export function getCommandsTree(category) {
    let registeredCommands = commands.listCommands();
    if (category) {
        let list = (CommandCategories[category] || []).filter(item => registeredCommands.includes(item));
        return [{
            category: category,
            commands: list.map(item => ({
                label: CommandConfigs[item].label,
                key: CommandConfigs[item].key
            }))
        }];
    } else {
        let result = [];
        Object.entries(CommandCategories).forEach(([k, v]) => {
            result.push({
                category: k,
                commands: v.filter(item => registeredCommands.includes(item)).map(item => ({
                    label: CommandConfigs[item].label,
                    key: CommandConfigs[item].key
                }))
            });
        });
        return result;
    }
}
