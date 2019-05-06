"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _httpService = _interopRequireDefault(require("@sdx/utils/src/http-service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var changePasswordApi = 'api/v1/user/changePassword'; // 目前后端暂时不能确定, 之后需要再做修改

var getUserInfoApi = 'api/v1/user/info'; // 目前后端暂时不能确定, 之后需要再做修改

function changePassword(params) {
  return _httpService["default"].post(changePasswordApi, params);
}

function getUserInfo(params) {
  return _httpService["default"].get(getUserInfoApi, params);
}

var _default = {
  changePassword: changePassword,
  getUserInfo: getUserInfo
};
exports["default"] = _default;