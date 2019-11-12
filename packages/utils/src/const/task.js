
import { t } from '../locale';

function generateObj(arr, property = 'value') {
    let obj = {};
    arr.forEach(item => {
        if (item.value) {
            obj[item.value] = item[property];
        }
    });
    return obj;
}

// 任务类型列表
export const TASK_TYPE = [
    {
        value: '',
        label: t('sdxCommon.All')
    },
    {
        value: 'JUPYTER',
        label: 'Jupyter'
    },
    {
        value: 'SKYIDE',
        label: 'SkyIDE'
    },
    {
        value: 'CONTAINER_DEV',
        label: t('view.task.type.CONTAINERDEV')
    },
    {
        value: 'SKYFLOW',
        label: 'SkyFlow'
    },
    {
        value: 'MODELSERVICE',
        label: t('view.task.type.MODELSERVICE')
    }
];
// 任务状态 label
export const TASK_TYPE_LABEL = generateObj(TASK_TYPE, 'label');
// 任务状态 value
export const TASK_TYPE_VALUE = generateObj(TASK_TYPE);

// 执行类型列表
export const EXECUTE_TYPE = [
    {
        value: '',
        label: t('sdxCommon.All')
    },
    {
        value: 'MANUAL',
        label: t('view.task.ManualExecution')
    },
    {
        value: 'CRONTAB',
        label: t('view.task.TimingExecution')
    },
    {
        value: 'REPEAT',
        label: t('view.task.MultipleExecution')
    },
    {
        value: 'TRIGGER',
        label: t('view.task.EventTriggering')
    }
];
// 执行类型label obj
export const EXECUTE_TYPE_LABEL = generateObj(EXECUTE_TYPE, 'label');
// 执行类型value obj
export const EXECUTE_TYPE_VALUE = generateObj(EXECUTE_TYPE);

// todo:
// 状态列表
export const STATE_TYPE = [
    {
        value: '',
        label: t('sdxCommon.All')
    },
    {
        value: 'Created',
        label: t('view.task.state.Created'),
        operation: []
    },
    {
        value: 'Scheduling',
        label: t('view.task.state.Scheduling'),
        operation: ['kill', 'detail', 'entry']
    },
    {
        value: 'Pending',
        label: t('view.task.state.Pending'),
        operation: ['kill', 'detail', 'entry']
    },
    {
        value: 'Running',
        label: t('view.task.state.Running'),
        operation: ['kill', 'detail', 'entry']
    },
    {
        value: 'Terminating',
        label: t('view.task.state.Terminating'),
        operation: ['detail', 'entry']
    },
    {
        value: 'Terminated',
        label: t('view.task.state.Terminated'),
        operation: ['start', 'detail', 'entry', 'edit', 'remove']
    },
    {
        value: 'Succeeded',
        label: t('view.task.state.Succeeded'),
        operation: ['start', 'detail', 'entry', 'edit', 'remove']
    },
    {
        value: 'Failed',
        label: t('view.task.state.Failed'),
        operation: ['start', 'detail', 'entry', 'edit', 'remove']
    },
    {
        value: 'Error',
        label: t('view.task.state.Error'),
        operation: ['start', 'detail', 'entry', 'edit', 'remove']
    }
];
// 状态label
export const STATE_TYPE_LABEL = generateObj(STATE_TYPE, 'label');
// 状态value
export const STATE_TYPE_VALUE = generateObj(STATE_TYPE);
// 状态对应的操作
export const STATE_TYPE_OPERATION = generateObj(STATE_TYPE, 'operation');
// 需要轮训的状态列表
export const TASK_POLLING_STATE_TYPE = [STATE_TYPE_VALUE.Scheduling, STATE_TYPE_VALUE.Pending, STATE_TYPE_VALUE.Running, STATE_TYPE_VALUE.Terminating, STATE_TYPE_VALUE.Error];
// 状态映射按钮类型
export const STATE_MAP_FOLD_LABEL_TYPE = {
    Created: 'create',
    Pending: 'processing',
    Error: 'exception',
    Running: 'running',
    Succeeded: 'finish',
    Terminated: 'die',
    Failed: 'error',
    Terminating: 'dying'
};

// todo:
// 操作信息
export const OPERATION_INFO = {
    start: {
        label: 'view.task.operation.start',
        value: 'start',
        icon: 'sdx-icon sdx-icon-yunxing'
    },
    kill: {
        label: 'view.task.operation.kill',
        value: 'kill',
        icon: 'sdx-icon sdx-tingzhi'
    },
    detail: {
        label: 'view.task.operation.detail',
        value: 'detail',
        icon: 'sdx-icon sdx-icon-yanjing'
    },
    edit: {
        label: 'view.task.operation.edit',
        value: 'edit',
        icon: 'sdx-icon sdx-icon-edit'
    },
    remove: {
        label: 'view.task.operation.remove',
        value: 'remove',
        icon: 'sdx-icon sdx-icon-delete'
    },
    entry: {
        label: 'view.task.operation.entry',
        value: 'entry',
        icon: 'sdx-icon sdx-huabu'
    }
};

// 定时任务启动状态
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



export const POD_STATE_TYPE = { // 对应的值是国际化的词条值
    failed: 'view.monitor.componentState.state.failed',
    pending: 'view.monitor.componentState.state.pending',
    running: 'view.monitor.componentState.state.running',
    succeeded: 'view.monitor.componentState.state.succeeded',
    unknown: 'view.monitor.componentState.state.unknown'
};


export const MONITOR_ALLOW_OPERATION = ['start', 'detail', 'kill'];

export const NON_OWNER_TASK_OPERATION = ['detail'];



export const SPECIAL_TASK_TYPE = [TASK_TYPE.PMML_SERVING, TASK_TYPE.SPARK_SERVING, TASK_TYPE.TENSORFLOW_SERVING, TASK_TYPE.SKYFLOW_EXEC, TASK_TYPE.DATA_SERVICE];
