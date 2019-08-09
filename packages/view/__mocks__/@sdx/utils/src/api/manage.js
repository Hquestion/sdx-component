export function getUserProfilesList() {
    return Promise.resolve({
        users: [{
            createdAt: '2019-02-06T01:56:26.957000Z',
            description: '',
            expiresAt: '2020-08-05T01:56:58.748000Z',
            fullName: 'hxl',
            groups: [{createdAt: '2019-08-06T01:47:38.258000Z', description: '', name: 'hxl'}],
            isActive: true,
            lastLogin: {clientAgent: 'Go-http-client/1.1', clientIP: '198.168.125.241', clientType: 'Unknown'},
            permissions: [],
            recentLogin: '2019-08-06T01:57:18.715000Z',
            roles: [{createdAt: '2019-07-29T15:55:54.451000Z', description: '普通用户', domain: 'skydiscovery'}],
            updatedAt: '2019-01-06T01:56:41.191000Z',
            username: 'hxl2',
            uuid: '96803338-b118-4143-9f35-a4e660997eb8',
        },
        {
            createdAt: '2019-08-06T01:56:26.957000Z',
            description: '',
            expiresAt: '2020-08-05T01:56:58.748000Z',
            fullName: 'wxfa',
            groups: [{createdAt: '2019-08-06T01:47:38.258000Z', description: '', name: 'hxl'}],
            isActive: true,
            lastLogin: {clientAgent: 'Go-http-client/1.1', clientIP: '198.168.125.241', clientType: 'Unknown'},
            permissions: [],
            recentLogin: '2019-08-06T01:57:18.715000Z',
            roles: [{createdAt: '2019-07-29T15:55:54.451000Z', description: '普通用户', domain: 'skydiscovery'}],
            updatedAt: '2019-02-06T01:56:41.191000Z',
            username: 'hxleew',
            uuid: '96803338-b118-4143-9f35-a4wqwe660997eb8',
        },{
            createdAt: '2019-09-06T01:56:26.957000Z',
            description: '',
            expiresAt: '2020-08-05T01:56:58.748000Z',
            fullName: 'acaca',
            groups: [{createdAt: '2019-08-06T01:47:38.258000Z', description: '', name: 'hxl'}],
            isActive: true,
            lastLogin: {clientAgent: 'Go-http-client/1.1', clientIP: '198.168.125.241', clientType: 'Unknown'},
            permissions: [],
            recentLogin: '2019-08-06T01:57:18.715000Z',
            roles: [{createdAt: '2019-07-29T15:55:54.451000Z', description: '普通用户', domain: 'skydiscovery'}],
            updatedAt: '2019-06-06T01:56:41.191000Z',
            username: 'hxee2',
            uuid: '96803338-b118-4143-9f35-a4e660qwqd997eb8',
        }
            
        ],
        total: 100
    });
}

export function getGroupProfilesList() {
    return Promise.resolve({
        groups: [{
            createdAt: '2019-02-06T01:47:38.258000Z',
            description: '',
            name: 'hxl',
            permissions: [],
            roles: [{createdAt: '2019-07-29T15:55:54.531000Z', description: '系统管理员', domain: 'skydiscovery'}],
            updatedAt: '2019-08-06T01:54:31.261000Z',
            users: [],
            uuid: '988fd8a4-3820-4587-a570-8b1e8f277122'
        },
        {
            createdAt: '2019-08-06T01:47:38.258000Z',
            description: '',
            name: 'hasdxl',
            permissions: [],
            roles: [{createdAt: '2019-07-29T15:55:54.531000Z', description: '系统管理员', domain: 'skydiscovery'}],
            updatedAt: '2019-08-06T01:54:31.261000Z',
            users: [],
            uuid: '988fd8a4-3820-dda-a570-8b1e8f277122'
        },{
            createdAt: '2019-05-06T01:47:38.258000Z',
            description: '',
            name: 'hadsavxl',
            permissions: [],
            roles: [{createdAt: '2019-07-29T15:55:54.531000Z', description: '系统管理员', domain: 'skydiscovery'}],
            updatedAt: '2019-08-06T01:54:31.261000Z',
            users: [],
            uuid: '988fd8a4-3820-45w87-a570-8b1e8f277122'
        } 
        ],
        total: 100
    });
}