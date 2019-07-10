import httpService from '../http-service';
import { COMPOSE_GATEWAY_BASE } from './config';

const userProfilesApi = `${COMPOSE_GATEWAY_BASE}user-profiles`;
const groupProfilesApi = `${COMPOSE_GATEWAY_BASE}group-profiles`;
const roleProfilesApi = `${COMPOSE_GATEWAY_BASE}role-profiles`;

// 授权

// 用户授权列表
export function getUserProfilesList(params) {
    return httpService.get(userProfilesApi, params);
}
// 用户组授权列表
export function getGroupProfilesList(params) {
    return httpService.get(groupProfilesApi, params);
}
// 角色授权列表
export function getRoleProfilesList(params) {
    return httpService.get(roleProfilesApi, params);
}

// export function createPermissions(params) {
//     return httpService.post(permissionsApi, params);
// }

// export function updatePermissions(uuid) {
//     return httpService.put(permissionsApi + uuid);
// }

// export function getPermissionsDetail(uuid) {
//     return httpService.get(permissionsApi + uuid);
// }


// export function removePermissions(uuid) {
//     return httpService.remove(permissionsApi + uuid);
// }

