import httpService from '../http-service';
import { MODEL_MANAGE_GATEWAY_BASE, COMPOSE_GATEWAY_BASE } from './config.js';
import readAuths from './config';
import { authWrapper } from './helper';

const modelApi = `${MODEL_MANAGE_GATEWAY_BASE}models`;

/* export function getModelList(params) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}model-profiles`, params);
} */

export const getModelList = authWrapper(function (params) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}model-profiles`, params);
}, readAuths.MODEL_MODEL_READ);

export function getModelInfo(modelId) {
    return httpService.get(`${modelApi}/${modelId}`);
}

export function getLabels() {
    return httpService.get(`${modelApi}/labels`);
}

export function createModel(params) {
    return httpService.post(modelApi, params);
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

export function getApiDetail(serviceUuid) {
    return Promise.resolve({
        'name': 'my-model_service ',
        'description': 'my-model v1 description.',
        'modelId': '300277f0-349c-4932-bae3-5f8278b9afef',
        'versionName': '300277f0-349c-4932-bae3-5f8278b9afef',
        'versionUpgrade': null,
        'creatorId': '00277f0-349c-4932-bae3-5f8278b9afe dfs ',
        'createdAt': '2019-04-02T15:32:42Z',
        'updatedAt': '2019-04-02T15:32:42Z',
        'startedAt': '2019-04-02T15:32:42Z',
        'stoppedAt': '2019-04-02T15:32:42Z',
        'runtimeImage ': 'TENSORFLOW-serving-20190501',
        'apiExamples': {
            'request': {
                'curl': 'curl url/predict',
                'python': '....',
                'java': '...'
            },
            'response': {
                'success': '',
                'failed': ''
            }
        },
        'apiParams': {
            'input': [
                {
                    'name': 'input_array',
                    'dtype': 'array',
                    'range': null,
                    'default': null,
                    'description': null
                },
                {
                    'name': 'topNums',
                    'dtype': 'int',
                    'range': [
                        1,
                        20
                    ],
                    'default': 5,
                    'description': '标签数'
                }
            ],
            'output': [
                {
                    'name': 'result',
                    'dtype': 'string',
                    'range': null,
                    'default': null,
                    'description': '标签名称'
                },
                {
                    'name': 'confidence',
                    'dtype': 'float',
                    'range': [
                        0.00,
                        1.00
                    ],
                    'default': null,
                    'description': '置信度'
                }
            ]
        },
        'runtimeResource': {
            'cpus': 2,
            'memory': 1024000000,
            'gpus': 1,
            'gpuModel': 'k80'
        },
        'instances': 2,
        'apiUrl': 'http://host:port/model-service/{uuid}/',
        'apiKey': 'fjhdsaiofjas168',
        'apiCallNums': 111,
        'state': 'RUNNING',
        'token': 'eyJhbGciOiJIUzUxMiIsImlhdCI6MTU1OTcwMDg5NiwiZXhwIjoxNTYwMzA1Njk2fQ.eyJ1c2VyX2lkIjoiZDA5NTk3MjItNDdhMy00ZmQxLTk1ZDgtZmY1OTU1Yjg4ZTQ0In0.5Y4rd3WRYtHyoR590qEkl7i1TL7_kIYDdil_hrUf8cQAfw8WlizyYfv0VLv0_TJJ_Gjha6A7ZuxDLn_EFKbmQw',
        'errors': [],
        'users': [],
        'groups': [],
        'isPublished': false,
    });
    return httpService.get(`${MODEL_MANAGE_GATEWAY_BASE}services/${serviceUuid}`);
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
    getVersionInputFormat,
    removeGroupModels,
    updateGroupModels,
    getComponents
};
