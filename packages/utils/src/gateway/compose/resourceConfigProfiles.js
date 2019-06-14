import wrap from '../wrap';

export let handler = wrap(function(ctx, request) {
    const users = ctx.sendRequest(ctx.createGetRequest(
        'http://tyk-gateway/resource-manager/api/v1/resource_configs',
        request.Params));

    ctx.resolveUuids(users,
        {
            path: 'items.*.userId',
            url: 'http://tyk-gateway/user-manager/api/v1/users',
            result: 'users',
            errorReplaceKey: 'uuid'
        }
    );

    ctx.rename(users, 'items.*.userId', 'user');

    return ctx.createResponse(200, users);
});
