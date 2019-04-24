import axios from './api';

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
        data,
        ...config
    });
}

function put (url, data, config) {
    if (!url) return;
    return axios({
        method: 'put',
        url,
        data,
        ...config
    });
}

function remove (url, data, config) {
    if (!url) return;
    return axios({
        method: 'delete',
        url,
        data,
        ...config
    });
}

function register (handler, config, mock) {
    axios.register(handler, config, mock);
}

export default {
    get,
    put,
    post,
    remove,
    register
};
