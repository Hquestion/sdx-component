"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = _interopRequireDefault(require("./api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function get(url, params, config) {
  if (!url) return;
  return (0, _api["default"])(_objectSpread({
    method: 'get',
    url: url,
    params: params
  }, config));
}

function post(url, data, config) {
  if (!url) return;
  return (0, _api["default"])(_objectSpread({
    method: 'post',
    url: url,
    data: data
  }, config));
}

function put(url, data, config) {
  if (!url) return;
  return (0, _api["default"])(_objectSpread({
    method: 'put',
    url: url,
    data: data
  }, config));
}

function remove(url, params, config) {
  if (!url) return;
  return (0, _api["default"])(_objectSpread({
    method: 'delete',
    url: url,
    params: params
  }, config));
}

function patch(url, data, config) {
  if (!url) return;
  return (0, _api["default"])(_objectSpread({
    method: 'delete',
    url: url,
    data: data
  }, config));
}

function register(configs) {
  var handler = configs.handler,
      config = configs.config,
      mock = configs.mock;

  _api["default"].register(handler, config, mock);
}

var _default = {
  get: get,
  put: put,
  post: post,
  remove: remove,
  patch: patch,
  register: register
};
exports["default"] = _default;