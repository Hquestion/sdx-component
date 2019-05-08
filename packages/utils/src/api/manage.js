import httpService from '@sdx/utils/src/http-service';

const rolesApi = 'api/v1/roles/';
const permissionsApi = 'api/v1/permissions/';

// 角色
function getRolesList(params) {
    return httpService.get(rolesApi, params);
}
function createRoles(params) {
    return httpService.post(rolesApi, params);
}

function updateRoles(uuid) {
    return httpService.put(rolesApi + uuid);
}

function getRolesDetail(uuid) {
    return httpService.get(rolesApi + uuid);
}

function removeRoles(uuid) {
    return httpService.remove(rolesApi + uuid);
}

// 授权
function getPermissionsList(params) {
    return httpService.get(permissionsApi, params);
}
function createPermissions(params) {
    return httpService.post(permissionsApi, params);
}

function updatePermissions(uuid) {
    return httpService.put(permissionsApi + uuid);
}

function getPermissionsDetail(uuid) {
    return httpService.get(permissionsApi + uuid);
}


function removePermissions(uuid) {
    return httpService.remove(permissionsApi + uuid);
}

export default {
    getRolesList,
    createRoles,
    updateRoles,
    getRolesDetail,
    removeRoles,
    getPermissionsList,
    createPermissions,
    updatePermissions,
    getPermissionsDetail,
    removePermissions
};
