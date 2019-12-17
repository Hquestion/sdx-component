import wrap from '../wrap';

export let handler = wrap(function(ctx, request) {
    let username = request.Params.username && request.Params.username[0];
    let isAll = request.Params.all && (request.Params.all[0] === true || request.Params.all[0] === 'true');
    let ownerId = request.Params.ownerId && request.Params.ownerId[0];
    // 非全局且ownerId传了ownerId时，为查询个人任务资源使用情况
    let ownerIds = (ownerId && !isAll) ? [ownerId] : [];
    if (username && username.trim()) {
        // 根据名称获取用户uuid
        const users = ctx.sendRequest(ctx.createGetRequest(
            'http://tyk-gateway/user-manager/api/v1/users',
            {username: [username], fullName: [username]}), true);
        const userList = users.users || [];
        if (userList.length === 0) {
            return ctx.createResponse(200, {data: [], total: 0});
        }
        ownerIds = ownerIds.concat(userList.map(item => item.uuid));
        delete request.Params.username;
    }
    const projects = ctx.sendRequest(ctx.createGetRequest(
        'http://tyk-gateway/task-manager/api/v1/tasks/resources',
        request.Params, {ownerIds: ownerIds}));

    if (!isAll) {
        ctx.resolveUuids(projects,
            {
                path: 'data.*.label',
                url: 'http://tyk-gateway/user-manager/api/v1/users',
                result: 'users',
                // 请求异常时，将id替换为errorReplaceKey;
                // 如使用data.items.*.ownerId在获取用户失败时，将会替换为data.items.*.ownerId: {[errorReplaceKey]: data.items.*.ownerId}
                errorReplaceKey: 'uuid'
            }
        );
        ctx.rename(projects, 'data.*.label', 'owner');
    }

    return ctx.createResponse(200, projects);
});
