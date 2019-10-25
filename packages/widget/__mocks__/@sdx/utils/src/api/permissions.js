export function getPermissionList(params) {
    return Promise.resolve({
        permissions: [
            {
                uuid:  '9fdff30d-da5f-443b-a8f4-6339c12eb7b4',
                name: '用户管理--用户读权限'
            },
            {
                uuid:  '9fdff30d-da5f-443b-a8f4-6339c12eb7b4',
                name: '资源管理--用户读权限'
            },
            {
                uuid:  '9fdff30d-da5f-443b-a8f4-6339c12eb7b4',
                name: '权限管理--用户读权限'
            },
            {
                uuid:  '9fdff30d-da5f-443b-a8f4-6339c12eb7b4',
                name: '文件管理--用户读权限'
            }
        ],
        total: 100
    });
}