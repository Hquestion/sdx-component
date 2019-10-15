import httpService from '../http-service';
import { RESOURCE_MANAGE_GATEWAY_BASE, COMPOSE_GATEWAY_BASE, SYSTEM_MANAGE_GETWAY_BASE } from './config';
import shareCenter from '../helper/shareCenter';
import readAuths from './config';
import { authWrapper } from './helper';


/* export function getResourceTmplList(start = 1, count = -1, templateType) {
    return httpService.get(`${RESOURCE_MANAGE_GATEWAY_BASE}resource_templates`, {
        start,
        count,
        templateType
    });
} */

export const getResourceTmplList = authWrapper(function (start = 1, count = -1, templateType, params) {
    return httpService.get(`${RESOURCE_MANAGE_GATEWAY_BASE}resource_templates`, {
        start,
        count,
        templateType,
        ...params
    });
}, readAuths.RESOURCE_TEMPLATE_READ);

export function deleteResourceTmpl(uuid) {
    return httpService.remove(`${RESOURCE_MANAGE_GATEWAY_BASE}resource_templates/${uuid}`);
}

/* export function getResourceStates(global = false) {
    const user = shareCenter.getUser();
    return global ? httpService.get(`${RESOURCE_MANAGE_GATEWAY_BASE}resource_states`) : httpService.get(`${RESOURCE_MANAGE_GATEWAY_BASE}resource_states`, {
        userId: user.userId
    });
} */

export const getResourceStates = authWrapper(function (global = false) {
    const user = shareCenter.getUser();
    return global ? httpService.get(`${RESOURCE_MANAGE_GATEWAY_BASE}resource_states`) : httpService.get(`${RESOURCE_MANAGE_GATEWAY_BASE}resource_states`, {
        userId: user.userId
    });
}, readAuths.SYSTEM_GLOBAL_RESOURCE_READ);

export function getTotalResource() {
    if (getTotalResource.cache) {
        return Promise.resolve(getTotalResource.cache);
    } else {
        return httpService.get(`${SYSTEM_MANAGE_GETWAY_BASE}resources`).then(res => {
            getTotalResource.cache = res.total;
            return res.total;
        });
    }
}

export function getGpuModels() {
    return getTotalResource().then(res => res.gpuModels);
}

/* export function getResourceConfigDetail(uuid) {
    let param = {};
    if (uuid) {
        param = {userId: uuid};
    }
    return httpService.get(`${RESOURCE_MANAGE_GATEWAY_BASE}resource_config`, param);
} */

export const getResourceConfigDetail = authWrapper(function (uuid) {
    let param = {};
    if (uuid) {
        param = {userId: uuid};
    }
    return httpService.get(`${RESOURCE_MANAGE_GATEWAY_BASE}resource_config`, param);
}, readAuths.RESOURCE_GLOBAL_STATE_READ);

export function saveResourceConfig(uuid, params) {
    return httpService.patch(`${RESOURCE_MANAGE_GATEWAY_BASE}resource_configs/${uuid}`, params);
}

export function createResourceTmpl(params) {
    return httpService.post(`${RESOURCE_MANAGE_GATEWAY_BASE}resource_templates`, params);
}

export function createUserResourceConfig(userId, params) {
    return httpService.post(`${RESOURCE_MANAGE_GATEWAY_BASE}resource_configs`, {userId, ...params});
}

/* export function getResourceConfigs(start = 1, count = -1, parameterType = 'USER') {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}resource-config-profiles`, {
        start,
        count,
        parameterType
    });
} */

export const getResourceConfigs = authWrapper(function (start = 1, count = -1, parameterType = 'USER') {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}resource-config-profiles`, {
        start,
        count,
        parameterType
    });
}, readAuths.RESOURCE_USER_STATE_READ);

export function deleteResourceConfig(uuid) {
    return httpService.remove(`${RESOURCE_MANAGE_GATEWAY_BASE}/resource_configs/${uuid}`);
}
// 首页
export const getDashResourceStates = authWrapper(function (params) {
    return  httpService.get(`${RESOURCE_MANAGE_GATEWAY_BASE}resource_states`, params);
}, readAuths.SYSTEM_GLOBAL_RESOURCE_READ);

export default {
    getResourceTmplList,
    deleteResourceTmpl,
    getResourceConfigDetail,
    createResourceTmpl,
    getResourceConfigs,
    getDashResourceStates
};
