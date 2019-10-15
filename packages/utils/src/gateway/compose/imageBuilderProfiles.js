import wrap from '../wrap';

export let handler = wrap(function(ctx, request) {
    const projects = ctx.sendRequest(ctx.createGetRequest(
        'http://tyk-gateway/image-manager/api/v1/image_builders',
        request.Params));

    ctx.resolveUuids(projects,
        {
            path: 'data.*.ownerId',
            url: 'http://tyk-gateway/user-manager/api/v1/users',
            result: 'users',
            // 请求异常时，将id替换为errorReplaceKey;
            // 如使用data.items.*.ownerId在获取用户失败时，将会替换为data.items.*.ownerId: {[errorReplaceKey]: data.items.*.ownerId}
            errorReplaceKey: 'uuid'
        },
        {
            path: 'data.*.baseImage',
            url: 'http://tyk-gateway/image-manager/api/v1/images',
            result: 'data',
            // 请求异常时，将id替换为errorReplaceKey;
            // 如使用data.items.*.ownerId在获取用户失败时，将会替换为data.items.*.ownerId: {[errorReplaceKey]: data.items.*.ownerId}
            errorReplaceKey: 'uuid'
        }
    );

    ctx.rename(projects, 'data.*.ownerId', 'owner');

    return ctx.createResponse(200, projects);
});
