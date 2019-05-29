import httpService from '../http-service';

const modelApi = '/api/v1/models/';

export function getModelList(params) {
    return httpService.get(modelApi, params);
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

export default {
    getModelList,
    getLabels,
    createModel,
    removeModel,
    updateModel
};
