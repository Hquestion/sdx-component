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
    },
    {
        apiId: '/fe-compose/api/v1/resource-config-profiles',
        method: 'GET',
        functionName: 'resourceConfigProfiles.handler',
        filePath: './compose/resourceConfigProfiles.js'
    },
    {
        apiId: '/fe-compose/api/v1/project-profiles',
        method: 'GET',
        functionName: 'projectProfiles.handler',
        filePath: './compose/projectProfiles.js'
    },
    {
        apiId: '/fe-compose/api/v1/user-detail',
        method: 'GET',
        functionName: 'userDetail.handler',
        filePath: './compose/userDetail.js'
    }
];
