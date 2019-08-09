export function getUserRoleGroupByName() {
    return Promise.resolve([
        {
            name: 'zhangsan',
            gtype: 'user',
            uuid: '1'
        },
        {
            name: 'lisi',
            gtype: 'group',
            uuid: '3'
        },
        {
            name: 'test-role',
            gtype: 'role',
            uuid: '2'
        }
    ]);
}

export function getGroups() {
    return Promise.resolve({
        total: 4,
        groups: [{
            createdAt: '2019-08-06T01:47:38.258000Z',
            description: '',
            name: 'hxl',
            permissions: [],
            roles: [{createdAt: '2019-07-29T15:55:54.531000Z', description: '系统管理员', domain: 'skydiscovery'}],
            updatedAt: '2019-08-06T01:54:31.261000Z',
            users: [],
            uuid: '988fd8a4-3820-4587-a570-8b1e8f277122',
        },{
            createdAt: '2019-08-06T01:47:38.258000Z',
            description: '',
            name: 'hxl',
            permissions: [],
            roles: [{createdAt: '2019-07-29T15:55:54.531000Z', description: '系统管理员', domain: 'skydiscovery'}],
            updatedAt: '2019-08-06T01:54:31.261000Z',
            users: [],
            uuid: '988fd8a4-3820-4587-a570-8b1e8fw277122',
        },{
            createdAt: '2019-08-06T01:47:38.258000Z',
            description: '',
            name: 'hxl',
            permissions: [],
            roles: [{createdAt: '2019-07-29T15:55:54.531000Z', description: '系统管理员', domain: 'skydiscovery'}],
            updatedAt: '2019-08-06T01:54:31.261000Z',
            users: [],
            uuid: '988fd8a4-3820-4587-a570-8b1e8fx277122',
        }
        ]
    });
}
