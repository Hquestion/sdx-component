
import { t } from '../locale';

// 任务类型
export const TASK_TYPE = {
    JUPYTER: 'JUPYTER',
    SKYIDE: 'SKYIDE',
    CONTAINER_DEV: 'CONTAINER_DEV',
    SKYFLOW: 'SKYFLOW',
    // MODELSERVICE: 'MODELSERVICE'
};
// 任务类型 label
export const TASK_TYPE_LABEL = {
    JUPYTER: 'Jupyter',
    SKYIDE: 'SkyIDE',
    CONTAINER_DEV: t('view.task.type.CONTAINERDEV'),
    SKYFLOW: 'SkyFlow',
    MODELSERVICE: t('view.task.type.MODELSERVICE')
};
// 任务类型下拉框列表
export const TASK_TYPE_LIST = (() => {
    const list = Object.keys(TASK_TYPE).map(item => {
        return {
            label: TASK_TYPE_LABEL[item],
            value: TASK_TYPE[item]
        };
    });
    list.unshift({
        value: '',
        label: t('sdxCommon.All')
    });
    return list;
})();

// 执行类型
export const EXECUTE_TYPE = {
    MANUAL: 'MANUAL',
    CRONTAB: 'CRONTAB',
    // REPEAT: 'REPEAT',
    // TRIGGER: 'TRIGGER'
};
// 执行类型 label
export const EXECUTE_TYPE_LABEL = {
    MANUAL: t('view.task.ManualExecution'),
    CRONTAB: t('view.task.TimingExecution'),
    // REPEAT: t('view.task.MultipleExecution'),
    // TRIGGER: t('view.task.EventTriggering')
};
// 执行列表下拉框列表
export const EXECUTE_TYPE_LIST = (() => {
    const list = Object.keys(EXECUTE_TYPE).map(item => {
        return {
            label: EXECUTE_TYPE_LABEL[item],
            value: EXECUTE_TYPE[item]
        };
    });
    list.unshift({
        value: '',
        label: t('sdxCommon.All')
    });
    return list;
})();

// 状态类型
export const STATE_TYPE = {
    Created: 'Created',
    Scheduling: 'Scheduling',
    Pending: 'Pending',
    Running: 'Running',
    Succeeded: 'Succeeded',
    Terminating: 'Terminating',
    Terminated: 'Terminated',
    Failed: 'Failed',
    Error: 'Error'
};
// 状态类型 label
export const STATE_TYPE_LABEL = {
    Created: t('view.task.state.Created'),
    Scheduling: t('view.task.state.Scheduling'),
    Pending: t('view.task.state.Pending'),
    Running: t('view.task.state.Running'),
    Succeeded: t('view.task.state.Succeeded'),
    Terminating: t('view.task.state.Terminating'),
    Terminated: t('view.task.state.Terminated'),
    Failed: t('view.task.state.Failed'),
    Error: t('view.task.state.Error')
};
// 状态类型下拉框列表
export const STATE_TYPE_LIST = (() => {
    const list = Object.keys(STATE_TYPE).map(item => {
        return {
            label: STATE_TYPE_LABEL[item],
            value: STATE_TYPE[item]
        };
    });
    list.unshift({
        value: '',
        label: t('sdxCommon.All')
    });
    return list;
})();
// 状态映射按钮类型
export const STATE_MAP_FOLD_LABEL_TYPE = {
    Created: 'create',
    Scheduling: 'scheduling',
    Pending: 'processing',
    Running: 'running',
    Succeeded: 'finish',
    Terminating: 'dying',
    Terminated: 'die',
    Failed: 'error',
    Error: 'exception'
};

// 需要轮训的状态列表
export const TASK_POLLING_STATE_TYPE = [STATE_TYPE.Scheduling, STATE_TYPE.Pending, STATE_TYPE.Running, STATE_TYPE.Terminating, STATE_TYPE.Error];

// 操作信息
export const OPERATION_INFO = {
    start: {
        label: t('view.task.operation.start'),
        value: 'start',
        icon: 'sdx-icon sdx-icon-yunxing'
    },
    kill: {
        label: t('view.task.operation.kill'),
        value: 'kill',
        icon: 'sdx-icon sdx-tingzhi'
    },
    detail: {
        label: t('view.task.operation.detail'),
        value: 'detail',
        icon: 'sdx-icon sdx-icon-yanjing'
    },
    edit: {
        label: t('view.task.operation.edit'),
        value: 'edit',
        icon: 'sdx-icon sdx-icon-edit'
    },
    remove: {
        label: t('view.task.operation.remove'),
        value: 'remove',
        icon: 'sdx-icon sdx-icon-delete'
    },
    entry: {
        label: t('view.task.operation.entry'),
        value: 'entry',
        icon: 'sdx-icon sdx-huabu'
    },
    test: {
        label: '',
        value: 'test',
    },
    copy: {
        label: '',
        value: 'copy'
    }
};

