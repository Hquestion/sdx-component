import wrap from '../wrap';

/* Get a list of users, and resolve the roles, groups and permissions of each user.
   Examples:
     GET /fe-compose/api/v1/user-profiles
     GET /fe-compose/api/v1/user-profiles?uuids=0021499d-8c7c-43b9-920b-8da58035b51f
     GET /fe-compose/api/v1/user-profiles?uuids=0021499d-8c7c-43b9-920b-8da58035b51f&uuids=011a2d63-d435-4053-bedf-192bdbc7e6ad
 */
export let handler = wrap(function(ctx, request) {
    const users = ctx.sendRequest(ctx.createGetRequest(
        'http://tyk-gateway/user-manager/api/v1/users',
        request.Params));

    ctx.resolveUuids(users,
        {
            path: 'users.*.roles.*',
            url: 'http://tyk-gateway/user-manager/api/v1/roles',
            result: 'roles'
        },
        {
            path: 'users.*.groups.*',
            url: 'http://tyk-gateway/user-manager/api/v1/groups',
            result: 'groups'
        },
        {
            path: 'users.*.permissions.*',
            url: 'http://tyk-gateway/user-manager/api/v1/permissions/list',
            result: 'permissions',
            method: 'POST'
        }
    );

    return ctx.createResponse(200, users);
});
