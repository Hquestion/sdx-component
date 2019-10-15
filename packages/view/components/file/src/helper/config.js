import { t } from '@sdx/utils/src/locale';

export const copyTaskStatusMap = {
    PROCESSING: {
        label: t('view.file.Copying'),
        status: 'loading',
        type: 'create'
    },
    PENDING: {
        label: t('view.file.Pending'),
        status: 'loading',
        type: 'primary'
    },
    SUCCESS: {
        label: t('view.file.Finish'),
        status: '',
        type: 'finish'
    },
    FAILURE: {
        label: t('view.file.CopyFail'),
        status: 'warning',
        type: 'error'
    }
};

export const unzipTaskStatusMap = {
    PROCESSING: {
        label: t('view.file.Unziping'),
        status: 'loading',
        type: 'create'
    },
    PENDING: {
        label: t('view.file.Pending'),
        status: 'loading',
        type: 'primary'
    },
    SUCCESS: {
        label: t('view.file.Finish'),
        status: '',
        type: 'finish'
    },
    FAILURE: {
        label: t('view.file.UnzipFail'),
        status: 'warning',
        type: 'error'
    }
};


