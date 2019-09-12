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


// js中获取当前浏览器类型
export function myBrowser() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf('Opera') > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf('compatible') > -1
            && userAgent.indexOf('MSIE') > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf('Edge') > -1; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf('Firefox') > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf('Safari') > -1
            && userAgent.indexOf('Chrome') == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf('Chrome') > -1
            && userAgent.indexOf('Safari') > -1; //判断Chrome浏览器

    if (isIE) {
        var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp['$1']);
        if (fIEVersion == 7) {
            return 'IE7';
        } else if (fIEVersion == 8) {
            return 'IE8';
        } else if (fIEVersion == 9) {
            return 'IE9';
        } else if (fIEVersion == 10) {
            return 'IE10';
        } else if (fIEVersion == 11) {
            return 'IE11';
        } else {
            return '0';
        }
    }
    if (isOpera) {
        return 'Opera';
    }
    if (isEdge) {
        return 'Edge';
    }
    if (isFF) {
        return 'Firefox';
    }
    if (isSafari) {
        return 'Safari';
    }
    if (isChrome) {
        return 'Chrome';
    }
}

// 系统类型
export function systemType() {
    let system = '';
    const isWindows = /windows|win32/i.test(navigator.userAgent);
    const isMac = /macintosh|mac os x/i.test(navigator.userAgent); 
    const isLinux = (String(navigator.platform).indexOf('Linux') > -1);
    if(isWindows) {
        system = 'Windows';
    } else if(isMac) {
        system = 'Mac';
    } else if(isLinux) {
        system = 'Linux';
    }
    return system;
}

// 支持字符串不连续匹配
export function matchingString(oriStr,matStr) {
    let [oriArr, matArr, index,res, resArr] = [oriStr.toLowerCase().trim().split(''), matStr.toLowerCase().trim().split(''), -1, false, []];
    matArr.forEach(item => {
        index = oriArr.findIndex(val => val === item);
        oriArr = oriArr.slice(index + 1);
        resArr.push(index);
        let flag = resArr.findIndex(flagItem => flagItem === -1); 
        if(flag > -1) {
            res = false;
        } else {
            res = true;
        }
    });
    if(!matArr.length) {
        res = true;
    }
    return res;
}