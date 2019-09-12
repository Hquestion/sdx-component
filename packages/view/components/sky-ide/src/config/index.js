export const SIDEBAR_FILE = 'SIDEBAR_FILE';
export const SIDEBAR_DATA = 'SIDEBAR_DATA';
export const SIDEBAR_COMMANDS = 'SIDEBAR_COMMANDS';
export const SIDEBAR_TERMINAL = 'SIDEBAR_TERMINAL';

export const SIDEBAR_TABS = [
    {
        name: SIDEBAR_FILE,
        icon: 'sdx-icon-tensorflow',
        label: ''
    },
    {
        name: SIDEBAR_DATA,
        icon: 'sdx-icon-tensorflow',
        label: ''
    },
    {
        name: SIDEBAR_COMMANDS,
        icon: 'sdx-icon-tensorflow',
        label: ''
    }
];

export const SIDEBAR_WINDOWS = [
    {
        name: SIDEBAR_TERMINAL,
        icon: 'sdx-icon-tensorflow',
        label: 'Terminal'
    }
];

/**
 * EDIT: 编辑模式 READONLY: 只读模式 CELL_DEBUG: cell调试模式 DEBUG: 单行调试模式
 * @type {{EDIT: string, DEBUG: string, CELL_DEBUG: string, READONLY: string}}
 */
export const NotebookMode = {
    DEBUG: 'DEBUG',
    CELL_DEBUG: 'CELL_DEBUG',
    EDIT: 'EDIT',
    READONLY: 'READONLY'
};
