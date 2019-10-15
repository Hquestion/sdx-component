import wrap from '../wrap';
import errorCode from '../errorCode';

export let handler = wrap(function(ctx, request) {
    const body = JSON.parse(request.Body);
    const requests = body.uuids.map(uuid => ctx.createPatchRequest(`http://tyk-gateway/image-manager/api/v1/images/${uuid}`, body.setting));
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
            ...errorCode.BATCH_UPDATE_FAILED,
            data: errorRequest
        };
    }

    return ctx.createResponse(respCode, resp);
});
