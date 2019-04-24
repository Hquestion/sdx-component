"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _elementUi = require("element-ui");

var _locale = require("../locale");

// 默认一个简单的i18n处理，在应用中注入i18n
var i18n = {
  t: _locale.t
};
var errorMessageMap = {};
var defaultErrorMap = errorMessageMap["default"] || [];
var reqErrorMap = errorMessageMap.req || [];

function matchCodeWithMap(httpCode, code, map) {
  var isDefault = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var matchedAll = map.find(function (item) {
    return item.httpCode === httpCode && item.code === code;
  }); // 如果全部命中，则返回确切的提示

  if (matchedAll) {
    return {
      httpCode: httpCode,
      code: code,
      msg: matchedAll.msg
    };
  } else {
    var matchedCode = map.find(function (item) {
      return item.httpCode === httpCode || item.code === code;
    }); // 如果未全部命中，但命中了部分，则拿命中部分的提示作为降级方案

    if (matchedCode) {
      return {
        httpCode: httpCode,
        code: code,
        msg: matchedCode.msg
      };
    } else {
      // 全部没命中，则转为默认处理
      if (!isDefault) {
        return matchErrorCode(httpCode, code);
      } else {
        var defaultError = map.find(function (item) {
          return item.httpCode === '' || item.code === '';
        });
        return {
          httpCode: httpCode,
          code: code,
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
      var matched = reqErrorMap.find(function (item) {
        return item.reg.test(reqConfig.url);
      });

      if (matched) {
        // 如果命中了匹配项，则继续匹配method/httpcode/code来处理
        var method = reqConfig.method || 'DEFAULT';
        var methodErrorMap = matched[method.toUpperCase()];
        return matchCodeWithMap(httpCode, code, methodErrorMap);
      } else {
        // 如果未命中，则转成默认处理
        return matchErrorCode(httpCode, code);
      }
    } else {
      // 没url则继续转默认处理
      if (reqConfig.method) {
        var toMatchMap = defaultErrorMap[reqConfig.method.toUpperCase()];
        return matchCodeWithMap(httpCode, code, toMatchMap);
      } else {
        return matchErrorCode(httpCode, code);
      }
    }
  } else {
    // 如果没用url，则以默认值匹配， 如果没匹配上，则降级处理使用默认匹配
    var _toMatchMap = defaultErrorMap['DEFAULT'];
    return matchCodeWithMap(httpCode, code, _toMatchMap, true);
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
    var _errorInfo = matchErrorCode('', '');

    if (preventDefaultNotify) {
      return _errorInfo;
    }

    _elementUi.Notification.error({
      title: "\u9519\u8BEF\u7801: ".concat(_errorInfo.code || '未知'),
      message: i18n.t(_errorInfo.msg)
    });

    return;
  }

  var httpCode = resp.status,
      code = resp.data && resp.data.error_code || '',
      url = resp.config.url,
      method = resp.config.method,
      preventDefaultError = resp.config.preventError;

  if (preventDefaultError) {
    return;
  }

  var errorInfo = matchErrorCode(httpCode, code, {
    url: url,
    method: method
  });

  if (preventDefaultNotify) {
    return errorInfo;
  }

  _elementUi.Notification.error({
    title: "\u9519\u8BEF\u7801: ".concat(errorInfo.code || '未知'),
    message: i18n.t(errorInfo.msg)
  });
}

handler.register = function (errorCodeMap, i18nInstance) {
  errorMessageMap = errorCodeMap;
  defaultErrorMap = errorMessageMap["default"] || [];
  reqErrorMap = reqErrorMap.req || [];
  i18nInstance && (i18n = i18nInstance);
};

var _default = handler;
exports["default"] = _default;