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
