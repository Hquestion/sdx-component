import wrap from '../wrap';

export let handler = wrap(function(ctx, request) {
    const projects = ctx.sendRequest(ctx.createGetRequest(
        'http://tyk-gateway/project-manager/api/v1/tasks',
        request.Params));

    ctx.resolveUuids(projects,
        {
            path: 'items.*.ownerId',
            url: 'http://tyk-gateway/user-manager/api/v1/users',
            result: 'users',
            // 请求异常时，将id替换为errorReplaceKey;
            // 如使用data.items.*.ownerId在获取用户失败时，将会替换为data.items.*.ownerId: {[errorReplaceKey]: data.items.*.ownerId}
            errorReplaceKey: 'uuid'
        },
        {
            path: 'items.*.projectId',
            url: 'http://tyk-gateway/fe-compose/api/v1/project-detail-batch',
            result: 'items',
            errorReplaceKey: 'uuid'
        }
    );

    ctx.rename(projects, 'items.*.ownerId', 'owner');
    ctx.rename(projects, 'items.*.projectId', 'project');

    return ctx.createResponse(200, projects);
});
