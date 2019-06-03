import { createRequest, createResponse, init, sendRequest, resolveUuids } from '../utils/request';
import '@babel/polyfill';

/* Get a list of users, and resolve the roles, groups and permissions of each user.
   Examples:
     GET /fe-compose/api/v1/user-profiles
     GET /fe-compose/api/v1/user-profiles?uuids=0021499d-8c7c-43b9-920b-8da58035b51f
     GET /fe-compose/api/v1/user-profiles?uuids=0021499d-8c7c-43b9-920b-8da58035b51f&uuids=011a2d63-d435-4053-bedf-192bdbc7e6ad
 */
export function handler(request, session) {
    init(request);

    let simpleList = sendRequest(createRequest(
        request,
        'GET',
        'http://tyk-gateway/user-manager/api/v1/users',
        request.Params));
    if (simpleList.code < 200 || simpleList.code >= 400) {
        return createResponse(request, session, simpleList.code, simpleList.body);
    }
    let users = JSON.parse(simpleList.body).users;

    resolveUuids(request, users,
        {
            path: '*.roles.*',
            url: 'http://tyk-gateway/user-manager/api/v1/roles',
            result: 'roles'
        },
        {
            path: '*.groups.*',
            url: 'http://tyk-gateway/user-manager/api/v1/groups',
            result: 'groups'
        },
        {
            path: '*.permissions.*',
            url: 'http://tyk-gateway/user-manager/api/v1/permissions',
            result: 'permissions'
        }
    );

    return createResponse(request, session, 200, users);
}
