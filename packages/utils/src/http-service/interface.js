import axios from './api';
import qs from 'qs';

function get (url, params = {}, config) {
    if (!url) return;
    return axios({
        method: 'get',
        url,
        params,
        paramsSerializer: function(params) {
            return qs.stringify(params, {arrayFormat: 'repeat'});
        },
        ...config
    });
}

function post (url, data = {}, config) {
    if (!url) return;
    return axios({
        method: 'post',
        url,
        data,
        ...config
    });
}

function put (url, data = {}, config) {
    if (!url) return;
    return axios({
        method: 'put',
        url,
        data,
        ...config
    });
}

function remove (url, params = {}, config) {
    if (!url) return;
    return axios({
        method: 'delete',
        url,
        params,
        paramsSerializer: function(params) {
            return qs.stringify(params, {arrayFormat: 'repeat'});
        },
        ...config
    });
}

function patch (url, data = {}, config) {
    if (!url) return;
    return axios({
        method: 'patch',
        url,
        data,
        ...config
    });
}

function register (configs) {
    let { handler, config, mock} = configs;
    axios.register(handler, config, mock);
}

export default {
    get,
    put,
    post,
    remove,
    patch,
    register
};
