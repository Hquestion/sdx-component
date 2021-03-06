/**
 * 用来与APP同步数据
 * 比如组件中需要App中的当前用户信息，可以在APP初始化时，调用register方法或registerUser方法进行注册
 * 如需要其他共享数据，同样在这里注册即可
 * 注册的参数支持函数，暴露一个函数给外部其他组件调用
 */
import { registerI18n } from '../locale';

let AUTH_ON = true;
let user;

export function setup(opt) {
    // 如果有其他需要共享的数据，在这里添加
    user = opt.user || user;
    if(opt.authSwitch === 'OFF') {
        AUTH_ON = false;
    }
    if (opt.i18n) {
        registerI18n(opt.i18n);
    }
}

export function registerUser(currentUser) {
    user = currentUser;
}

export function getUserAllPermissions(user) {
    if (!user) return [];
    if (!user.allPermissions) {
        let allPermissions = user.permissions.slice();
        let rolePermissions = [], groupsPermissions = [], groupRolePermissions = [];
        user.roles.forEach(item => rolePermissions = rolePermissions.concat(item.permissions));
        user.groups.forEach(item => {
            groupsPermissions = groupsPermissions.concat(item.permissions);
            item.roles.forEach(role => {
                groupRolePermissions = groupRolePermissions.concat(role.permissions);
            });
        });
        rolePermissions.forEach(item => !allPermissions.find(p => p.uuid === item.uuid) && allPermissions.push(item));
        groupsPermissions.forEach(item => !allPermissions.find(p => p.uuid === item.uuid) && allPermissions.push(item));
        groupRolePermissions.forEach(item => !allPermissions.find(p => p.uuid === item.uuid) && allPermissions.push(item));
        return allPermissions;
    }
    return user.allPermissions;
}

export function getUser() {
    const sharedUser = typeof user === 'function' ? user() : user;
    sharedUser && (sharedUser.allPermissions = getUserAllPermissions(sharedUser));
    return sharedUser;
}

export function getAuthSwitcher() {
    return AUTH_ON;
}

export function getIsAdmin() {
    return true;
}

export default {
    setup,
    getUser,
    getAuthSwitcher,
    registerUser,
    getIsAdmin
};
