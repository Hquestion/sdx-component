import wrap, {prefixRestApi} from '../wrap';

export const handler = wrap(function(ctx, request) {
    const shares = ctx.sendRequest(ctx.createGetRequest(
        prefixRestApi('file-manager/api/v1/file_shares'),
        request.Params));

    let isMyShare = request.Params.ownerId && !!request.Params.ownerId[0];
    let isAcceptedShare =  request.Params.userId && !!request.Params.userId[0];
    let result;
    if (isMyShare) {
        const requests = shares.shares.map(item => ctx.createGetRequest(
            'http://tyk-gateway/file-manager/api/v1/files',
            {ownerId: [item.ownerId], path: [item.path]}
        ));
        result = ctx.sendRequests(...requests);
    } else if(isAcceptedShare) {
        // 暂时先同样处理，性能较差
        const requests = shares.shares.map(item => ctx.createGetRequest(
            'http://tyk-gateway/file-manager/api/v1/files',
            {ownerId: [item.ownerId], path: [item.path]}
        ));
        result = ctx.sendRequests(...requests);
    }

    let response = {children: [], childrenCount: shares.total};
    result.forEach(item => {
        if(item.code < 200 || item.code >= 300) {
            // response.children.push(null);
        } else {
            let body = JSON.parse(item.body);
            response.children.push(body);
        }
    });

    ctx.resolveUuids(response, {
        path: 'children.*.ownerId',
        url: 'http://tyk-gateway/user-manager/api/v1/users',
        result: 'users',
        errorReplaceKey: 'uuid'
    });

    ctx.rename(response, 'children.*.ownerId', 'user');

    // 为保持接口结构一致，这里再次把userId修改回来
    response.children.forEach(item => item.ownerId = item.user.uuid);

    return ctx.createResponse(200, response);

});
