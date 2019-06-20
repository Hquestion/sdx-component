import shareCenter from '@sdx/utils/src/helper/shareCenter';

const systemMap = {
    app: 'APPLICATION',
    user: 'USER-MANAGER',
    system: 'SYSTEM-MANAGER',
    resource: 'RESOURCE-MANAGER',
    data: 'DATA-MANAGER',
    project: 'PROJECT-MANAGER',
    image: 'IMAGE-MANAGER',
    model: 'MODEL-MANAGER',
    file: 'FILE-MANAGER',
    skyflow: 'SKYFLOW-MANAGER'
};

const tagMap = {
    menu: 'MENU',
    button: 'BUTTON',
    api: 'API'
};

const emptyPlaceholder = '""';

const getTag = modifier => {
    let tag = '';
    Object.keys(modifier).forEach(item => tagMap[item] && (tag = tagMap[item]));
    return tag || '';
};

const getSystem = modifier => {
    let system = '';
    Object.keys(modifier).forEach(item => systemMap[item] && (system = systemMap[item]));
    return system || '';
};

const getUserRightsByTag = tag => {
    const user = shareCenter.getUser();
    if (!user) {
        return [];
    }
    const permissions = user.allPermissions || [];
    if(!tag) {
        return permissions;
    }
    const tagPermissions = permissions.filter(permission => permission.tags.includes(tag.toLowerCase()) || permission.tags.includes(tag.toUpperCase()));
    return tagPermissions.map(item => item.key);
};

function locateNode (vnode) {
    return vnode.componentInstance
        ? locateNode(vnode.componentInstance)
        : vnode;
}

export const auth = (key, tag) => {
    // 如果关闭鉴权，则跳过鉴权逻辑
    if (!shareCenter.getAuthSwitcher()) return true;
    if (!key) return true;
    const permissions = getUserRightsByTag(tag);
    return permissions.includes(key);
};

export default {
    name: 'auth',
    $auth: auth,
    inserted(el, binding, vnode) {
        vnode = locateNode(vnode);
        const system = getSystem(binding.modifiers);
        const tag = getTag(binding.modifiers);
        const exp = binding.value;
        const originalDisplay = el.__vOriginalDisplay =
            el.style.display === 'none' ? '' : el.style.display;
        const authKeyLength = system ? 2 : 3;
        if (typeof exp === 'string') {
            let value = exp;
            if (value.split(':').length === authKeyLength) {
                value = `${value}:${emptyPlaceholder}`;
            }
            let key = system ? `${system}:${value}` : value;
            // 用户无此权限时，隐藏节点
            if (!auth(key, tag)) {
                if (!vnode._isBeingDestroyed && !vnode.isDestroyed) {
                    vnode.$destroy && vnode.$destroy();
                    el.remove();
                }
            } else {
                // if (!vnode._isMounted) {
                //     if (vnode.$mount) {
                //         vnode.$mount(el);
                //     }else {
                //         el.parentNode.appendChild(el);
                //     }
                // }
            }
        } else if (typeof exp === 'function') {
            let authAttr = vnode.componentInstance.$attrs.auth;
            if (!authAttr) {
                // eslint-disable-next-line
                console.warn('You passed a function to v-auth, a "auth" attribute is needed to describe the rights which indicate the block could be accessed!');
            }
            if (authAttr.split(':').length === authKeyLength) {
                authAttr = `${authAttr}:${emptyPlaceholder}`;
            }
            const key = system ? `${system}:${authAttr}` : authAttr;
            // 把鉴权结果传递给用户自定义函数，由用户自行处理权限
            exp(auth(key, tag));
        } else {
            // eslint-disable-next-line
            console.error('v-auth must accept a function or string!');
        }
    }
};