// pod状态类型
export const POD_STATE_TYPE = { // 对应的值是国际化的词条值
    failed: t('view.monitor.componentState.state.failed'),
    pending: t('view.monitor.componentState.state.pending'),
    running: t('view.monitor.componentState.state.running'),
    succeeded: t('view.monitor.componentState.state.succeeded'),
    unknown: t('view.monitor.componentState.state.unknown')
};

// 任务执行列表中状态对应的操作数组
export const STATE_TYPE_OPERATION = {
    Created: ['start', 'detail', 'remove'],
    Scheduling: ['kill', 'detail'],
    Pending: ['kill', 'detail'],
    Running: ['kill', 'detail'],
    Succeeded: ['start', 'detail', 'remove'],
    Terminating: ['kill', 'detail'],
    Terminated: ['start', 'detail', 'remove'],
    Failed: ['start', 'detail', 'remove'],
    Error: ['kill', 'detail'],
};

// 管理任务执行列表中状态对应的操作数组
export const STATE_TYPE_OPERATION_ADMIN = {
    Created: ['start', 'detail'],
    Scheduling: ['kill', 'detail'],
    Pending: ['kill', 'detail'],
    Running: ['kill', 'detail'],
    Succeeded: ['start', 'detail'],
    Terminating: ['kill', 'detail'],
    Terminated: ['start', 'detail'],
    Failed: ['start', 'detail'],
    Error: ['kill', 'detail'],
};

// 任务-状态对应的全部操作
export const STATE_TYPE_OPERATION_ALL = {
    [TASK_TYPE.JUPYTER]: {
        [STATE_TYPE.Created]: ['start', 'edit', 'remove', 'detail'],
        [STATE_TYPE.Scheduling]: ['kill', 'detail'],
        [STATE_TYPE.Pending]: ['kill', 'detail'],
        [STATE_TYPE.Running]: ['kill', 'detail'],
        [STATE_TYPE.Succeeded]: ['start', 'edit', 'remove', 'detail'],
        [STATE_TYPE.Terminating]: ['detail'],
        [STATE_TYPE.Terminated]: ['start', 'edit', 'remove', 'detail'],
        [STATE_TYPE.Failed]: ['start', 'edit', 'remove', 'detail'],
        [STATE_TYPE.Error]: ['kill', 'detail']
    },
    [TASK_TYPE.SKYIDE]: {
        [STATE_TYPE.Created]: [],
        [STATE_TYPE.Scheduling]: [],
        [STATE_TYPE.Pending]: [],
        [STATE_TYPE.Running]: [],
        [STATE_TYPE.Succeeded]: [],
        [STATE_TYPE.Terminating]: [],
        [STATE_TYPE.Terminated]: [],
        [STATE_TYPE.Failed]: [],
        [STATE_TYPE.Error]: []
    },
    [TASK_TYPE.CONTAINER_DEV]: {
        [STATE_TYPE.Created]: ['start', 'edit', 'remove', 'detail'],
        [STATE_TYPE.Scheduling]: ['kill', 'detail'],
        [STATE_TYPE.Pending]: ['kill', 'detail'],
        [STATE_TYPE.Running]: ['kill', 'detail'],
        [STATE_TYPE.Succeeded]: ['start', 'edit', 'remove', 'detail'],
        [STATE_TYPE.Terminating]: ['detail'],
        [STATE_TYPE.Terminated]: ['start', 'edit', 'remove', 'detail'],
        [STATE_TYPE.Failed]: ['start', 'edit', 'remove', 'detail'],
        [STATE_TYPE.Error]: ['kill', 'detail']
    },
    [TASK_TYPE.SKYFLOW]: {
        [STATE_TYPE.Created]: [],
        [STATE_TYPE.Scheduling]: ['kill', 'entry', 'copy'],
        [STATE_TYPE.Pending]: ['kill', 'entry', 'copy'],
        [STATE_TYPE.Running]: ['kill', 'entry', 'copy'],
        [STATE_TYPE.Succeeded]: ['start', 'entry', 'copy', 'delete'],
        [STATE_TYPE.Terminating]: ['kill', 'entry', 'copy'],
        [STATE_TYPE.Terminated]: ['start', 'entry', 'copy', 'delete'],
        [STATE_TYPE.Failed]: ['start', 'entry', 'copy', 'delete'],
        [STATE_TYPE.Error]: ['kill', 'entry', 'copy'],
    },
    [TASK_TYPE.MODELSERVICE]: {
        [STATE_TYPE.Created]: ['delete', 'detail'],
        [STATE_TYPE.Scheduling]: [],
        [STATE_TYPE.Pending]: ['detail'],
        [STATE_TYPE.Running]: ['test', 'detail'],
        [STATE_TYPE.Succeeded]: ['kill', 'detail'],
        [STATE_TYPE.Terminating]: ['detail'],
        [STATE_TYPE.Terminated]: ['delete', 'detail'],
        [STATE_TYPE.Failed]: ['delete', 'detail'],
        [STATE_TYPE.Error]: ['kill', 'detail']
    },
};

// 定时任务启动状态
// todo:
export const TIMING_TASK_STARTUP_STATE = [
    {
        label: '是',
        value: true
    }, 
    {
        label: '否',
        value: false
    }
];
