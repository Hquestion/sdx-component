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
        }
    );

    ctx.resolveUuids(user, {
        paths: [
            'permissions.*',
            'groups.*.permissions.*',
            'groups.*.roles.*.permissions.*',
            'roles.*.permissions.*',
        ],
        url: 'http://tyk-gateway/user-manager/api/v1/permissions/list',
        result: 'permissions',
        method: 'POST'
    });

    return ctx.createResponse(200, user);
});
