/**
 * API注册
 * @type {{method: string, functionName: string, filePath: string, apiId: string}[]}
 */
module.exports = [
    {
        apiId: '/fe-compose/api/v1/login',
        method: 'POST',
        functionName: 'login.handler',
        filePath: './compose/login.js'
    },
    {
        apiId: '/fe-compose/api/v1/user-profiles',
        method: 'GET',
        functionName: 'userProfiles.handler',
        filePath: './compose/userProfiles.js'
    },
    {
        apiId: '/fe-compose/api/v1/group-profiles',
        method: 'GET',
        functionName: 'groupProfiles.handler',
        filePath: './compose/groupProfiles.js'
    }
];
