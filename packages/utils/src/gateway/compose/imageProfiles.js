import wrap from '../wrap';

export let handler = wrap(function(ctx, request) {
    const images = ctx.sendRequest(ctx.createGetRequest(
        'http://tyk-gateway/image-manager/api/v1/images',
        request.Params));

    ctx.resolveUuids(images,
        {
            path: 'data.*.users.*',
            url: 'http://tyk-gateway/user-manager/api/v1/users',
            result: 'users'
        },
        {
            path: 'data.*.ownerId',
            url: 'http://tyk-gateway/user-manager/api/v1/users',
            result: 'ownerId'
        }
    );

    return ctx.createResponse(200, images);
});
