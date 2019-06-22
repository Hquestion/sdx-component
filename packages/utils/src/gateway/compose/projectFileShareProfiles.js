import wrap from '../wrap';

export const handler = wrap(function(ctx, request) {
    const shares = ctx.sendRequest(ctx.createGetRequest(
        'http://tyk-gateway/project-manager/api/v1/projects',
        {...request.Params, type: ['public']}));

    let result;
    ctx.info('file share start result: ' + JSON.stringify(shares));
    const requests = shares.data.items.map(item => ctx.createGetRequest(
        'http://tyk-gateway/file-manager/api/v1/files',
        {userId: [item.uuid], path: ['/']}
    ));
    ctx.info('file share requests: ' + JSON.stringify(requests));
    result = ctx.sendRequests(...requests);

    ctx.info('file share result: ' + JSON.stringify(result));

    let response = {children: [], childrenCount: shares.data.total};
    result.forEach(item => {
        if(item.code < 200 || item.code >= 300) {
            response.children.push(null);
        } else {
            let body = JSON.parse(item.body);
            response.children.push(body);
        }
    });

    return ctx.createResponse(200, response);

});
