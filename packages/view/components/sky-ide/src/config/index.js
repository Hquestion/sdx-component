export const SIDEBAR_FILE = 'SIDEBAR_FILE';
export const SIDEBAR_DATA = 'SIDEBAR_DATA';
export const SIDEBAR_COMMANDS = 'SIDEBAR_COMMANDS';
export const SIDEBAR_TERMINAL = 'SIDEBAR_TERMINAL';

export const SIDEBAR_TABS = [
    {
        name: SIDEBAR_FILE,
        icon: 'sdx-wenjianguanlimoren',
        label: ''
    },
    // {
    //     name: SIDEBAR_DATA,
    //     icon: 'sdx-shujujiguanlimoren',
    //     label: ''
    // }
];

export const SIDEBAR_WINDOWS = [
    {
        name: SIDEBAR_TERMINAL,
        icon: 'sdx-terminals-moren',
        label: ''
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

export const NotebookKernelState = {
    STOPPED: 'STOPPED',
    STARTING: 'STARTING',
    RUNNING: 'RUNNING',
    STOPPING: 'STOPPING'
};
