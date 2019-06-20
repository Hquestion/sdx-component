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
    },
    {
        apiId: '/fe-compose/api/v1/role-profiles',
        method: 'GET',
        functionName: 'roleProfiles.handler',
        filePath: './compose/roleProfiles.js'
    },
    {
        apiId: '/fe-compose/api/v1/image-profiles',
        method: 'GET',
        functionName: 'imageProfiles.handler',
        filePath: './compose/imageProfiles.js'
    },
    {
        apiId: '/fe-compose/api/v1/image-delete-batch',
        method: 'POST',
        functionName: 'imageDeleteBatch.handler',
        filePath: './compose/imageDeleteBatch.js'
    },
    {
        apiId: '/fe-compose/api/v1/image-share-batch',
        method: 'PATCH',
        functionName: 'imageShareBatch.handler',
        filePath: './compose/imageShareBatch.js'
    },
    {
        apiId: '/fe-compose/api/v1/image-builder-profiles',
        method: 'GET',
        functionName: 'imageBuilderProfiles.handler',
        filePath: './compose/imageBuilderProfiles.js'
    },
    {
        apiId: '/fe-compose/api/v1/task-profiles',
        method: 'GET',
        functionName: 'taskProfiles.handler',
        filePath: './compose/taskProfiles.js'
    },
    {
        apiId: '/fe-compose/api/v1/project-detail-batch',
        method: 'GET',
        functionName: 'projectDetailBatch.handler',
        filePath: './compose/projectDetailBatch.js'
    },
    {
        apiId: '/fe-compose/api/v1/task-detail',
        method: 'GET',
        functionName: 'taskDetail.handler',
        filePath: './compose/taskDetail.js'
    },
    {
        apiId: '/fe-compose/api/v1/model-delete-batch',
        method: 'POST',
        functionName: 'modelDeleteBatch.handler',
        filePath: './compose/modelDeleteBatch.js'
    },
    {
        apiId: '/fe-compose/api/v1/model-share-batch',
        method: 'PATCH',
        functionName: 'modelShareBatch.handler',
        filePath: './compose/modelShareBatch.js'
    },
    {
        apiId: '/fe-compose/api/v1/model-profiles',
        method: 'GET',
        functionName: 'modelProfiles.handler',
        filePath: './compose/modelProfiles.js'
    },
    {
        apiId: '/fe-compose/api/v1/skyflow-profiles',
        method: 'GET',
        functionName: 'skyflowProfiles.handler',
        filePath: './compose/skyflowProfiles.js'
    },
];
