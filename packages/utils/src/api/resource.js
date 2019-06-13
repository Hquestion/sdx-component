import httpService from '../http-service';
// import httpService from '@sdx/utils/lib/http-service';
import { getUserSimpleInfo } from './user';
import { RESOURCE_MANAGE_GATWAY_BASE, COMPOSE_GATEWAY_BASE } from './config';
import shareCenter from '@sdx/utils/lib/helper/shareCenter';

export function getResourceTmplList(start = 1, count = -1, templateType) {
    return httpService.get(`${RESOURCE_MANAGE_GATWAY_BASE}resource_templates`, {
        start,
        count,
        templateType
    });
}

export function deleteResourceTmpl(uuid) {
    return httpService.remove(`${RESOURCE_MANAGE_GATWAY_BASE}/resource_templates/${uuid}`);
}

export function getResourceStates() {
    const user = shareCenter.getUser();
    return httpService.get(`${RESOURCE_MANAGE_GATWAY_BASE}/resource_states`, {
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
    return httpService.get(`${RESOURCE_MANAGE_GATWAY_BASE}resource_config`, param);
}

export function saveResourceConfig(uuid, params) {
    return httpService.patch(`${RESOURCE_MANAGE_GATWAY_BASE}resource_configs/${uuid}`, params);
}

export function createResourceTmpl(params) {
    return httpService.post(`${RESOURCE_MANAGE_GATWAY_BASE}resource_templates`, params);
}

export function createUserResourceConfig(userId, params) {
    return httpService.post(`${RESOURCE_MANAGE_GATWAY_BASE}resource_configs`, {userId, ...params});
}

export function getResourceConfigs(start = 1, count = -1, parameterType = 'USER') {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}resource-config-profiles`, {
        start,
        count,
        parameterType
    });
}

export function deleteResourceConfig(uuid) {
    return httpService.remove(`${RESOURCE_MANAGE_GATWAY_BASE}/resource_configs/${uuid}`);
}

export default {
    getResourceTmplList,
    deleteResourceTmpl,
    getResourceConfigDetail,
    createResourceTmpl,
    getResourceConfigs
};
