import wrap from '../wrap';

export let handler = wrap(function(ctx, request) {
    const uuid = request.Params.uuid && request.Params.uuid[0];
    delete request.Params.uuid;
    ctx.debug('[TaskDetail] request params:' + JSON.stringify(request.Params));
    const task = ctx.sendRequest(ctx.createGetRequest(
        `http://tyk-gateway/task-manager/api/v1/tasks/${uuid}`,
        request.Params));

    ctx.resolveUuids(task,
        {
            path: 'ownerId',
            url: 'http://tyk-gateway/user-manager/api/v1/users',
            result: 'users',
            // 请求异常时，将id替换为errorReplaceKey;
            // 如使用data.items.*.ownerId在获取用户失败时，将会替换为data.items.*.ownerId: {[errorReplaceKey]: data.items.*.ownerId}
            errorReplaceKey: 'uuid'
        },
        {
            path: 'imageId',
            url: 'http://tyk-gateway/image-manager/api/v1/images',
            result: 'data',
            errorReplaceKey: 'uuid'
        },
        {
            path: 'datasets.*',
            url: 'http://tyk-gateway/data-manager/api/v1/dataset',
            result: 'data.items',
            errorReplaceKey: 'uuid',
            resultIdKey: 'dataset'
        },
        {
            path: 'datasources.*',
            url: 'http://tyk-gateway/data-manager/api/v1/datasource',
            result: 'data.items',
            errorReplaceKey: 'uuid',
            resultIdKey: 'datasource_id'
        }
    );

    ctx.rename(task, 'ownerId', 'owner');
    ctx.rename(task, 'imageId', 'image');

    return ctx.createResponse(200, task);
});
