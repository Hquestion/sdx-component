export const TASK_TYPE = {
    SPARK: 'SPARK',
    PYTHON: 'PYTHON',
    TENSORFLOW: 'TENSORFLOW',
    TENSORFLOW_DIST: 'TENSORFLOW_DIST',
    TENSORBOARD: 'TENSORBOARD',
    JUPYTER: 'JUPYTER',
    TENSORFLOW_AUTO_DIST: 'TENSORFLOW_AUTO_DIST',
    TENSORFLOW_SERVING: 'TENSORFLOW_SERVING'
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
