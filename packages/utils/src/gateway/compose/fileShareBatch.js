import wrap, {prefixRestApi} from '../wrap';
import errorCode from '../errorCode';

export let handler = wrap(function(ctx, request) {
    const body = JSON.parse(request.Body);
    const requests = body.paths.map((path, index) => {
        const newBody = {...body, path};
        delete newBody.paths;
        return ctx.createPostRequest(
            prefixRestApi('file-manager/api/v1/file_shares?index='+index),
            newBody
        );
    });
    const results = ctx.sendRequests(...requests);

    let errorRequest = [];
    results.forEach(result => {
        if (result.code < 200 || result.code >= 300) {
            errorRequest.push({
                code: result.code,
                result: JSON.parse(result.body),
                url: result.relative_url
            });
        }
    });
    let respCode = 200, resp = results.map(item => JSON.parse(item.body));
    if (errorRequest.length > 0) {
        respCode = errorRequest[0].code;
        resp = {
            ...errorCode.BATCH_UPDATE_FAILED,
            data: errorRequest
        };
    }

    return ctx.createResponse(respCode, resp);
});
