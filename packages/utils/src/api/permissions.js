import httpService from '../http-service';
import readAuths from './config';
import { authWrapper } from './helper';

import { USER_SERVICE_GATEWAY_BASE } from './config';
const permissionsBaseUrl = `${USER_SERVICE_GATEWAY_BASE}permissions`;

export function createPermission(params) {
    return httpService.post(permissionsBaseUrl, params);
}

export function removePermission(uuid) {
    return httpService.remove(`${permissionsBaseUrl}/${uuid}`);
}

export function updatePermission(params) {
    return httpService.put(permissionsBaseUrl, params);
}

/* export function getPermissionList(params) {
    return httpService.get(permissionsBaseUrl, params);
} */

export const getPermissionList = authWrapper(function (params) {
    return httpService.get(permissionsBaseUrl, params);
}, readAuths.USER_PERMISSION_READ);

export function getPermissionDetail(uuid) {
    return httpService.get(`${permissionsBaseUrl}/${uuid}`);
}
