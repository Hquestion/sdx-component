import wrap from '../wrap';

export let handler = wrap(function(ctx, request) {
    const task = ctx.sendRequest(ctx.createGetRequest(
        `http://tyk-gateway/project-manager/api/v1/tasks/${request.Params.uuid && request.Params.uuid[0]}`,
        request.Params));

    ctx.resolveUuids(task,
        {
            path: 'ownerId',
            url: 'http://tyk-gateway/user-manager/api/v1/users',
            result: 'users',
            // 请求异常时，将id替换为errorReplaceKey;
            // 如使用data.items.*.ownerId在获取用户失败时，将会替换为data.items.*.ownerId: {[errorReplaceKey]: data.items.*.ownerId}
            errorReplaceKey: 'uuid'
        },
        {
            path: 'projectId',
            url: 'http://tyk-gateway/fe-compose/api/v1/project-detail-batch',
            result: 'items',
            errorReplaceKey: 'uuid'
        },
        {
            path: 'imageId',
            url: 'http://tyk-gateway/image-manager/api/v1/images',
            result: 'data',
            errorReplaceKey: 'uuid'
        }
    );

    ctx.rename(task, 'ownerId', 'owner');
    ctx.rename(task, 'projectId', 'project');
    ctx.rename(task, 'imageId', 'image');

    return ctx.createResponse(200, task);
});
