export const DATA_FORMAT = {
    CSV: 'CSV',
    JPEG: 'JPEG',
    Text: 'Text',
    Other: 'Other'
};

export const DATA_FORMAT_LABEL = {
    CSV: 'sdxCommon.CSV',
    JPEG: 'sdxCommon.JPEG',
    Text: 'sdxCommon.Text',
    Other: 'sdxCommon.Other'
};

export const DATA_FORMAT_MAP = {
    CSV: ['csv'],
    JPEG: ['jpg', 'jpeg', 'png'],
    Text: ['txt'],
    Other: []
};

export const DATA_FORMAT_LIST = (() => {
    const list = Object.keys(DATA_FORMAT).map(item => {
        return {
            label: DATA_FORMAT_LABEL[item],
            value: DATA_FORMAT[item]
        };
    });
    list.unshift({
        value: '',
        label: 'sdxCommon.All'
    });
    return list;
})();

export const STATE_TYPE = {
    Creating: 'Creating',
    Created: 'Created',
    Failed: 'Failed',
    Deleting: 'Deleting',
    DeleteFailed: 'DeleteFailed'
};

export const STATE_TYPE_LABEL = {
    Creating: 'view.dataManagement.state.Creating',
    Created: 'view.dataManagement.state.Created',
    Failed: 'view.dataManagement.state.Failed',
    Deleting: 'view.dataManagement.state.Deleting',
    DeleteFailed: 'view.dataManagement.state.DeleteFailed'
};

export const STATE_TYPE_OPERATION = {
    Creating: ['f_delete'],
    Created: ['edit', 'share', 'delete'],
    Failed: ['edit', 'delete'],
    Deleting: ['f_delete'],
    DeleteFailed: ['f_delete']
};

export const STATE_MAP_FOLD_LABEL_TYPE = {
    Creating: 'success',
    Created: 'finish',
    Failed: 'error',
    Deleting: 'pending',
    DeleteFailed: 'exception'
};

export const OPERATION_INFO = {
    edit: {
        label: 'sdxCommon.Edit',
        value: 'edit',
        icon: 'sdx-kapianbianji'
    },
    share: {
        label: 'sdxCommon.Share',
        value: 'share',
        icon: 'sdx-fenxiang'
    },
    delete: {
        label: 'sdxCommon.Delete',
        value: 'delete',
        icon: 'sdx-kapianshanchu'
    },
    f_delete: {
        label: 'sdxCommon.ForceDelete',
        value: 'f_delete',
        // todo:
        icon: 'sdx-kapianshanchu'
    },
    c_share: {
        label: 'sdxCommon.CancelShare',
        value: 'c_share',
        icon: 'sdx-quxiaofenxiang'
    }
};

export const POLLING_STATE_LIST = [STATE_TYPE.Creating, STATE_TYPE.Deleting];

export const MY_SHARE_OPERATION = ['c_share'];
