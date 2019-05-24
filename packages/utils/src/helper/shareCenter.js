/**
 * 用来与APP同步数据
 * 比如组件中需要App中的当前用户信息，可以在APP初始化时，调用register方法或registerUser方法进行注册
 * 如需要其他共享数据，同样在这里注册即可
 * 注册的参数支持函数，暴露一个函数给外部其他组件调用
 */
let user;

export function setup(opt) {
    // 如果有其他需要共享的数据，在这里添加
    user = opt.user || user;
}

export function registerUser(currentUser) {
    user = currentUser;
}

export function getUser() {
    return typeof user === 'function' ? user() : user;
}

export default {
    setup,
    getUser,
    registerUser
};
