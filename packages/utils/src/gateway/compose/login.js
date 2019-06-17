import wrap from '../wrap';

/* Acquire an OAuth2 token, retrieve the logged-in user, and resolve the roles, groups and permissions of that user.
   Examples:
     POST /fe-compose/api/v1/login {"grantType": "password", "username": "xiaolei", "password": "123456"}
 */
export let handler = wrap(function(ctx, request) {
    // Acquire OAuth2 token
    const authToken = ctx.sendRequest(ctx.createPostRequest(
        'http://tyk-gateway/user-manager/api/v1/tokens',
        JSON.parse(request.Body)));

    // Resolve user entity
    ctx.resolveUuids(authToken,
        {
            path: 'uuid',
            url: 'http://tyk-gateway/user-manager/api/v1/users',
            result: 'users'
        }
    );
    ctx.rename(authToken, 'uuid', 'user');

    // Resolve roles, groups and permissions in user
    ctx.resolveUuids(authToken,
        {
            path: 'user.roles.*',
            url: 'http://tyk-gateway/user-manager/api/v1/roles',
            result: 'roles'
        },
        {
            path: 'user.groups.*',
            url: 'http://tyk-gateway/user-manager/api/v1/groups',
            result: 'groups'
        },
        {
            path: 'user.permissions.*',
            url: 'http://tyk-gateway/user-manager/api/v1/permissions',
            result: 'permissions'
        }
    );

    const permissionIds = new Set();
    authToken.user.permissions.forEach(permission => permissionIds.add(permission.uuid));
    authToken.user.roles.forEach(role => {
        role.permissions.forEach(permission => permissionIds.add(permission));
    });
    authToken.user.groups.forEach(group => {
        group.permissions.forEach(permission => permissionIds.add(permission));
    });

    ctx.info('all permission uuids:' + JSON.stringify([...permissionIds]));
    const allPermissions = ctx.sendRequest(ctx.createGetRequest('http://tyk-gateway/user-manager/api/v1/permissions', {uuids: [...permissionIds]}));

    authToken.user.allPermissions = allPermissions.permissions;

    return ctx.createResponse(200, authToken);
});
