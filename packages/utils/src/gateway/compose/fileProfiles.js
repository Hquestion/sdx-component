import wrap from '../wrap';

export const handler = wrap(function(ctx, request) {
    const files = ctx.sendRequest(ctx.createGetRequest(
        'http://tyk-gateway/file-manager/api/v1/files',
        request.Params));

    const extensions = request.Params.fileExtensions;
    if (extensions && extensions.length > 0) {
        const newParams = {
            ...request.Params,
            onlyDirectory: [1],
            onlyFile: [0]
        };
        delete newParams.fileExtensions;
        const folders = ctx.sendRequest(ctx.createGetRequest(
            'http://tyk-gateway/file-manager/api/v1/files',
            newParams));
        files.children = folders.children.concat(files.children);
    }

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
