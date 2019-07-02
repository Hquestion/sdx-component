import httpService from '../http-service';
import {getRolesList} from './rolemange';
import { COMPOSE_GATEWAY_BASE, USER_SERVICE_GATEWAY_BASE } from './config';
import readAuths from './config';
import { authWrapper } from './helper';


export function changePassword(uuid, params) {
    return httpService.patch(`${USER_SERVICE_GATEWAY_BASE}users/${uuid}`, params);
}

export function getRoleDetail(uuid) {
    return httpService.get(`${USER_SERVICE_GATEWAY_BASE}roles/${uuid}`);
}

export function getGroupDetail(uuid) {
    return httpService.get(`${USER_SERVICE_GATEWAY_BASE}groups/${uuid}`);
}

/* export function getSimpleUserList(params) {
    return httpService.get(`${USER_SERVICE_GATEWAY_BASE}users/`, params);
} */

export const getSimpleUserList = authWrapper(function (params) {
    return httpService.get(`${USER_SERVICE_GATEWAY_BASE}users/`, params);
}, readAuths.USER_USER_READ);

/* export function getUserList(params) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}user-profiles`, params);
} */

export const getUserList = authWrapper(function (params) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}user-profiles`, params);
}, readAuths.USER_USER_READ);

/**
 * 删除用户
 */
export function deleteUser(uuid) {
    return httpService.remove(`${USER_SERVICE_GATEWAY_BASE}users/${uuid}`);
}

/**
 * 修改用户
 */
export function updataUser(uuid, params) {
    return httpService.patch(`${USER_SERVICE_GATEWAY_BASE}users/${uuid}`,params);
}

/**
 * 创建用户
 */
export function addUser(params) {
    return httpService.post(`${USER_SERVICE_GATEWAY_BASE}users`, params);
}

export function changeUserInfo(params) {
    return httpService.put(`${USER_SERVICE_GATEWAY_BASE}user`, params);
}

export function getUserSimpleInfo(uuid) {
    return httpService.get(`${USER_SERVICE_GATEWAY_BASE}users/${uuid}`);
}

export function getUserDetail(uuid) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}user-detail/`, {
        uuid
    }).then(res => {
        const { roles, groups, permissions } = res;
        res.roleNames = roles.map(item => item.name);
        res.groupNames = groups.map(item => item.name);
        res.permissionNames = permissions.map(item => item.name);
        return res;
    });
}

export function createGroup(params) {
    return httpService.post(`${USER_SERVICE_GATEWAY_BASE}groups`, params);
}

export function updateGroups(uuid, params) {
    return httpService.patch(`${USER_SERVICE_GATEWAY_BASE}groups/${uuid}`,params);
}

export function deleteGroup(uuid) {
    return httpService.remove(`${USER_SERVICE_GATEWAY_BASE}groups/${uuid}`);
}

/* export function getGroups(params) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}group-profiles`, params);
}
 */
export const getGroups = authWrapper(function (params) {
    return httpService.get(`${COMPOSE_GATEWAY_BASE}group-profiles`, params);
}, readAuths.USER_GROUP_READ);

export function getUserRoleGroupByName(name, type) {
    const pagination = { start: 1, count: type === 'all' ? 5 : 10 };
    let deferArr = [];
    if (type === 'user') {
        deferArr.push(getSimpleUserList({username: name, fullName: name, ...pagination}));
    } else if (type === 'role') {
        deferArr.push(getRolesList({name, ...pagination}));
    } else if (type === 'group') {
        deferArr.push(getGroups({name, ...pagination}));
    } else {
        deferArr = [
            getUserList({name, ...pagination}),
            getRolesList({name, ...pagination}),
            getGroups({name, ...pagination})
        ];
    }
    return new Promise((resolve, reject) => {
        Promise.all(deferArr).then(([users, roles, groups]) => {
            const usersList = (users && users.users || []).map(item => ({...{name: item.fullName, uuid: item.uuid}, gtype: 'user'}));
            const rolesList = (roles && roles.roles || []).map(item => ({...item, gtype: 'role'}));
            const groupsList = (groups && groups.groups || []).map(item => ({...item, gtype: 'group'}));
            resolve([...usersList, ...rolesList, ...groupsList]);
        }, reject);
    });
}

export default {
    changePassword,
    getRoleDetail,
    getGroupDetail,
    getUserDetail,
    getUserList,
    deleteUser,
    updataUser,
    addUser,
    changeUserInfo,
    getUserSimpleInfo,
    updateGroups,
    getGroups,
    deleteGroup,
    createGroup,
    getUserRoleGroupByName
};
