
import { t } from '../locale';

export const TASK_TYPE = {
    SPARK: 'SPARK',
    PYTHON: 'PYTHON',
    JUPYTER: 'JUPYTER',
    TENSORBOARD: 'TENSORBOARD',
    TENSORFLOW: 'TENSORFLOW',
    TENSORFLOW_DIST: 'TENSORFLOW_DIST',
    TENSORFLOW_AUTO_DIST: 'TENSORFLOW_AUTO_DIST',
    CONTAINERDEV: 'CONTAINERDEV',
    DATA_SERVICE: 'DATA_SERVICE',
    TENSORFLOW_SERVING: 'TENSORFLOW_SERVING',
    SPARK_SERVING: 'SPARK_SERVING',
    PMML_SERVING: 'PMML_SERVING',
    SKYFLOW_EXEC: 'SKYFLOW_EXEC',
    SKYFLOW: 'SKYFLOW',
    SKYIDE: 'SKYIDE'
};

export const TASK_TYPE_LABEL = { // 对应的值是国际化的词条值
    SPARK: 'view.task.type.SPARK',
    PYTHON: 'view.task.type.PYTHON',
    JUPYTER: 'view.task.type.JUPYTER',
    TENSORBOARD: 'view.task.type.TENSORBOARD',
    TENSORFLOW: 'view.task.type.TENSORFLOW',
    TENSORFLOW_DIST: 'view.task.type.TENSORFLOW_DIST',
    TENSORFLOW_AUTO_DIST: 'view.task.type.TENSORFLOW_AUTO_DIST',
    CONTAINERDEV: 'view.task.type.CONTAINERDEV',
    DATA_SERVICE: 'view.task.type.DATA_SERVICE',
    TENSORFLOW_SERVING: 'view.task.type.TENSORFLOW_SERVING',
    SPARK_SERVING: 'view.task.type.SPARK_SERVING',
    PMML_SERVING: 'view.task.type.PMML_SERVING',
    SKYFLOW_EXEC: 'view.task.type.SKYFLOW_EXEC'
};

export const STATE_TYPE = {
    CREATED: 'CREATED',
    LAUNCHING: 'LAUNCHING',
    LAUNCH_ABNORMAL: 'LAUNCH_ABNORMAL',
    RUNNING: 'RUNNING',
    FINISHED: 'FINISHED',
    KILLED: 'KILLED',
    FAILED: 'FAILED',
    KILLING: 'KILLING'
};

export const STATE_TYPE_LABEL = { // 对应的值是国际化的词条值
    CREATED: 'view.task.state.CREATED',
    LAUNCHING: 'view.task.state.LAUNCHING',
    LAUNCH_ABNORMAL: 'view.task.state.LAUNCH_ABNORMAL',
    RUNNING: 'view.task.state.RUNNING',
    FINISHED: 'view.task.state.FINISHED',
    KILLED: 'view.task.state.KILLED',
    FAILED: 'view.task.state.FAILED',
    KILLING: 'view.task.state.KILLING'
};

export const STATE_TYPE_OPERATION = {
    CREATED: ['start', 'detail', 'entry', 'edit', 'remove'],
    LAUNCHING: ['kill', 'detail', 'entry'],
    LAUNCH_ABNORMAL: ['start', 'detail', 'entry', 'edit', 'remove'],
    RUNNING: ['kill', 'detail', 'entry'],
    FINISHED: ['start', 'detail', 'entry', 'edit', 'remove'],
    KILLED: ['start', 'detail', 'entry', 'edit', 'remove'],
    FAILED: ['start', 'detail', 'entry', 'edit', 'remove'],
    KILLING: ['detail', 'entry']
};

export const STATE_MAP_FOLD_LABEL_TYPE = {
    CREATED: 'create',
    LAUNCHING: 'processing',
    LAUNCH_ABNORMAL: 'exception',
    RUNNING: 'running',
    FINISHED: 'finish',
    KILLED: 'die',
    FAILED: 'error',
    KILLING: 'dying'
};

export const POD_STATE_TYPE = { // 对应的值是国际化的词条值
    failed: 'view.monitor.componentState.state.failed',
    pending: 'view.monitor.componentState.state.pending',
    running: 'view.monitor.componentState.state.running',
    succeeded: 'view.monitor.componentState.state.succeeded',
    unknown: 'view.monitor.componentState.state.unknown'
};

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


export const MONITOR_ALLOW_OPERATION = ['start', 'detail', 'kill'];

export const NON_OWNER_TASK_OPERATION = ['detail'];

export const TASK_POLLING_STATE_TYPE = [STATE_TYPE.LAUNCH_ABNORMAL, STATE_TYPE.LAUNCHING, STATE_TYPE.KILLING, STATE_TYPE.RUNNING];

export const SPECIAL_TASK_TYPE = [TASK_TYPE.PMML_SERVING, TASK_TYPE.SPARK_SERVING, TASK_TYPE.TENSORFLOW_SERVING, TASK_TYPE.SKYFLOW_EXEC, TASK_TYPE.DATA_SERVICE];
