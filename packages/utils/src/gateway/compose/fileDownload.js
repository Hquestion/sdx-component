/* global TykBatchRequest, TykJsResponse, log, rawlog */
import wrap from '../wrap';

export let handler = (request, session, config) => {
    const cookie = request.Headers.Cookie + '';
    const token = cookie.replace(/(.*)token=(.*);?/, '$2');

    let paramsStr = '';
    Object.entries(request.Params).forEach(([key, val]) => {
        paramsStr += paramsStr === '' ? '?' : '&';
        paramsStr += `${key}=${val[0]}`;
    });

    const req = {
        method: 'GET',
        relative_url: `http://tyk-gateway/file-manager/api/v1/files/download${paramsStr}`,
        headers: {
            authorization: token
        }
    };

    const batch = {
        'requests': [req],
        'suppress_parallel_execution': true
    };

    const response = JSON.parse(TykBatchRequest(JSON.stringify(batch)))[0];


    return TykJsResponse({
        Code: 200,
        Body: response.body,
        Headers: response.headers
    }, session.meta_data);
};
