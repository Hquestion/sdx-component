import Notification from 'element-ui/lib/notification';
import {t} from '../locale';

// 默认一个简单的i18n处理，在应用中注入i18n
let i18n = { t };
let errorMessageMap = {};

let defaultErrorMap = errorMessageMap.default || [];
let reqErrorMap = errorMessageMap.req || [];


function matchCodeWithMap(httpCode, code, map, isDefault = false) {
    const matchedAll = map.find(item => item.httpCode === httpCode && item.code === code);
    // 如果全部命中，则返回确切的提示
    if (matchedAll) {
        return {
            httpCode,
            code,
            msg: matchedAll.msg
        };
    } else {
        // 如果未全部命中，但命中了部分，则拿命中部分的提示作为降级方案
        const matchedServiceCode = map.find(item => item.code === code);
        const matchedHttpCode = map.find(item => item.httpCode === httpCode);
        if (matchedServiceCode || matchedHttpCode) {
            return {
                httpCode,
                code,
                msg: (matchedServiceCode && matchedServiceCode.msg) || (matchedHttpCode && matchedHttpCode.msg)
            };
        } else {
            // 全部没命中，则转为默认处理
            if (!isDefault) {
                return matchErrorCode(httpCode, code);
            } else {
                const defaultError = map.find(item => item.httpCode === '' || item.code === '');
                return {
                    httpCode,
                    code,
                    msg: defaultError && defaultError.msg || 'unknown'
                };
            }
        }
    }
}

function matchErrorCode(httpCode, code, reqConfig) {
    if (reqConfig) {
        // 如果传递了url，则使用url正则匹配
        if (reqConfig.url) {
            let matched = reqErrorMap.find(item => item.reg.test(reqConfig.url));
            if (matched) {
                // 如果命中了匹配项，则继续匹配method/httpcode/code来处理
                const method = reqConfig.method || 'DEFAULT';
                let methodErrorMap = matched[method.toUpperCase()];
                return matchCodeWithMap(httpCode, code, methodErrorMap);
            } else {
                // 如果未命中，则转成默认处理
                return matchErrorCode(httpCode, code);
            }
        } else {
            // 没url则继续转默认处理
            if (reqConfig.method) {
                const toMatchMap = defaultErrorMap[reqConfig.method.toUpperCase()];
                return matchCodeWithMap(httpCode, code, toMatchMap);
            } else {
                return matchErrorCode(httpCode, code);
            }
        }
    } else {
        // 如果没用url，则以默认值匹配， 如果没匹配上，则降级处理使用默认匹配
        const toMatchMap = defaultErrorMap['DEFAULT'];
        return matchCodeWithMap(httpCode, code, toMatchMap, true);
    }
}

/**
 *
 * @param resp
 * @param preventDefaultNotify  阻止默认的提示处理，可以在应用中处理
 * @returns {{msg, code, httpCode}}
 */
function handler(resp, preventDefaultNotify) {
    // 没用响应体时，默认处理
    if (!resp) {
        const errorInfo = matchErrorCode('', '');
        if (preventDefaultNotify) {
            return errorInfo;
        }
        Notification.error({
            title: `错误码: ${errorInfo.code || errorInfo.httpCode || '未知'}`,
            message: i18n.t(errorInfo.msg),
        });
        return;
    }
    const httpCode = resp.status + '',
        code = (resp.data && resp.data.code) + '' || '',
        url = resp.config.url,
        method = resp.config.method,
        preventDefaultError = resp.config.preventError;
    if (preventDefaultError) {
        return;
    }
    const errorInfo = matchErrorCode(httpCode, code, {url, method});
    if (preventDefaultNotify) {
        return errorInfo;
    }
    Notification.error({
        title: `错误码: ${errorInfo.code || errorInfo.httpCode || '未知'}`,
        message: i18n.t(errorInfo.msg),
    });
}

handler.register = (errorCodeMap, i18nInstance) => {
    errorMessageMap = errorCodeMap;
    defaultErrorMap = errorMessageMap.default || [];
    reqErrorMap = reqErrorMap.req || [];
    i18nInstance && (i18n = i18nInstance);
};

export default handler;
