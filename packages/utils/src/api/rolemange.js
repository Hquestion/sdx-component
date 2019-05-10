import httpService from '../http-service';

const rolesApi = '/api/v1/roles/';


// 角色
export function getRolesList(params) {
    return httpService.get(rolesApi, params);
}
export function createRoles(params) {
    return httpService.post(rolesApi, params);
}

export function updateRoles(uuid, params) {
    return httpService.put(rolesApi + uuid, params);
}

export function getRolesDetail(uuid) {
    return httpService.get(rolesApi + uuid);
}

export function removeRoles(uuid) {
    return httpService.remove(rolesApi + uuid);
}
