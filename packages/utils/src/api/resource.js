import httpService from '../http-service';
import { RESOURCE_MANAGE_GATEWAY_BASE, COMPOSE_GATEWAY_BASE } from './config';
import shareCenter from '../helper/shareCenter';

export function getResourceTmplList(start = 1, count = -1, templateType) {
    return httpService.get(`${RESOURCE_MANAGE_GATEWAY_BASE}resource_templates`, {
        start,
        count,
        templateType
    });
}

export function deleteResourceTmpl(uuid) {
    return httpService.remove(`${RESOURCE_MANAGE_GATEWAY_BASE}resource_templates/${uuid}`);
}

export function getResourceStates(global = false) {
    const user = shareCenter.getUser();
    return global ? httpService.get(`${RESOURCE_MANAGE_GATEWAY_BASE}resource_states`) : httpService.get(`${RESOURCE_MANAGE_GATEWAY_BASE}resource_states`, {
        userId: user.userId
    });
}

export function getGpuModels() {
    return getResourceStates().then(res => res.gpus);
}

export function getResourceConfigDetail(uuid) {
    let param = {};
    if (uuid) {
        param = {userId: uuid};
    }
    return httpService.get(`${RESOURCE_MANAGE_GATEWAY_BASE}resource_config`, param);
}

export function saveResourceConfig(uuid, params) {
    return httpService.patch(`${RESOURCE_MANAGE_GATEWAY_BASE}resource_configs/${uuid}`, params);
}

export function createResourceTmpl(params) {
    return httpService.post(`${RESOURCE_MANAGE_GATEWAY_BASE}resource_templates`, params);
}

export function createUserResourceConfig(userId, params) {
    return httpService.post(`${RESOURCE_MANAGE_GATEWAY_BASE}resource_configs`, {userId, ...params});
}

export function getResourceConfigs(start = 1, count = -1, parameterType = 'USER') {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}resource-config-profiles`, {
        start,
        count,
        parameterType
    });
}

export function deleteResourceConfig(uuid) {
    return httpService.remove(`${RESOURCE_MANAGE_GATEWAY_BASE}/resource_configs/${uuid}`);
}

export default {
    getResourceTmplList,
    deleteResourceTmpl,
    getResourceConfigDetail,
    createResourceTmpl,
    getResourceConfigs
};
