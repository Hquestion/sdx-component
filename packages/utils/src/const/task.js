export const TASK_TYPE = {
    SPARK: 'SPARK',
    PYTHON: 'PYTHON',
    JUPYTER: 'JUPYTER',
    TENSORBOARD: 'TENSORBOARD',
    TENSORFLOW: 'TENSORFLOW',
    TENSORFLOW_DIST: 'TENSORFLOW_DIST',
    TENSORFLOW_AUTO_DIST: 'TENSORFLOW_AUTO_DIST',
    CONTAINERDEV: 'CONTAINERDEV',
    // TENSORFLOW_SERVING: 'TENSORFLOW_SERVING'
};

export const TASK_TYPE_LABEL = {
    SPARK: 'SPARK',
    PYTHON: 'PYTHON',
    JUPYTER: 'JUPYTER',
    TENSORBOARD: 'TENSORBOARD',
    TENSORFLOW: 'TENSORFLOW',
    TENSORFLOW_DIST: 'TENSORFLOW分布式',
    TENSORFLOW_AUTO_DIST: 'TENSORFLOW自动并行',
    CONTAINERDEV: '自定义容器',
    // TENSORFLOW_SERVING: 'TENSORFLOW_SERVING'
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

export const STATE_TYPE_LABEL = {
    CREATED: '创建',
    LAUNCHING: '启动中',
    LAUNCH_ABNORMAL: '启动异常',
    RUNNING: '运行中',
    FINISHED: '已完成',
    KILLED: '已终止',
    FAILED: '失败',
    KILLING: '终止中'
};

export const STATE_TYPE_OPERATION = {
    CREATED: ['start', 'detail', 'edit', 'remove'],
    LAUNCHING: ['kill', 'detail'],
    LAUNCH_ABNORMAL: ['start', 'detail', 'edit', 'remove'],
    RUNNING: ['kill', 'detail'],
    FINISHED: ['start', 'detail', 'edit', 'remove'],
    KILLED: ['start', 'detail', 'edit', 'remove'],
    FAILED: ['start', 'detail', 'edit', 'remove'],
    KILLING: ['detail']
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

export const POD_STATE_TYPE = {
    failed: 'failed',
    pending: 'pending',
    running: 'running',
    succeeded: 'succeeded',
    unknown: 'unknown'
};

export const OPERATION_INFO = {
    start: {
        label: '运行',
        value: 'start',
        icon: 'sdx-icon sdx-icon-yunxing'
    },
    kill: {
        label: '停止',
        value: 'kill',
        icon: 'sdx-icon sdx-tingzhi'
    },
    detail: {
        label: '查看',
        value: 'detail',
        icon: 'sdx-icon sdx-icon-yanjing'
    },
    edit: {
        label: '编辑',
        value: 'edit',
        icon: 'sdx-icon sdx-icon-edit'
    },
    remove: {
        label: '删除',
        value: 'remove',
        icon: 'sdx-icon sdx-icon-delete'
    }
};

export const MONITOR_ALLOW_OPERATION = ['start', 'detail', 'kill'];
export const NON_OWNER_TASK_OPERATION = ['detail'];
