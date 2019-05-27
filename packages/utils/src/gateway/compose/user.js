/* eslint-disable */
import { create, rebuildRequestParams } from '../createRequest';
import Response from '../Response';
import '@babel/polyfill';

export function userProfiles(request, session, config) {
    const authorization = request.Headers.authorization;
    // const { username, fullName, uuids, groups, roles, permissions, isActive, expiresAt, start, count } = request.Params;
    log('[start batch userlist] ' + JSON.stringify(request.Params));
    const requestParams = rebuildRequestParams(request.Params);
    var batch = {
        'requests': [
            create('GET', authorization, 'http://tyk-gateway/user-manager/api/v1/users/', {...requestParams})
        ],
        'suppress_parallel_execution': false
    };
    log('[list batch] ' + JSON.stringify(batch));
    var simpleUserListBatch = TykBatchRequest(JSON.stringify(batch));

    log('[userList batch result no parse] ' + simpleUserList);

    var simpleUserList = simpleUserListBatch[0];

    if (simpleUserList.code < 200 || simpleUserList.code >= 400) {
        // 请求失败，将body信息作为响应返回
        return TykJsResponse(new Response(simpleUserList.code, simpleUserList.body), session.meta_data);
    }

    simpleUserList = JSON.parse(JSON.parse(simpleUserList)[0].body);

    log('[userList batch] ' + JSON.stringify(simpleUserList));

    // 获取列表中所有的group uuid/ role uuid /permission uuid，并且去重
    const groupIds = new Set();
    const roleIds = new Set();
    const permissionIds = new Set();

    simpleUserList.users.forEach(user => {
        user.groups.forEach(group => {
            groupIds.add(group);
        });
        user.roles.forEach(role => {
            roleIds.add(role);
        });
        user.permissions.forEach(permission => {
            permissionIds.add(permission);
        });
    });

    log('【user meta set created!】 ');

    const groupIdList = [...groupIds], roleIdList = [...roleIds], permissionIdList = [...permissionIds];

    // 请求顺序映射，为了在获取响应时对响应进行排序，以确保与请求顺序一致
    const requestOrderMap = {
        'http://tyk-gateway/user-manager/api/v1/roles/': 0,
        'http://tyk-gateway/user-manager/api/v1/groups/': 1,
        'http://tyk-gateway/user-manager/api/v1/permissions/': 2,
    };

    var batchMeta = {
        'requests': [
            create('GET', authorization, 'http://tyk-gateway/user-manager/api/v1/roles/', {uuids: roleIdList }),
            create('GET', authorization, 'http://tyk-gateway/user-manager/api/v1/groups/', {uuids: groupIdList }),
            create('GET', authorization, 'http://tyk-gateway/user-manager/api/v1/permissions/', {uuids: permissionIdList })
        ],
        'suppress_parallel_execution': false
    };

    log('【start batch meta!】 ' + JSON.stringify(batchMeta));

    var userMetadatas = TykBatchRequest(JSON.stringify(batchMeta));

    // We know that the requests return JSON in their body, lets flatten it
    var metaList = JSON.parse(userMetadatas);
    // 根据之前建立的映射表，对响应进行排序
    metaList.sort((a, b) => requestOrderMap[a.relative_url] - requestOrderMap[b.relative_url]);

    log('【end batch meta!】 ' + JSON.stringify(metaList, null, 4));

    const groupInfoMap = {}, roleInfoMap = {}, permissionMap = {};
    var idOrder = [roleIdList, groupIdList, permissionIds];
    var mapOrder = [roleInfoMap, groupInfoMap, permissionMap];
    var bodyKeyOrder = ['roles', 'groups', 'permissions'];

    // 将用户组/角色/权限的详细信息与UUID建立映射字典表，方便后面匹配
    metaList.forEach((item, index1) => {
        var result = [];
        if (item.code >= 200 && item.code < 400) {
            result = JSON.parse(item.body);
        }
        idOrder[index1].forEach((roleId, index2) => {
            mapOrder[index1][roleId] = result[bodyKeyOrder[index1]] && result[bodyKeyOrder[index1]][index2];
        });
    });

    log('【map build finished!】 ' + JSON.stringify(mapOrder));

    // 遍历列表，根据之前建立的映射表，匹配详细信息并替换掉之前的UUID列表
    simpleUserList.users.forEach(item => {
        item.roles = item.roles.map(role => roleInfoMap[role] || {uuid: role});
        item.groups = item.groups.map(group => groupInfoMap[group] || {uuid: group});
        item.permissions = item.permissions.map(permission => permissionMap[permission] || {uuid: permission});
    });

    // We need to send a string object back to Tyk to embed in the response

    // 返回聚合之后的响应
    return TykJsResponse(new Response(200, simpleUserList), session.meta_data);
}
