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
