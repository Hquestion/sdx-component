import isEqual from './isEqual';

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

export function isEmptyObject(value) {
    return isObject(value) && Object.keys(value).length === 0;
}

export function isFunction(value) {
    return typeof value === 'function';
}

export function isArray(value) {
    return Array.isArray(value);
}

export function isStringArray(value) {
    return isArray(value) && value.length > 0 && isString(value[0]);
}

export function isObjectArray(value) {
    return isArray(value) && value.length > 0 && isObject(value[0]);
}

export function paginate(pageIndex, pageSize) {
    return ({
        start: (pageIndex - 1) * pageSize + 1,
        count: pageSize
    });
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

export function removeSameAttr(oObj,nObj) {
    let [keys, res] = [Object.keys(nObj), nObj];
    for(let i =0; i< keys.length; i++) {
        let name = keys[i];
        if(isEqual(oObj[name], nObj[name])) {
            delete res[name];
        }
    }
    return res;
}
