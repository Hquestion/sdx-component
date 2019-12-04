import { CommandRegistry } from '@phosphor/commands';

let commands;

export const CommandIDs = {
    CELL_RUN: 'cell:run',
    CELLS_DEBUG: 'cells:debug',
    CELLS_SHUTDOWN: 'cells:shutdown',
    CELLS_RUN: 'cells:run',
    CELL_TOGGLE_CODE: 'cell:toggle:code',
    CELL_ADD_CODE: 'cell:add:code',
    CELL_ADD_MARKDOWN: 'cell:add:markdown',
    CELL_COPY: 'cell:copy',
    CELLS_OUTPUTS_CLEAR: 'cells:outputs:clear',
    CELL_CUT: 'cell:cut',
    CELL_PASTE: 'cell:paste',
    CELL_MOVEUP: 'cell:moveup',
    CELL_MOVEDOWN: 'cell:movedown',
    CELL_DELETE: 'cell:delete',
    CELL_OUTPUTS_CLEAR: 'cell:outputs:clear',
    COMPLETE: 'completer:invoke',
    COMPLETER_SELECT: 'completer:select',
    UNDO: 'notebook:undo',
    REDO: 'notebook:redo',
    SAVE_DOC: 'save:doc',
    RENAME: 'file:rename',
    DELETE: 'file:delete',
    DOWNLOAD: 'file:download',
    COPY: 'file:copy',
    PASTE: 'file:paste',
    CUT: 'file:cut'
};

const notebookCommands = [
    CommandIDs.CELLS_RUN,
    CommandIDs.CELLS_DEBUG,
    CommandIDs.CELLS_SHUTDOWN,
    CommandIDs.CELLS_OUTPUTS_CLEAR,
    CommandIDs.COMPLETE,
    CommandIDs.COMPLETER_SELECT,
    CommandIDs.UNDO,
    CommandIDs.REDO
];

const cellCommands = [
    CommandIDs.CELL_CUT,
    CommandIDs.CELL_PASTE,
    CommandIDs.CELL_MOVEDOWN,
    CommandIDs.CELL_MOVEUP,
    CommandIDs.CELL_DELETE,
    CommandIDs.CELL_OUTPUTS_CLEAR,
    CommandIDs.CELL_RUN,
    CommandIDs.CELL_TOGGLE_CODE,
    CommandIDs.CELL_ADD_CODE,
    CommandIDs.CELL_ADD_MARKDOWN,
    CommandIDs.CELL_COPY
];

const CommandCategories = {
    'Notebook': notebookCommands,
    'Notebook Cell': cellCommands
};

export function initCommands() {
    return commands = new CommandRegistry();
}

