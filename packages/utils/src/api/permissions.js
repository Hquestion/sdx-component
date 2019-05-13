import httpService from '../http-service';

const permissionsBaseUrl = '/api/v1/permissions/';

export function createPermission(params) {
    return httpService.post(permissionsBaseUrl, params);
}

export function removePermission(uuid) {
    return httpService.remove(permissionsBaseUrl + uuid);
}

export function updatePermission(params) {
    return httpService.put(permissionsBaseUrl, params);
}

export function getPermissionList(params) {
    return httpService.get(permissionsBaseUrl, params);
}

export function getPermissionDetail(uuid) {
    return httpService.get(permissionsBaseUrl + uuid);
}
