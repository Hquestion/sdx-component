export function getRolesList() {
    return Promise.resolve({
        roles: [{
            createdAt: '2019-08-02T05:59:54.328000Z',
            description: '测试角色',
            domain: '',
            name: 'testrole',
            permissions: [],
            updatedAt: '2019-08-08T07:27:03.617000Z',
            uuid: '285dc99b-ad95-4915-8a88-5015d662cebe',
        },
        {
            createdAt: '2019-08-02T05:59:54.328000Z',
            description: '测试角色',
            domain: '',
            name: 'testrole',
            permissions: [],
            updatedAt: '2019-08-08T07:27:03.617000Z',
            uuid: '285dc99b-ad95-49asd15-8a88-5015d662cebe',
        },{
            createdAt: '2019-08-02T05:59:54.328000Z',
            description: '测试角色',
            domain: '',
            name: 'testrole',
            permissions: [],
            updatedAt: '2019-08-08T07:27:03.617000Z',
            uuid: '285dc99b-ad95-4915-8a88-5015dads662cebe',
        }
            
        ],
        total: 99
    });
}

export function getRolesDetail() {
    return Promise.resolve({
        createdAt: '2019-08-02T05:59:54.328000Z',
        description: '测试角色',
        domain: '',
        name: 'testrole',
        permissions: [],
        updatedAt: '2019-08-08T07:27:03.617000Z',
        uuid: '285dc99b-ad95-4915-8a88-5015d662cebe',
    });
}