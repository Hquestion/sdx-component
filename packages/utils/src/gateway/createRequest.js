export function create(method, token, relativePath, params) {
    const req = {
        method,
        headers: {
            authorization: token
        },
        relative_url: relativePath,
        body: JSON.stringify(params)
    };
    if (method === 'GET') {
        req.params = params;
    } else {
        req.body = params;
    }
    return req;
}

export function rebuildRequestParams(params) {
    const newParams = {};
    for(var obj in params) {
        if (typeof params[obj] === 'object' && params[obj] instanceof Array) {
            newParams[obj] = params[obj][0];
        }
    }
    return newParams;
}
