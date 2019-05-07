"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _httpService = _interopRequireDefault(require("@sdx/utils/src/http-service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var projectApi = 'api/v1/projects/';

function getProjectList(params) {
  return _httpService["default"].get(projectApi, params);
}

function getProjectDetail(uuid) {
  return _httpService["default"].get(projectApi + uuid);
}

function createProject(params) {
  return _httpService["default"].post(projectApi, params);
}

function updateProject(uuid, params) {
  return _httpService["default"].patch(projectApi + uuid, params);
}

function removeProject(uuid) {
  return _httpService["default"].remove(projectApi + uuid);
}

var _default = {
  getProjectList: getProjectList,
  getProjectDetail: getProjectDetail,
  createProject: createProject,
  updateProject: updateProject,
  removeProject: removeProject
};
exports["default"] = _default;