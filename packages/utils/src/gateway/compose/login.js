import { createRequest, createResponse, init, rename, resolveUuids, sendRequest } from '../utils/request';
import '@babel/polyfill';

/* Acquire an OAuth2 token, retrieve the logged-in user, and resolve the roles, groups and permissions of that user.
   Examples:
     POST /fe-compose/api/v1/login {"grantType": "password", "username": "xiaolei", "password": "123456"}
 */
export function handler(request, session) {
    init(request);

    // Acquire OAuth2 token
    let body = JSON.parse(request.Body);
    let authResponse = sendRequest(createRequest(
        request,
        'POST',
        'http://tyk-gateway/user-manager/api/v1/tokens',
        body));
    if (authResponse.code < 200 || authResponse.code >= 400) {
        return createResponse(request, session, authResponse.code, authResponse.body);
    }
    let authToken = JSON.parse(authResponse.body);

    // Resolve user entity
    resolveUuids(request, authToken,
        {
            path: 'uuid',
            url: 'http://tyk-gateway/user-manager/api/v1/users',
            result: 'users'
        }
    );
    rename(authToken, 'uuid', 'user');

    // Resolve roles, groups and permissions in user
    resolveUuids(request, authToken,
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

    return createResponse(request, session, 200, authToken);
}
