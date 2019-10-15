import wrap from '../wrap';

/* Get a list of groups, and resolve the users, roles and permissions of each group.
   Examples:
     GET /fe-compose/api/v1/group-profiles
     GET /fe-compose/api/v1/group-profiles?uuids=03df4f25-ee7d-4774-af9a-5fa499872dfd
     GET /fe-compose/api/v1/group-profiles?uuids=03df4f25-ee7d-4774-af9a-5fa499872dfd&uuids=09144bcc-6e28-44d1-9491-ac7aebaafae4
 */
export let handler = wrap(function(ctx, request) {
    const groups = ctx.sendRequest(ctx.createGetRequest(
        'http://tyk-gateway/user-manager/api/v1/groups',
        request.Params));

    ctx.resolveUuids(groups,
        {
            path: 'groups.*.users.*',
            url: 'http://tyk-gateway/user-manager/api/v1/users',
            result: 'users'
        },
        {
            path: 'groups.*.roles.*',
            url: 'http://tyk-gateway/user-manager/api/v1/roles',
            result: 'roles'
        },
        {
            path: 'groups.*.permissions.*',
            url: 'http://tyk-gateway/user-manager/api/v1/permissions/list',
            result: 'permissions',
            method: 'POST'
        }
    );

    return ctx.createResponse(200, groups);
});
