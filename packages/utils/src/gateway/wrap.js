/* global TykBatchRequest, TykJsResponse, log, rawlog */

import '@babel/polyfill';
import { v4 as uuid } from 'uuid';

const AUTHORIZATION_HEADER = 'Authorization';
const CONTENT_TYPE_HEADER = 'Content-Type';
const CONTENT_TYPE_APPLICATION_JSON = 'application/json';
const REQUEST_ID_HEADER = 'X-Request-Id';

const PASSED_HEADERS = [AUTHORIZATION_HEADER, REQUEST_ID_HEADER];

const LOG_LEVELS = {
    DEBUG: 10,
    INFO: 20,
    WARNING: 30,
    ERROR: 40
};

const REVERSED_LOG_LEVELS = function() {
    const reverse = {};
    Object.entries(LOG_LEVELS).forEach(entry => reverse[entry[1]] = entry[0]);
    return reverse;
}();

const METHODS = {
    GET: 'GET',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
    POST: 'POST',
    PUT: 'PUT',
};

class Config {
    constructor(config_data) {
        this.data = {};
        this._parseConfigData(config_data);
    }

    get logLevel() {
        return this.data['log_level'];
    }

    _parseConfigData(config_data) {
        try {
            this.data['log_level'] = LOG_LEVELS[config_data.log_level.toUpperCase()] || LOG_LEVELS.INFO;
        } catch (e) {
            this.data['log_level'] = LOG_LEVELS.INFO;
        }
    }
}

class RequestError extends Error {
    constructor(code, body) {
        super();
        this.type = 'RequestError';
        this.code = code;
        this.body = body;
    }
}

class Context {
    constructor(request, session, config) {
        this.request = request;
        this.session = session;
        this.config = config;
    }

    // Initializer

    init() {
        if (this.request.Headers[REQUEST_ID_HEADER] === undefined) {
            this.request.Headers[REQUEST_ID_HEADER] = [uuid()];
        }
    }

    // Logging

    log(level, message) {
        const requestId = this.request.Headers[REQUEST_ID_HEADER][0];
        const date = new Date().toISOString();
        rawlog(`[${date}] ${REVERSED_LOG_LEVELS[level]} in gateway: [${requestId}] ${message}`);
    }

    debug(message) {
        this.log(LOG_LEVELS.DEBUG, message);
    }

    info(message) {
        this.log(LOG_LEVELS.INFO, message);
    }

    warning(message) {
        this.log(LOG_LEVELS.WARNING, message);
    }

    error(message) {
        this.log(LOG_LEVELS.ERROR, message);
    }

    // Request

    createDeleteRequest(relativePath, params) {
        return this._createRequest(METHODS.DELETE, relativePath, params);
    }

    createGetRequest(relativePath, params) {
        return this._createRequest(METHODS.GET, relativePath, params);
    }

    createPatchRequest(relativePath, body) {
        return this._createRequest(METHODS.PATCH, relativePath, body);
    }

    createPostRequest(relativePath, body) {
        return this._createRequest(METHODS.POST, relativePath, body);
    }

    createPutRequest(relativePath, body) {
        return this._createRequest(METHODS.PUT, relativePath, body);
    }

    _createRequest(method, relativePath, data) {
        const req = {
            method,
            headers: {},
            relative_url: relativePath
        };

        PASSED_HEADERS.forEach(key => {
            const value = this.request.Headers[key];
            if (value !== undefined) {
                req.headers[key] = this.request.Headers[key][0];
            }
        });

        if (method === 'GET' || method === 'DELETE') {
            const query = [];
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

    sendRequest(req) {
        const batch = {
            'requests': [req],
            'suppress_parallel_execution': true
        };
        const responseData = TykBatchRequest(JSON.stringify(batch));
        const response = JSON.parse(responseData)[0];
        if (response.code < 200 || response.code >= 400) {
            throw new RequestError(response.code, response.body);
        }
        return JSON.parse(response.body);
    }

    sendRequests(...reqs) {
        const batch = {
            'requests': reqs,
            'suppress_parallel_execution': false
        };
        const resp = TykBatchRequest(JSON.stringify(batch));
        return JSON.parse(resp);
    }

    // Response

    createResponse(code, result) {
        const response = {
            Code: code,
            Headers: {
                [CONTENT_TYPE_HEADER]: CONTENT_TYPE_APPLICATION_JSON,
                [REQUEST_ID_HEADER]: this.request.Headers[REQUEST_ID_HEADER][0]
            }
        };
        if (typeof result === 'string') {
            response.Body = result;
        } else {
            response.Body = JSON.stringify(result);
        }
        return TykJsResponse(response, this.session.meta_data);
    }

    // Helpers

    rename(obj, path, name) {
        const parts = path.split('.');
        const oldName = parts.pop();
        const prefix = parts.join('.');
        const renamer = function(element, value) {
            value[name] = value[oldName];
            delete value[oldName];
        };
        if (oldName === path) {
            renamer('', obj);
        } else {
            scanObject(obj, prefix, renamer);
        }
    }

    resolveUuids(obj, ...patterns) {
        const requests = [];
        const resultKeys = {};
        patterns.forEach(pattern => {
            const uuids = new Set();
            const path = pattern.path;
            const paths = pattern.paths;
            const url = pattern.url;
            const result = pattern.result;
            if (result !== undefined) {
                resultKeys[url] = result;
            }
            const collector = function(element, value) {
                uuids.add(value);
            };
            if (path !== undefined) {
                scanObject(obj, path, collector);
            }
            if (paths !== undefined) {
                paths.forEach(path => scanObject(obj, path, collector));
            }
            if (uuids.size > 0) {
                requests.push(this._createRequest('GET', url, {uuids: [...uuids]}));
            }
        });
        if (requests.length > 0) {
            const resp = JSON.parse(TykBatchRequest(JSON.stringify({
                requests,
                'suppress_parallel_execution': false
            })));

            const results = {};
            resp.forEach(result => {
                if (result.code >= 200 && result.code < 300) {
                    const url = result.relative_url.split('?')[0];
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
                        this.error('non-array body from batch get: ' + JSON.stringify(resp));
                    }
                } else {
                    this.error('status code ' + result.code + ' from batch get: ' + JSON.stringify(resp));
                }
            });

            patterns.forEach(pattern => {
                const path = pattern.path;
                const paths = pattern.paths;
                const replacer = (element, value) => results[value];
                if (path !== undefined) {
                    scanObject(obj, path, replacer);
                }
                if (paths !== undefined) {
                    paths.forEach(path => scanObject(obj, path, replacer));
                }
            });
        }
    }
}

function scanObject(obj, path, processor, prefix = undefined) {
    const parts = path.split('.');
    const key = parts.shift();
    const isEnd = key === path;
    const remaining = parts.join('.');
    const runner = function(key, value) {
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

export default function (handler) {
    return function(request, session, config) {
        const ctx = new Context(request, session, new Config(config.config_data));
        ctx.init();

        let responseData;
        try {
            responseData = handler(ctx, request);
        } catch (e) {
            if (e.type === 'RequestError') {
                responseData = ctx.createResponse(e.code, e.body);
            } else {
                throw e;
            }
        }
        const response = JSON.parse(responseData).Response;

        if (ctx.config.logLevel <= LOG_LEVELS.DEBUG) {
            ctx.debug(`URL: ${request.URL}; Params: ${JSON.stringify(request.Params)}; In Body: ${JSON.stringify(request.Body)}; Status: ${response.Code}; Out Body: ${response.Body}`.trim());
        } else {
            ctx.info(`URL: ${request.URL}; Status: ${response.Code}`);
        }

        return responseData;
    };
}
