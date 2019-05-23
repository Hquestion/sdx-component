/* eslint-disable */
import { create, rebuildRequestParams } from '../createRequest';
import Response from '../Response';
import '@babel/polyfill';

export function groupProfiles(request, session, config) {
    const authorization = request.Headers.authorization;
    // const { username, fullName, uuids, groups, roles, permissions, isActive, expiresAt, start, count } = request.Params;
    log('[start batch userlist] ' + JSON.stringify(request.Params));
    const requestParams = rebuildRequestParams(request.Params);
    var batch = {
        'requests': [
            create('GET', authorization, 'http://tyk-gateway/user-manager/api/v1/groups/', {...requestParams})
        ],
        'suppress_parallel_execution': false
    };
    log('[list batch] ' + JSON.stringify(batch));
    var simpleList = TykBatchRequest(JSON.stringify(batch));

    log('[userList batch result no parse] ' + simpleList);

    simpleList = JSON.parse(JSON.parse(simpleList)[0].body);

    log('[userList batch] ' + JSON.stringify(simpleList));

    // 获取列表中所有的group uuid/ role uuid /permission uuid，并且去重
    const userIds = new Set();
    const roleIds = new Set();
    const permissionIds = new Set();

    simpleList.groups.forEach(group => {
        group.users.forEach(user => {
            userIds.add(user);
        });
        group.roles.forEach(role => {
            roleIds.add(role);
        });
        group.permissions.forEach(permission => {
            permissionIds.add(permission);
        });
    });

    log('【user meta set created!】 ');

    const userIdList = [...userIds], roleIdList = [...roleIds], permissionIdList = [...permissionIds];

    // 请求顺序映射，为了在获取响应时对响应进行排序，以确保与请求顺序一致
    const requestOrderMap = {
        'http://tyk-gateway/user-manager/api/v1/roles/': 0,
        'http://tyk-gateway/user-manager/api/v1/users/': 1,
        'http://tyk-gateway/user-manager/api/v1/permissions/': 2,
    };

    var batchMeta = {
        'requests': [
            create('GET', authorization, 'http://tyk-gateway/user-manager/api/v1/roles/', {uuids: roleIdList }),
            create('GET', authorization, 'http://tyk-gateway/user-manager/api/v1/users/', {uuids: userIdList }),
            create('GET', authorization, 'http://tyk-gateway/user-manager/api/v1/permissions/', {uuids: permissionIdList })
        ],
        'suppress_parallel_execution': true
    };

    log('【start batch meta!】 ' + JSON.stringify(batchMeta));

    var userMetadatas = TykBatchRequest(JSON.stringify(batchMeta));

    // We know that the requests return JSON in their body, lets flatten it
    var metaList = JSON.parse(userMetadatas);
    // 根据之前建立的映射表，对响应进行排序
    metaList.sort((a, b) => requestOrderMap[a.relative_url] - requestOrderMap[b.relative_url]);

    log('【end batch meta!】 ' + JSON.stringify(metaList, null, 4));

    const userInfoMap = {}, roleInfoMap = {}, permissionMap = {};
    var idOrder = [roleIdList, userIdList, permissionIds];
    var mapOrder = [roleInfoMap, userInfoMap, permissionMap];
    var bodyKeyOrder = ['roles', 'users', 'permissions'];

    // 将用户组/角色/权限的详细信息与UUID建立映射字典表，方便后面匹配
    metaList.forEach((item, index1) => {
        var result = JSON.parse(item.body);
        idOrder[index1].forEach((roleId, index2) => {
            mapOrder[index1][roleId] = result[bodyKeyOrder[index1]][index2];
        });
    });

    log('【group map build finished!】 ' + JSON.stringify(mapOrder));
    log('【原始群組列表】 ' + JSON.stringify(simpleList));

    // 遍历列表，根据之前建立的映射表，匹配详细信息并替换掉之前的UUID列表
    simpleList.groups.forEach(item => {
        item.roles = item.roles.map(role => roleInfoMap[role]);
        item.users = item.users.map(user => userInfoMap[user]);
        item.permissions = item.permissions.map(permission => permissionMap[permission]);
    });

    // We need to send a string object back to Tyk to embed in the response

    // 返回聚合之后的响应
    return TykJsResponse(new Response(200, simpleList), session.meta_data);
}
