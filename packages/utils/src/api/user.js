import httpService from '../http-service';

const changePasswordApi = 'api/v1/user/changePassword'; // 目前后端暂时不能确定, 之后需要再做修改

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
    return httpService.get(`/api/v1/users`, params);
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
    return httpService.post(`/api/v1/users`);
}

export function changeUserInfo(params) {
    return httpService.put('/api/v1/user',params);
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
export function getGroups() {
    return httpService.get('/api/v1/groups/');
}

