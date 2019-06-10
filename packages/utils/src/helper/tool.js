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

export function removeBlankAttr(object) {
    const propNames = Object.getOwnPropertyNames(object);
    for (let i = 0; i < propNames.length; i++) {
        let propName = propNames[i];
        if (object[propName] === null || object[propName] === undefined || object[propName] === '') {
            delete object[propName];
        }
    }
}