export const CommandConfigs = {
    [CommandIDs.CELLS_RUN]: {
        label: 'Run All Cells',
        iconClass: '',
        key: [],
        selector: '.sky-doc-manager .sky-editor-adaptor'
    },
    [CommandIDs.CELLS_DEBUG]: {
        label: 'Debug Cell',
        iconClass: '',
        key: [],
        selector: '.sky-doc-manager .sky-editor-adaptor'
    },
    [CommandIDs.CELLS_SHUTDOWN]: {
        label: 'Shutdown Session',
        iconClass: '',
        key: [],
        selector: '.sky-doc-manager .sky-editor-adaptor'
    },
    [CommandIDs.CELLS_OUTPUTS_CLEAR]: {
        label: 'Clear All Outputs',
        iconClass: '',
        key: [],
        selector: '.sky-doc-manager .sky-editor-adaptor'
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
    [CommandIDs.CELL_CUT]: {
        label: 'Cut Cell',
        iconClass: '',
        key: ['Ctrl X'],
        selector: '.sky-doc-manager .sky-editor-adaptor'
    },
    [CommandIDs.CELL_PASTE]: {
        label: 'Paste Cell',
        iconClass: '',
        key: ['Ctrl V'],
        selector: '.sky-doc-manager .sky-editor-adaptor'
    },
    [CommandIDs.CELL_MOVEDOWN]: {
        label: 'Move Down',
        iconClass: '',
        key: [],
        selector: '.jp-InputArea-editor'
    },
    [CommandIDs.CELL_MOVEUP]: {
        label: 'Move Up',
        iconClass: '',
        key: [],
        selector: '.jp-InputArea-editor'
    },
    [CommandIDs.CELL_DELETE]: {
        label: 'Delete Cell',
        iconClass: '',
        key: ['Ctrl D'],
        selector: '.sky-doc-manager .sky-editor-adaptor'
    },
    [CommandIDs.CELL_OUTPUTS_CLEAR]: {
        label: 'Clear Outputs',
        iconClass: '',
        key: [],
        selector: '.jp-InputArea-editor'
    },
    [CommandIDs.CELL_RUN]: {
        label: 'Run Cell',
        iconClass: '',
        key: ['Shift Enter'],
        selector: '.jp-InputArea-editor'
    },
    [CommandIDs.CELL_TOGGLE_CODE]: {
        label: 'Toggle Code',
        iconClass: '',
        key: [],
        selector: '.sky-doc-manager .sky-editor-adaptor'
    },
    [CommandIDs.CELL_ADD_CODE]: {
        label: 'Add Code',
        iconClass: '',
        key: [],
        selector: '.sky-doc-manager .sky-editor-adaptor'
    },
    [CommandIDs.CELL_ADD_MARKDOWN]: {
        label: 'Add Markdown',
        iconClass: '',
        key: [],
        selector: '.sky-doc-manager .sky-editor-adaptor'
    },
    [CommandIDs.CELL_COPY]: {
        label: 'Copy Cell',
        iconClass: '',
        key: ['Ctrl C'],
        selector: '.sky-doc-manager .sky-editor-adaptor'
    },
    [CommandIDs.UNDO]: {
        label: 'Undo',
        iconClass: '',
        key: ['Ctrl Z'],
        selector: '.sky-doc-manager .sky-editor-adaptor'
    },
    [CommandIDs.REDO]: {
        label: 'Redo',
        iconClass: '',
        key: ['Ctrl Shift Z'],
        selector: '.sky-doc-manager .sky-editor-adaptor'
    },
    [CommandIDs.SAVE_DOC]: {
        label: 'Save',
        iconClass: '',
        key: ['Ctrl S'],
        selector: '.sky-doc-manager .sky-editor-adaptor'
    },
    [CommandIDs.RENAME]: {
        label: 'Rename',
        iconClass: '',
        key: ['F2'],
        selector: '.skyide-file-main'
    },
    [CommandIDs.DELETE]: {
        label: 'Delete',
        iconClass: '',
        key: ['Delete'],
        selector: '.skyide-file-main'
    },
    [CommandIDs.DOWNLOAD]: {
        label: 'Download',
        iconClass: '',
        key: ['Ctrl D'],
        selector: '.skyide-file-main'
    },
    [CommandIDs.COPY]: {
        label: 'Copy',
        iconClass: '',
        key: ['Ctrl C'],
        selector: '.skyide-file-main'
    },
    [CommandIDs.PASTE]: {
        label: 'Paste',
        iconClass: '',
        key: ['Ctrl V'],
        selector: '.skyide-file-main'
    },
    [CommandIDs.CUT]: {
        label: 'Cut',
        iconClass: '',
        key: ['Ctrl X'],
        selector: '.skyide-file-main'
    }
};

export function getCommandsTree(categorys = []) {
    let registeredCommands = commands.listCommands();
    if (categorys.length > 0) {
        let results = [];
        categorys.forEach(category => {
            let list = (CommandCategories[category] || []).filter(item => registeredCommands.includes(item));
            if (list.length > 0) {
                results.push({
                    category: category,
                    commands: list.map(item => ({
                        label: CommandConfigs[item].label,
                        key: CommandConfigs[item].key,
                        commandId: item
                    }))
                });
            }
        });
        return results;
    } else {
        let result = [];
        Object.entries(CommandCategories).forEach(([k, v]) => {
            result.push({
                category: k,
                commands: v.filter(item => registeredCommands.includes(item)).map(item => ({
                    label: CommandConfigs[item].label,
                    key: CommandConfigs[item].key,
                    commandId: item
                }))
            });
        });
        return result;
    }
}
