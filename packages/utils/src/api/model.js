import httpService from '../http-service';

const modelApi = '/api/v1/models/';

export function getModelList(params) {
    return httpService.get(modelApi, params);
}

export function getModelInfo(modelId) {
    return httpService.get(modelApi + modelId);
}

export function getLabels() {
    return httpService.get(modelApi + 'labels');
}

export function createModel(params) {
    return httpService.post(modelApi, params);
}

export function removeModel(uuid) {
    return httpService.remove(modelApi + uuid);
}

export function updateModel(uuid, params) {
    return httpService.patch(modelApi + uuid, params);
}

export function getVersionList(modelId, params) {
    return httpService.get(modelApi + modelId + '/versions', params);
}

export function removeVersion(modelId, versionId) {
    return httpService.remove(modelApi + modelId + '/versions/' + versionId);
}

export function createVersion(modelId, params) {
    return httpService.post(modelApi + modelId + '/versions/', params);
}

export function updateVersion(modelId, versionId, params) {
    return httpService.patch(modelApi + modelId + '/versions/' + versionId, params);
}

export function shutdownVersion(modelId, versionId) {
    return httpService.post(modelApi + modelId + '/versions/' + versionId + '/stop');
}

export function startVersion(modelId, versionId) {
    return httpService.post(modelApi + modelId + '/versions/' + versionId + '/start');
}

export function getFrameworks() {
    return httpService.get(modelApi + 'frameworks');
}

export function getVersionInfo(modelId, versionId) {
    return httpService.get(modelApi + modelId + '/versions/' + versionId);
}

export function getVersionToken(modelId, versionId) {
    return httpService.get(modelApi + modelId + '/versions/' + versionId + '/token');
}

export function getVersionInputFormat(modelId, versionId) {
    return httpService.get(modelApi + modelId + '/versions/' + versionId + '/input-format');
}

export default {
    getModelList,
    getModelInfo,
    getLabels,
    createModel,
    removeModel,
    updateModel,
    getVersionList,
    removeVersion,
    shutdownVersion,
    getFrameworks,
    createVersion,
    startVersion,
    updateVersion,
    getVersionInfo,
    getVersionToken,
    getVersionInputFormat
};
