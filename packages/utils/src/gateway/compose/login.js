import wrap from '../wrap';
import { AUTHORIZATION_HEADER, CONTENT_TYPE_APPLICATION_JSON, CONTENT_TYPE_HEADER } from '../wrap';

/* Acquire an OAuth2 token, retrieve the logged-in user, and resolve the roles, groups and permissions of that user.
   Examples:
     POST /fe-compose/api/v1/login {"grantType": "password", "username": "xiaolei", "password": "123456"}
 */
export let handler = wrap(function(ctx, request) {
    // Acquire OAuth2 token
    const authToken = ctx.sendRequest(ctx.createPostRequest(
        'http://tyk-gateway/user-manager/api/v1/tokens',
        JSON.parse(request.Body)));

    // Set Authorization headers in request after token created
    request.Headers = request.Headers || {};
    request.Headers[AUTHORIZATION_HEADER] = [`${authToken.tokenType} ${authToken.accessToken}`];
    request.Headers[CONTENT_TYPE_HEADER] = [CONTENT_TYPE_APPLICATION_JSON];

    // Resolve user entity
    ctx.resolveUuids(authToken,
        {
            path: 'uuid',
            url: 'http://tyk-gateway/user-manager/api/v1/users',
            result: 'users',
            errorReplaceKey: 'uuid'
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
    );

    ctx.resolveUuids(authToken,
        {
            path: 'user.groups.*.roles.*',
            url: 'http://tyk-gateway/user-manager/api/v1/roles',
            result: 'roles'
        },
    );

    ctx.resolveUuids(authToken, {
        paths: [
            'user.permissions.*',
            'user.groups.*.permissions.*',
            'user.groups.*.roles.*.permissions.*',
            'user.roles.*.permissions.*',
        ],
        url: 'http://tyk-gateway/user-manager/api/v1/permissions',
        result: 'permissions'
    });

    return ctx.createResponse(200, authToken);
});
