/**
 * API注册
 * @type {{method: string, functionName: string, filePath: string, apiId: string}[]}
 */
module.exports = [
    {
        apiId: '/fe-compose/api/v1/user-profiles',
        method: 'GET',
        functionName: 'user.userProfiles',
        filePath: './compose/user.js'
    },
    {
        apiId: '/fe-compose/api/v1/group-profiles',
        method: 'GET',
        functionName: 'groupList.groupProfiles',
        filePath: './compose/groupList.js'
    }
];
