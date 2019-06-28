import wrap from '../wrap';

export const handler = wrap(function(ctx, request) {
    const shares = ctx.sendRequest(ctx.createGetRequest(
        'http://tyk-gateway/file-manager/api/v1/file_shares',
        request.Params));

    let isMyShare = request.Params.ownerId && !!request.Params.ownerId[0];
    let isAcceptedShare =  request.Params.userId && !!request.Params.userId[0];
    let result;
    ctx.info('file share start result: ' + JSON.stringify(shares));
    if (isMyShare) {
        const requests = shares.shares.map(item => ctx.createGetRequest(
            'http://tyk-gateway/file-manager/api/v1/files',
            {userId: [item.ownerId], path: [item.path]}
        ));
        ctx.info('file share requests: ' + JSON.stringify(requests));
        result = ctx.sendRequests(...requests);
    } else {
        // 暂时先同样处理，性能较差
        const requests = shares.shares.map(item => ctx.createGetRequest(
            'http://tyk-gateway/file-manager/api/v1/files',
            {userId: [item.ownerId], path: [item.path]}
        ));
        result = ctx.sendRequests(...requests);
    }

    ctx.info('file share result: ' + JSON.stringify(result));

    let response = {children: [], childrenCount: shares.total};
    result.forEach(item => {
        if(item.code < 200 || item.code >= 300) {
            response.children.push(null);
        } else {
            let body = JSON.parse(item.body);
            response.children.push(body);
        }
    });

    ctx.resolveUuids(response, {
        path: 'children.*.userId',
        url: 'http://tyk-gateway/user-manager/api/v1/users',
        result: 'users'
    });

    ctx.rename(response, 'children.*.userId', 'user');

    // 为保持接口结构一致，这里再次把userId修改回来
    response.children.forEach(item => item.userId = item.user.uuid);

    return ctx.createResponse(200, response);

});
