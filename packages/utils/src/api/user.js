import httpService from '../http-service';
import {getRolesList} from './rolemange';

const changePasswordApi = '/api/v1/user/changePassword'; // 目前后端暂时不能确定, 之后需要再做修改

export function changePassword(params) {
    return httpService.post(changePasswordApi, params);
}

export function getRoleDetail(uuid) {
    return httpService.get(`/api/v1/roles/${uuid}`);
}

export function getGroupDetail(uuid) {
    return httpService.get(`/api/v1/groups/${uuid}`);
}

export function getUserList(params) {
    return httpService.get('/api/v1/users', params);
}

/**
 * 删除用户
 */
export function deleteUser(uuid) {
    return httpService.delete(`/api/v1/user/${uuid}`);
}

/**
 * 修改用户
 */
export function updataUser(params) {
    return httpService.patch('/api/v1/users/${uuid}',params);
}

/**
 * 创建用户
 */
export function addUser() {
    return httpService.post('/api/v1/users');
}

export function changeUserInfo(params) {
    return httpService.put('/api/v1/user', params);
}

export function getUserSimpleInfo(uuid) {
    return httpService.get(`/api/v1/users/${uuid}`);
}

export function getUserDetail(uuid) {
    return httpService.get(`/api/v1/users/${uuid}`).then(res => {
        const { roles, groups } = res;
        const rolesDeferArr = (roles || []).map(item => getRoleDetail(item));
        const groupsDeferArr = (groups || []).map(item => getGroupDetail(item));
        const rolesDeferAll = Promise.all(rolesDeferArr).then(RolesData => {
            res.roleNames = RolesData.map(item => item.name);
        }, () => {
            res.roleNames = [];
        });
        const groupsDeferAll = Promise.all(groupsDeferArr).then(groupsData => {
            res.groupNames = groupsData.map(item => item.name);
        }, () => {
            res.groupNames = [];
        });
        return new Promise(resolve => {
            Promise.all([rolesDeferAll, groupsDeferAll]).then(() => {
                resolve(res);
            }, () => {
                resolve(res);
            });
        });
    });
}

export function updataGroups(params) {
    return httpService.patch('/api/v1/groups',params);
}
export function getGroups(params) {
    return httpService.get('/api/v1/groups/', params);
}

export function getUserRoleGroupByName(name, type) {
    const pagination = { start: 1, count: type === 'all' ? 5 : 10 };
    let deferArr = [];
    if (type === 'user') {
        deferArr.push(getUserList({name, ...pagination}));
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
            const usersList = (users && users.users || []).map(item => ({...item, gtype: 'user'}));
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
    updataGroups,
    getGroups,
    getUserRoleGroupByName
};
