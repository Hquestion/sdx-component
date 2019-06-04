export const copyTaskStatusMap = {
    PROCESSING: {
        label: '拷贝中',
        status: 'loading',
        type: 'create'
    },
    PENDING: {
        label: '等待中',
        status: 'loading',
        type: 'primary'
    },
    SUCCESS: {
        label: '已完成',
        status: '',
        type: 'finish'
    },
    ERROR: {
        label: '拷贝失败',
        status: 'warning',
        type: 'error'
    }
};
