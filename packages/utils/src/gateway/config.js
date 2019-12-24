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
        method: 'POST',
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
        method: 'POST',
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
    {
        apiId: '/fe-compose/api/v1/file-profiles',
        method: 'GET',
        functionName: 'fileProfiles.handler',
        filePath: './compose/fileProfiles.js'
    },
    {
        apiId: '/fe-compose/api/v1/file-share-profiles',
        method: 'GET',
        functionName: 'fileShareProfiles.handler',
        filePath: './compose/fileShareProfiles.js'
    },
    {
        apiId: '/fe-compose/api/v1/file-share-batch',
        method: 'POST',
        functionName: 'fileShareBatch.handler',
        filePath: './compose/fileShareBatch.js'
    },
    {
        apiId: '/fe-compose/api/v1/file-share-search-job-profiles',
        method: 'GET',
        functionName: 'fileShareSearchJobProfiles.handler',
        filePath: './compose/fileShareSearchJobProfiles.js'
    },
    {
        apiId: '/fe-compose/api/v1/model-deploy',
        method: 'POST',
        functionName: 'modelDeploy.handler',
        filePath: './compose/modelDeploy.js'
    },
    {
        apiId: '/fe-compose/api/v1/project-task-profiles',
        method: 'GET',
        functionName: 'projectTaskProfiles.handler',
        filePath: './compose/projectTaskProfiles.js'
    },
    {
        apiId: '/fe-compose/api/v1/task-execution-profiles',
        method: 'GET',
        functionName: 'taskExecutionProfiles.handler',
        filePath: './compose/taskExecutionProfiles.js'
    },
    {
        apiId: '/fe-compose/api/v1/heartbeat',
        method: 'GET',
        functionName: 'heartbeat.handler',
        filePath: './compose/heartbeat.js'
    },
    {
        apiId: '/fe-compose/api/v1/task-resource-profiles',
        method: 'GET',
        functionName: 'taskResourceProfiles.handler',
        filePath: './compose/taskResourceProfiles.js'
    },
    {
        apiId: '/fe-compose/api/v1/datasets-profiles',
        method: 'GET',
        functionName: 'datasetProfiles.handler',
        filePath: './compose/datasetProfiles.js'
    },
    {
        apiId: '/fe-compose/api/v1/dataset-delete-batch',
        method: 'POST',
        functionName: 'datasetDeleteBatch.handler',
        filePath: './compose/datasetDeleteBatch.js'
    },
    {
        apiId: '/fe-compose/api/v1/dataset-share-batch',
        method: 'POST',
        functionName: 'datasetShareBatch.handler',
        filePath: './compose/datasetShareBatch.js'
    },
];
