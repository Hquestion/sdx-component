import { CommandRegistry } from '@phosphor/commands';

let commands;

export const CommandIDs = {
    RUN_CELL: 'run:cell',
    COMPLETE: 'completer:invoke',
    COMPLETER_SELECT: 'completer:select',

    SAVE_DOC: 'save:doc'
};

const notebookCommands = [
    CommandIDs.RUN_CELL,
    CommandIDs.COMPLETE,
    CommandIDs.COMPLETER_SELECT
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
    },
    [CommandIDs.COMPLETE]: {
        label: 'Completer',
        iconClass: '',
        key: ['Tab'],
        selector: '.jp-InputArea-editor.jp-mod-completer-enabled'
    },
    [CommandIDs.COMPLETER_SELECT]: {
        label: 'Completer Select',
        iconClass: '',
        key: ['Enter'],
        selector: '.jp-mod-completer-active'
    },
    [CommandIDs.SAVE_DOC]: {
        label: 'Save',
        iconClass: '',
        key: ['Ctrl S'],
        selector: '.sky-doc-manager .sky-editor-adaptor'
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
