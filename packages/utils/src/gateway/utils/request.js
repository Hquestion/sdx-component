/* global TykBatchRequest, TykJsResponse, log */
import { v4 as uuid } from 'uuid';
import { AUTHORIZATION_HEADER, CONTENT_TYPE_APPLICATION_JSON, CONTENT_TYPE_HEADER, REQUEST_ID_HEADER } from './constants';

const PASSED_HEADERS = [AUTHORIZATION_HEADER, REQUEST_ID_HEADER];

export function init(request) {
    if (request.Headers[REQUEST_ID_HEADER] === undefined) {
        request.Headers[REQUEST_ID_HEADER] = [uuid()];
    }
}

export function createRequest(request, method, relativePath, data) {
    let req = {
        method,
        headers: {},
        relative_url: relativePath
    };

    PASSED_HEADERS.forEach(key => {
        let value = request.Headers[key];
        if (value !== undefined) {
            req.headers[key] = request.Headers[key][0];
        }
    });

    if (method === 'GET' || method === 'DELETE') {
        let query = [];
        Object.entries(data).forEach(entry => {
            if (Array.isArray(entry[1])) {
                entry[1].forEach(value => query.push(entry[0] + '=' + value));
            } else {
                query.push(entry[0] + '=' + entry[1]);
            }
        });
        if (query.length > 0) {
            req.relative_url += '?' + query.join('&');
        }
    } else {
        req.headers[CONTENT_TYPE_HEADER] = CONTENT_TYPE_APPLICATION_JSON;
        req.body = JSON.stringify(data);
    }
    return req;
}

export function createResponse(request, session, code, result) {
    let response = {
        Code: code,
        Headers: {
            [CONTENT_TYPE_HEADER]: CONTENT_TYPE_APPLICATION_JSON,
            [REQUEST_ID_HEADER]: request.Headers[REQUEST_ID_HEADER][0]
        }
    };
    if (typeof result === 'string') {
        response.Body = result;
    } else {
        response.Body = JSON.stringify(result);
    }
    return TykJsResponse(response, session.meta_data);
}

export function sendRequest(req) {
    let batch = {
        'requests': [req],
        'suppress_parallel_execution': true
    };
    let resp = TykBatchRequest(JSON.stringify(batch));
    return JSON.parse(resp)[0];
}

export function rename(obj, path, name) {
    let parts = path.split('.');
    let oldName = parts.pop();
    let prefix = parts.join('.');
    let renamer = function(element, value) {
        value[name] = value[oldName];
        delete value[oldName];
    };
    if (oldName === path) {
        renamer('', obj);
    } else {
        scanObject(obj, prefix, renamer);
    }
}

export function resolveUuids(request, obj, ...patterns) {
    let requests = [];
    let resultKeys = {};
    patterns.forEach(pattern => {
        let uuids = new Set();
        let path = pattern.path;
        let paths = pattern.paths;
        let url = pattern.url;
        let result = pattern.result;
        if (result !== undefined) {
            resultKeys[url] = result;
        }
        let collector = function(element, value) {
            uuids.add(value);
        };
        if (path !== undefined) {
            scanObject(obj, path, collector);
        }
        if (paths !== undefined) {
            paths.forEach(path => scanObject(obj, path, collector));
        }
        if (uuids.size > 0) {
            requests.push(createRequest(request, 'GET', url, {uuids: [...uuids]}));
        }
    });
    if (requests.length > 0) {
        let resp = JSON.parse(TykBatchRequest(JSON.stringify({
            requests,
            'suppress_parallel_execution': false
        })));

        let results = {};
        resp.forEach(result => {
            if (result.code >= 200 && result.code < 300) {
                let url = result.relative_url.split('?')[0];
                let body = JSON.parse(result.body);
                if (resultKeys[url] !== undefined) {
                    resultKeys[url].split('.').forEach(key => body = body[key]);
                }
                if (Array.isArray(body)) {
                    body.forEach(element => {
                        if (element.uuid !== undefined) {
                            results[element.uuid] = element;
                        }
                    });
                } else {
                    log('non-array body from batch get: ' + JSON.stringify(resp));
                }
            } else {
                log('status code ' + result.code + ' from batch get: ' + JSON.stringify(resp));
            }
        });

        patterns.forEach(pattern => {
            let path = pattern.path;
            let paths = pattern.paths;
            let replacer = (element, value) => results[value];
            if (path !== undefined) {
                scanObject(obj, path, replacer);
            }
            if (paths !== undefined) {
                paths.forEach(path => scanObject(obj, path, replacer));
            }
        });
    }
}

function scanObject(obj, path, processor, prefix = undefined) {
    let parts = path.split('.');
    let key = parts.shift();
    let isEnd = key === path;
    let remaining = parts.join('.');
    let runner = function(key, value) {
        let element = key;
        if (prefix !== undefined) {
            element = prefix + '.' + element;
        }
        if (isEnd) {
            value = processor(element, value);
            if (value !== undefined) {
                obj[key] = value;
            }
        } else {
            scanObject(value, remaining, processor, element);
        }
    };
    if (key === '*') {
        Object.entries(obj).forEach(entry => {
            runner(entry[0], entry[1]);
        });
    } else {
        runner(key, obj[key]);
    }
}
