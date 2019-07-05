import httpService from '../http-service';
import { USER_SERVICE_GATEWAY_BASE } from './config';
import readAuths from './config';
import { authWrapper } from './helper';

const rolesApi = `${USER_SERVICE_GATEWAY_BASE}roles`;


// 角色
/* export function getRolesList(params) {
    return httpService.get(rolesApi, params);
} */

export const getRolesList = authWrapper(function (params) {
    return httpService.get(rolesApi, params);
}, readAuths.USER_ROLE_READ);

export function createRoles(params) {
    return httpService.post(rolesApi, params);
}

export function updateRoles(uuid, params) {
    return httpService.patch(`${rolesApi}/${uuid}`, params);
}

export function getRolesDetail(uuid) {
    return httpService.get(`${rolesApi}/${uuid}`);
}

export function removeRoles(uuid) {
    return httpService.remove(`${rolesApi}/${uuid}`);
}
