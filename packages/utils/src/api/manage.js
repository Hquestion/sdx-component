import httpService from '../http-service';

const rolesApi = '/api/v1/roles/';
const permissionsApi = '/api/v1/permissions/';

// 角色
export function getRolesList(params) {
    return httpService.get(rolesApi, params);
}
export function createRoles(params) {
    return httpService.post(rolesApi, params);
}

export function updateRoles(uuid) {
    return httpService.put(rolesApi + uuid);
}

export function getRolesDetail(uuid) {
    return httpService.get(rolesApi + uuid);
}

export function removeRoles(uuid) {
    return httpService.remove(rolesApi + uuid);
}

// 授权
export function getPermissionsList(params) {
    return httpService.get(permissionsApi, params);
}
export function createPermissions(params) {
    return httpService.post(permissionsApi, params);
}

export function updatePermissions(uuid) {
    return httpService.put(permissionsApi + uuid);
}

export function getPermissionsDetail(uuid) {
    return httpService.get(permissionsApi + uuid);
}


export function removePermissions(uuid) {
    return httpService.remove(permissionsApi + uuid);
}

