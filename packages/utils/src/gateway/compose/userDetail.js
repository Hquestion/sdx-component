import wrap from '../wrap';

export let handler = wrap(function(ctx, request) {
    const user = ctx.sendRequest(ctx.createGetRequest(
        `http://tyk-gateway/user-manager/api/v1/users/${request.Params.uuid && request.Params.uuid[0]}`,
        request.Params));

    ctx.resolveUuids(user,
        {
            path: 'roles.*',
            url: 'http://tyk-gateway/user-manager/api/v1/roles',
            result: 'roles'
        },
        {
            path: 'groups.*',
            url: 'http://tyk-gateway/user-manager/api/v1/groups',
            result: 'groups'
        },
        {
            path: 'permissions.*',
            url: 'http://tyk-gateway/user-manager/api/v1/permissions',
            result: 'permissions'
        }
    );

    return ctx.createResponse(200, user);
});