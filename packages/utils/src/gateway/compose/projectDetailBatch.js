import wrap from '../wrap';
// import errorCode from '../errorCode';

export let handler = wrap(function(ctx, request) {
    ctx.debug('PROJECT DETAIL PARAMS ' + JSON.stringify(request.Params));
    const requests = request.Params.uuids.map(uuid => ctx.createGetRequest(`http://tyk-gateway/project-manager/api/v1/projects/${uuid}`));
    const results = ctx.sendRequests(...requests);

    // let errorRequest = [];
    let resp = {items: []};
    results.forEach(result => {
        if (result.code < 200 || result.code >= 300) {
            // errorRequest.push({
            //     code: result.code,
            //     url: result.relative_url
            // });
            resp.items.push(null);
        } else {
            let body = JSON.parse(result.body);
            resp.items.push(body.data);
        }
    });
    let respCode = 200;
    // if (errorRequest.length > 0) {
    //     respCode = errorRequest[0].code;
    //     resp = {
    //         ...errorCode.BATCH_QUERY_FAILED,
    //         data: errorRequest
    //     };
    // }

    return ctx.createResponse(respCode, resp);
});
