import wrap from '../wrap';

export let handler = wrap(function(ctx, request) {
    let name = request.Params.name && request.Params.name[0];
    let username = request.Params.username && request.Params.username[0];
    if (name && name.trim()) {
        const users = ctx.sendRequest(ctx.createGetRequest(
            'http://tyk-gateway/user-manager/api/v1/users',
            {username: [name], fullName: [name]}), true);
        const projects = ctx.sendRequest(ctx.createGetRequest(
            'http://tyk-gateway/project-manager/api/v1/projects',
            {name: [name], count: [-1]}), true);
        const userList = users.users || [];
        const projectList = projects.data && projects.data.items || [];
        request.Params.ownerOrProjectIds = [...userList.map(item => item.uuid), ...projectList.map(item => item.uuid)];
    } else if (username && username.trim()) {
        // 根据名称获取用户uuid
        const users = ctx.sendRequest(ctx.createGetRequest(
            'http://tyk-gateway/user-manager/api/v1/users',
            {username: [username], fullName: [username]}), true);
        const userList = users.users || [];
        request.Params.ownerIds = userList.map(item => item.uuid);
        delete request.Params.username;
    }
    ctx.info('[Request Params]: ' + JSON.stringify(request.Params));
    const projects = ctx.sendRequest(ctx.createGetRequest(
        'http://tyk-gateway/project-manager/api/v1/tasks',
        request.Params));

    ctx.resolveUuids(projects,
        {
            path: 'items.*.ownerId',
            url: 'http://tyk-gateway/user-manager/api/v1/users',
            result: 'users',
            // 请求异常时，将id替换为errorReplaceKey;
            // 如使用data.items.*.ownerId在获取用户失败时，将会替换为data.items.*.ownerId: {[errorReplaceKey]: data.items.*.ownerId}
            errorReplaceKey: 'uuid'
        },
        {
            path: 'items.*.projectId',
            url: 'http://tyk-gateway/fe-compose/api/v1/project-detail-batch',
            result: 'items',
            errorReplaceKey: 'uuid'
        },
        {
            paths: ['items.*.imageId', 'items.*.autoImageId'],
            url: 'http://tyk-gateway/image-manager/api/v1/images',
            result: 'data',
            errorReplaceKey: 'uuid'
        }
    );

    ctx.info('task profiles result: ' + JSON.stringify(projects));

    ctx.rename(projects, 'items.*.ownerId', 'owner');
    ctx.rename(projects, 'items.*.projectId', 'project');
    ctx.rename(projects, 'items.*.imageId', 'image');
    ctx.rename(projects, 'items.*.autoImageId', 'autoImage');

    return ctx.createResponse(200, projects);
});
