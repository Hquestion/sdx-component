export function deepCopy(data) {
    return JSON.parse(JSON.stringify(data));
}

export function isNaN(num) {
    return num !== num;
}

export function isString(str) {
    return typeof str === 'string';
}

export function isUndefined(v) {
    return typeof v === 'undefined';
}

export function isObject(value) {
    const type = typeof value;
    return value != null && (type === 'object' || type === 'function');
}

export function paginate(pageIndex, pageSize) {
    return ({
        start: (pageIndex - 1) * pageSize + 1,
        count: pageSize
    });
}
