import wrap from '../wrap';

export const handler = wrap(function(ctx, request) {
    const jobId = request.Params.jobId[0];
    const shares = ctx.sendRequest(ctx.createGetRequest(
        `http://tyk-gateway/file-manager/api/v1/jobs/${jobId}`,
        request.Params));

    if (shares.extra && shares.extra.files) {
        ctx.resolveUuids(shares, {
            path: 'extra.files.*.ownerId',
            url: 'http://tyk-gateway/user-manager/api/v1/users',
            result: 'users',
            errorReplaceKey: 'uuid'
        });

        ctx.rename(shares, 'extra.files.*.ownerId', 'user');

        // 为保持接口结构一致，这里再次把userId修改回来
        shares.extra.files.forEach(item => item.ownerId = item.user.uuid);
    }

    return ctx.createResponse(200, shares);
});
