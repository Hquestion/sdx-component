import wrap from '../wrap';
import errorCode from '../errorCode';

export let handler = wrap(function(ctx, request) {
    ctx.debug('MODEL DELETE PARAMS ' + JSON.stringify(request.Params));
    const requests = request.Params.uuids.map(uuid => ctx.createDeleteRequest(`http://tyk-gateway/model-manager/api/v1/models/${uuid}`));
    const results = ctx.sendRequests(...requests);

    let errorRequest = [];
    results.forEach(result => {
        if (result.code < 200 || result.code >= 300) {
            errorRequest.push({
                code: result.code,
                url: result.relative_url
            });
        }
    });
    let respCode = 200, resp = {};
    if (errorRequest.length > 0) {
        respCode = errorRequest[0].code;
        resp = {
            ...errorCode.BATCH_DELETE_FAILED,
            data: errorRequest
        };
    }

    return ctx.createResponse(respCode, resp);
});
