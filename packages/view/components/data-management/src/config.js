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
