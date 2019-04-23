import axios from './api';
import {setErrorHandler} from './api';
import qs from 'qs';


function get (url, params, config) {
    if (!url) return;
    return axios({
        method: 'get',
        url,
        params,
        ...config
    });
}

function post (url, data, config) {
    if (!url) return;
    return axios({
        method: 'post',
        url,
        data: qs.stringify(data),
        ...config
    });
}

function put (url, data, config) {
    if (!url) return;
    return axios({
        method: 'put',
        url,
        data: qs.stringify(data),
        ...config
    });
}

function remove (url, data, config) {
    if (!url) return;
    return axios({
        method: 'delete',
        url,
        data: qs.stringify(data),
        ...config
    });
}

function registerErrorHandler (handler) {
    setErrorHandler(handler);
}

export default {
    get,
    put,
    post,
    remove,
    registerErrorHandler
};
