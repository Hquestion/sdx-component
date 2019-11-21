import wrap from '../wrap';

export let handler = wrap(function(ctx, request) {
    let username = request.Params.username && request.Params.username[0];
    let group = request.Params.group && request.Params.group[0];
    const isAll = request.Params.all && request.Params.all[0];
    let ownerIds = [];
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
    if (group) {
        const users = ctx.sendRequest(ctx.createGetRequest(
            `http://tyk-gateway/user-manager/api/v1/groups/${group}`
        ), true).users;
        if (users.length === 0) {
            return ctx.createResponse(200, {data: [], total: 0});
        }
        ownerIds = ownerIds.concat(users);
        delete request.Params.group;
    }
    // 非按创建人筛选和非查询所有时，需先查询所有任务获取taskIds
    let taskIds = [];
    if (!isAll) {
        const userProjects = ctx.sendRequest(ctx.createGetRequest(
            'http://tyk-api-gateway/project-manager/api/v1/projects', {
                start: 1,
                count: -1
            }
        ), true).data.items;
        userProjects.forEach(item => {
            if (item.tasks && item.tasks.length > 0) {
                taskIds = taskIds.concat(item.tasks);
            }
        });
    }

    ctx.info('[TaskExecutionsProfiles Request Body]: ' + JSON.stringify({ownerIds, taskIds}));
    const projects = ctx.sendRequest(ctx.createGetRequest(
        'http://tyk-gateway/task-manager/api/v1/executions',
        request.Params, {
            ownerIds,
            taskIds
        }));

    ctx.resolveUuids(projects,
        {
            path: 'data.*.ownerId',
            url: 'http://tyk-gateway/user-manager/api/v1/users',
            result: 'users',
            // 请求异常时，将id替换为errorReplaceKey;
            // 如使用data.items.*.ownerId在获取用户失败时，将会替换为data.items.*.ownerId: {[errorReplaceKey]: data.items.*.ownerId}
            errorReplaceKey: 'uuid'
        }
    );

    ctx.resolveUuids(projects,
        {
            path: 'data.*.ownerId.groups.*',
            url: 'http://tyk-gateway/user-manager/api/v1/groups',
            result: 'groups',
            // 请求异常时，将id替换为errorReplaceKey;
            // 如使用data.items.*.ownerId在获取用户失败时，将会替换为data.items.*.ownerId: {[errorReplaceKey]: data.items.*.ownerId}
            // errorReplaceKey: 'uuid'
        }
    );

    ctx.info('task executions profiles result: ' + JSON.stringify(projects));

    ctx.rename(projects, 'data.*.ownerId', 'owner');

    return ctx.createResponse(200, projects);
});
