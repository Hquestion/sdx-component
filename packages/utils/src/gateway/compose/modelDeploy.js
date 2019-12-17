import wrap from '../wrap';

export let handler = wrap(function(ctx, request) {
    const params = JSON.parse(request.Body);
    let modelId = params.modelId && params.modelId,
        versionId;
    if (!modelId) {
        // 没有模型需要先创建模型，获取模型的uuid
        const model = ctx.sendRequest(ctx.createPostRequest(
            'http://tyk-gateway/model-manager/api/v1/models',
            {name: params.modelName}
        ));
        modelId = model.uuid;
    }

    // 创建模型版本
    const version = ctx.sendRequest(ctx.createPostRequest(
        `http://tyk-gateway/model-manager/api/v1/models/${modelId}/versions`,
        {
            name: params.versionName,
            description: params.description,
            modelPath: params.modelPath,
            runtimeImage: params.runtimeImage,
            framework: params.framework,
            runtimeResource: params.runtimeResource
        }
    ));

    versionId = version.uuid;

    // 部署模型
    const resp = ctx.sendRequest(ctx.createPostRequest(
        `http://tyk-gateway/model-manager/api/v1/models/${modelId}/versions/${versionId}/start`
    ));

    return ctx.createResponse(200, resp);
});
