import wrap from '../wrap';

export let handler = wrap(function(ctx, request) {
    const projectId = request.Params.projectId && request.Params.projectId[0];
    const projects = ctx.sendRequest(ctx.createGetRequest(
        `http://tyk-gateway/project-manager/api/v1/projects/${projectId}/tasks`,
        request.Params));

    ctx.resolveUuids(projects,
        {
            path: 'items.*.ownerId',
            url: 'http://tyk-gateway/user-manager/api/v1/users',
            result: 'users',
            // 请求异常时，将id替换为errorReplaceKey;
            // 如使用data.items.*.ownerId在获取用户失败时，将会替换为data.items.*.ownerId: {[errorReplaceKey]: data.items.*.ownerId}
            errorReplaceKey: 'uuid'
        }
    );

    ctx.resolveUuids(projects,
        {
            path: 'items.*.ownerId.groups.*',
            url: 'http://tyk-gateway/user-manager/api/v1/groups',
            result: 'groups',
            // 请求异常时，将id替换为errorReplaceKey;
            // 如使用data.items.*.ownerId在获取用户失败时，将会替换为data.items.*.ownerId: {[errorReplaceKey]: data.items.*.ownerId}
            errorReplaceKey: 'uuid'
        }
    );

    ctx.rename(projects, 'items.*.ownerId', 'owner');

    return ctx.createResponse(200, projects);
});
