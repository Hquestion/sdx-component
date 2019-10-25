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

export function getUserList() {
    return Promise.resolve({
        total: 12,
        users: [{
            createdAt: '2019-08-06T01:56:26.957000Z',
            description: '',
            expiresAt: '2020-08-05T01:56:58.748000Z',
            fullName: 'hxl',
            groups: [{createdAt: '2019-08-06T01:47:38.258000Z', description: '', name: 'hxl', permissions: []}],
            isActive: true,
            lastLogin: {clientAgent: 'Go-http-client/1.1', clientIP: '198.168.125.241', clientType: 'Unknown'},
            permissions: [{createdAt: '2019-07-29T15:55:56.515000Z', description: '用户读权限', key: 'USER-MANAGER:USER:READ:'}],
            recentLogin: '2019-08-06T01:57:18.715000Z',
            roles: [{createdAt: '2019-07-29T15:55:54.451000Z', description: '普通用户', domain: 'skydiscovery',name: 'user_role'}],
            updatedAt: '2019-08-08T06:12:21.054000Z',
            username: 'hxl2',
            uuid: '96803338-b118-4143-9f35-a4e660997eb8',
        },{
            createdAt: '2019-08-06T01:56:26.957000Z',
            description: '',
            expiresAt: '2020-08-05T01:56:58.748000Z',
            fullName: 'hxl',
            groups: [{createdAt: '2019-08-06T01:47:38.258000Z', description: '', name: 'hxl', permissions: []}],
            isActive: true,
            lastLogin: {clientAgent: 'Go-http-client/1.1', clientIP: '198.168.125.241', clientType: 'Unknown'},
            permissions: [{createdAt: '2019-07-29T15:55:56.515000Z', description: '用户读权限', key: 'USER-MANAGER:USER:READ:'}],
            recentLogin: '2019-08-06T01:57:18.715000Z',
            roles: [{createdAt: '2019-07-29T15:55:54.451000Z', description: '普通用户', domain: 'skydiscovery',name: 'user_role'}],
            updatedAt: '2019-08-08T06:12:21.054000Z',
            username: 'hxl2',
            uuid: '96803338-b118-4143-9f35-acv4e660997eb8',
        },{
            createdAt: '2019-08-06T01:56:26.957000Z',
            description: '',
            expiresAt: '2020-08-05T01:56:58.748000Z',
            fullName: 'hxl',
            groups: [{createdAt: '2019-08-06T01:47:38.258000Z', description: '', name: 'hxl', permissions: []}],
            isActive: true,
            lastLogin: {clientAgent: 'Go-http-client/1.1', clientIP: '198.168.125.241', clientType: 'Unknown'},
            permissions: [{createdAt: '2019-07-29T15:55:56.515000Z', description: '用户读权限', key: 'USER-MANAGER:USER:READ:'}],
            recentLogin: '2019-08-06T01:57:18.715000Z',
            roles: [{createdAt: '2019-07-29T15:55:54.451000Z', description: '普通用户', domain: 'skydiscovery',name: 'user_role'}],
            updatedAt: '2019-08-08T06:12:21.054000Z',
            username: 'hxl2',
            uuid: '96803338-b118-4143-9f35-a4e6xs60997eb8',
        }
        ]
    });
}
export function getUserSimpleInfo() {
    return Promise.resolve({
        creatorName: '11111111'
    });
}
