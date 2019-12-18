import httpService from '../http-service';
import { MODEL_MANAGE_GATEWAY_BASE, COMPOSE_GATEWAY_BASE } from './config.js';
import readAuths from './config';
import { authWrapper } from './helper';
import { download, pack } from './file';

const modelApi = `${MODEL_MANAGE_GATEWAY_BASE}models`;
const serviceApi = `${MODEL_MANAGE_GATEWAY_BASE}services`;

/* export function getModelList(params) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}model-profiles`, params);
} */

export const getModelList = authWrapper(function (params) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}model-profiles`, params);
}, readAuths.MODEL_MODEL_READ);

export const getNativeModelList = authWrapper(function (params) {
    return httpService.get(`${MODEL_MANAGE_GATEWAY_BASE}models`, params);
}, readAuths.MODEL_MODEL_READ);

export function getModelInfo(modelId) {
    return httpService.get(`${modelApi}/${modelId}`);
}

export function getLabels() {
    return httpService.get(`${modelApi}/labels`);
}

export function getModelTypes() {
    return httpService.get(`${modelApi}/modelTypes`);
}

export function createModel(params) {
    return httpService.post(modelApi, params);
}

export function createService(params) {
    return httpService.post(serviceApi, params);
}

export function updateService(uuid, params) {
    return httpService.patch(`${serviceApi}/${uuid}`, params);
}

export function removeModel(uuid) {
    return httpService.remove(`${modelApi}/${uuid}`);
}

export function removeGroupModels(params) {
    return httpService.post(`${COMPOSE_GATEWAY_BASE}model-delete-batch`, params);
}

export function updateGroupModels(params) {
    return httpService.post(`${COMPOSE_GATEWAY_BASE}model-share-batch`, params);
}

export function updateModel(uuid, params) {
    return httpService.patch(`${modelApi}/${uuid}`, params);
}

/* export function getVersionList(modelId, params) {
    return httpService.get(`${modelApi}/${modelId}/versions`, params);
} */

export const getVersionList = authWrapper(function (modelId, params) {
    return httpService.get(`${modelApi}/${modelId}/versions`, params);
}, readAuths.MODEL_MODEL_VERSION_READ);

export function removeVersion(modelId, versionId) {
    return httpService.remove(`${modelApi}/${modelId}/versions/${versionId}`);
}

export function createVersion(modelId, params) {
    return httpService.post(`${modelApi}/${modelId}/versions`, params);
}

export function updateVersion(modelId, versionId, params) {
    return httpService.patch(`${modelApi}/${modelId}/versions/${versionId}`, params);
}

export function shutdownVersion(modelId, versionId) {
    return httpService.post(`${modelApi}/${modelId}/versions/${versionId}/stop`);
}

export function startVersion(modelId, versionId) {
    return httpService.post(`${modelApi}/${modelId}/versions/${versionId}/start`);
}

export function getFrameworks() {
    return httpService.get(`${modelApi}/frameworks`);
}

export function getComponents(params) {
    return httpService.get('/api/v1/skyflow_components', params);
}

export function deployModel(params) {
    return httpService.post(`${COMPOSE_GATEWAY_BASE}model-deploy`, params);
}

export function getVersionInfo(modelId, versionId) {
    return httpService.get(`${modelApi}/${modelId}/versions/${versionId}`);
}

export function getVersionToken(modelId, versionId) {
    return httpService.get(`${modelApi}/${modelId}/versions/${versionId}/token`);
}

export function getVersionInputFormat(modelId, versionId) {
    return httpService.get(`${modelApi}/${modelId}/versions/${versionId}/input-format`);
}

// 服务列表
export function getServiceList(params) {
    return httpService.get(`${MODEL_MANAGE_GATEWAY_BASE}services`, params);
}
// 删除模型服务
export function removeService(uuid) {
    return httpService.remove(`${MODEL_MANAGE_GATEWAY_BASE}services/${uuid}`);
}
// 启动模型服务
export function startService(uuid) {
    return httpService.post(`${MODEL_MANAGE_GATEWAY_BASE}services/${uuid}/start`);
}
// 停止模型服务
export function stopService(uuid) {
    return httpService.post(`${MODEL_MANAGE_GATEWAY_BASE}services/${uuid}/stop`);
}

// 模型服务详情
export function getServiceDetail(serviceUuid) {
    return httpService.get(`${MODEL_MANAGE_GATEWAY_BASE}services/${serviceUuid}`);
}

export function getApiDetail(serviceUuid) {
    return httpService.get(`${MODEL_MANAGE_GATEWAY_BASE}services/${serviceUuid}`);
}

export function apiTest(url, params) {
    return httpService.post(url, params);
}

export function downloadVersion(path, ownerId) {
    // 打包，然后下载
    let defer = pack([path], ownerId);
    defer.then(res => {
        download(res, ownerId);
    });
}

export default {
    getModelList,
    getNativeModelList,
    getModelInfo,
    getLabels,
    getModelTypes,
    getServiceDetail,
    createModel,
    removeModel,
    updateModel,
    getVersionList,
    removeVersion,
    shutdownVersion,
    getFrameworks,
    createVersion,
    downloadVersion,
    startVersion,
    updateVersion,
    getVersionInfo,
    getVersionToken,
    getVersionInputFormat,
    removeGroupModels,
    updateGroupModels,
    getComponents,
    createService,
    removeService,
    startService,
    updateService
};
