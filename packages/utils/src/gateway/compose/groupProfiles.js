import { createRequest, createResponse, init, sendRequest, resolveUuids } from '../utils/request';
import '@babel/polyfill';

/* Get a list of groups, and resolve the users, roles and permissions of each group.
   Examples:
     GET /fe-compose/api/v1/group-profiles
     GET /fe-compose/api/v1/group-profiles?uuids=03df4f25-ee7d-4774-af9a-5fa499872dfd
     GET /fe-compose/api/v1/group-profiles?uuids=03df4f25-ee7d-4774-af9a-5fa499872dfd&uuids=09144bcc-6e28-44d1-9491-ac7aebaafae4
 */
export function handler(request, session) {
    init(request);

    let simpleList = sendRequest(createRequest(
        request,
        'GET',
        'http://tyk-gateway/user-manager/api/v1/groups',
        request.Params));
    if (simpleList.code < 200 || simpleList.code >= 400) {
        return createResponse(request, session, simpleList.code, simpleList.body);
    }
    let groups = JSON.parse(simpleList.body).groups;

    resolveUuids(request, groups,
        {
            path: '*.users.*',
            url: 'http://tyk-gateway/user-manager/api/v1/users',
            result: 'users'
        },
        {
            path: '*.roles.*',
            url: 'http://tyk-gateway/user-manager/api/v1/roles',
            result: 'roles'
        },
        {
            path: '*.permissions.*',
            url: 'http://tyk-gateway/user-manager/api/v1/permissions',
            result: 'permissions'
        }
    );

    return createResponse(request, session, 200, groups);
}
