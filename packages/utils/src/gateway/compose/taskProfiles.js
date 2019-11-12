import wrap from '../wrap';

export let handler = wrap(function(ctx, request) {
    let username = request.Params.username && request.Params.username[0];
    let group = request.Params.group && request.Params.group[0];
    if (username && username.trim()) {
        // 根据名称获取用户uuid
        const users = ctx.sendRequest(ctx.createGetRequest(
            'http://tyk-gateway/user-manager/api/v1/users',
            {username: [username], fullName: [username]}), true);
        const userList = users.users || [];
        request.Body.ownerIds = userList.map(item => item.uuid);
        delete request.Params.username;
    }
    if (group) {
        const users = ctx.sendRequest(ctx.createGetRequest(
            `http://tyk-gateway/user-manager/api/v1/groups/${group}`
        ), true).users;
        ctx.debug('[taskProfiles]: Query Group Users' + JSON.stringify(users));
        request.Body.ownerIds = (request.Body.ownerIds || []).concat(users.map(item => item.uuid));
        delete request.Params.group;
    }
    ctx.info('[TaskProfiles Request Params]: ' + JSON.stringify(request.Params));
    ctx.info('[TaskProfiles Request Body]: ' + JSON.stringify(request.Body));
    const projects = ctx.sendRequest(ctx.createGetRequest(
        'http://tyk-gateway/project-manager/api/v1/tasks',
        request.Params, request.Body));

    ctx.resolveUuids(projects,
        {
            path: 'items.*.ownerId',
            url: 'http://tyk-gateway/user-manager/api/v1/users',
            result: 'users',
            // 请求异常时，将id替换为errorReplaceKey;
            // 如使用data.items.*.ownerId在获取用户失败时，将会替换为data.items.*.ownerId: {[errorReplaceKey]: data.items.*.ownerId}
            errorReplaceKey: 'uuid'
        }
    );

    ctx.info('task profiles result: ' + JSON.stringify(projects));

    ctx.rename(projects, 'items.*.ownerId', 'owner');

    return ctx.createResponse(200, projects);
});
