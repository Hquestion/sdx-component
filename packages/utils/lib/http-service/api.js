"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = $axios;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var errorHandler;
var instance;
var mockUrlList;
var needUpdate = false;
var axiosConfig = {
  baseURL: '',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  timeout: 30000,
  withCredentials: false,
  responseType: 'json'
};

function $axios(options) {
  return new Promise(function (resolve, reject) {
    if (!instance || needUpdate) {
      instance = _axios["default"].create(axiosConfig); // request 拦截器

      instance.interceptors.request.use(function (config) {
        if (axiosConfig.tokenKey) {
          config.headers[axiosConfig.tokenKey] = axiosConfig.tokenValue;
        }

        if (process.env.NODE_ENV === 'development') {
          var needMock = mockUrlList && mockUrlList.some(function (url) {
            if (typeof url === 'string') {
              return url === config.url;
            } else if (_typeof(url) === 'object' && url instanceof RegExp) {
              return url.test(config.url);
            } else {
              return false;
            }
          });
          needMock && (config.url = "/mock".concat(config.url));
        }

        return config;
      }, function (error) {
        return Promise.reject(error);
      }); // response 拦截器

      instance.interceptors.response.use(function (response) {
        var data = response.data; // 根据返回的code值来做不同的处理（和后端约定）
        // switch (data.code) {
        // case "":
        //     break;
        // default:
        //     break;
        // }
        // 若不是正确的返回code，且已经登录，就抛出错误
        // const err = new Error(data.description)
        // err.data = data
        // err.response = response
        // throw err

        return data;
      }, function (err) {
        if (errorHandler) errorHandler(err.response);
        return Promise.reject(err); // 返回接口返回的错误信息
      });
      needUpdate = false;
    } //请求处理


    instance(options).then(function (res) {
      resolve(res);
    })["catch"](function (error) {
      reject(error);
    });
  });
}

$axios.register = function (handler, config, mock) {
  errorHandler = handler;
  Object.assign(axiosConfig, config);
  mockUrlList = mock;
  needUpdate = true;
};