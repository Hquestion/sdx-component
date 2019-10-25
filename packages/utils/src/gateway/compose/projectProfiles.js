import wrap from '../wrap';

export let handler = wrap(function(ctx, request) {
    const projects = ctx.sendRequest(ctx.createGetRequest(
        'http://tyk-gateway/project-manager/api/v1/projects',
        request.Params));

    ctx.resolveUuids(projects,
        {
            path: 'data.items.*.ownerId',
            url: 'http://tyk-gateway/user-manager/api/v1/users',
            result: 'users',
            // 请求异常时，将id替换为errorReplaceKey;
            // 如使用data.items.*.ownerId在获取用户失败时，将会替换为data.items.*.ownerId: {[errorReplaceKey]: data.items.*.ownerId}
            errorReplaceKey: 'uuid'
        }
    );

    ctx.rename(projects, 'data.items.*.ownerId', 'owner');

    return ctx.createResponse(200, projects);
});
