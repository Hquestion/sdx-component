import wrap from '../wrap';

export let handler = wrap(function(ctx, request) {
    const data = ctx.sendRequests(
        ctx.createGetRequest(
            'http://tyk-gateway/system-manager/api/v1/resources',
            request.Params
        ),
        ctx.createGetRequest(
            'http://tyk-gateway/resource-manager/api/v1/resource_templates?start=1&count=-1'
        ),
        ctx.createGetRequest(
            'http://tyk-gateway/resource-manager/api/v1/resource_config', {
                userId: request.Params.userId && request.Params.userId[0]
            }
        ),
        ctx.createGetRequest(
            'http://tyk-gateway/fe-compose/api/v1/task-resource-profiles',
            {all: true}
        ),
    );
    return ctx.createResponse(200, data.map(item => JSON.parse(item.body) || {}));
});
