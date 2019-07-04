import wrap from '../wrap';

export const handler = wrap(function(ctx, request) {
    const files = ctx.sendRequest(ctx.createGetRequest(
        'http://tyk-gateway/file-manager/api/v1/files',
        request.Params));

    ctx.resolveUuids(files, {
        path: 'children.*.ownerId',
        url: 'http://tyk-gateway/user-manager/api/v1/users',
        result: 'users',
        errorReplaceKey: 'uuid'
    });

    ctx.rename(files, 'children.*.ownerId', 'user');

    files.children.forEach(item => item.ownerId = item.user.uuid);

    return ctx.createResponse(200, files);
});
