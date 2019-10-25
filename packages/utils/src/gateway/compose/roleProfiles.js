import wrap from '../wrap';

export let handler = wrap(function(ctx, request) {
    const roles = ctx.sendRequest(ctx.createGetRequest(
        'http://tyk-gateway/user-manager/api/v1/roles',
        request.Params));

    ctx.resolveUuids(roles,
        {
            path: 'roles.*.permissions.*',
            url: 'http://tyk-gateway/user-manager/api/v1/permissions/list',
            result: 'permissions',
            method: 'POST'
        }
    );

    return ctx.createResponse(200, roles);
});
