/* global TykBatchRequest, TykJsResponse, log, rawlog */

import '@babel/polyfill';
import { v4 as uuid } from 'uuid';

// tyk网关协议/服务名
export const TYK_SERVER_PROTOCOL = 'http://';
export const TYK_SERVER_NAME = 'tyk-api-gateway';
// 之前用的tyk-gateway，重新部署后确认修改为tyk-api-gateway
// 为了简化修改，这里对url做一次处理，替换掉原来的http://tyk-gateway
const OLD_TYK_NAME = 'tyk-gateway';

export const prefixRestApi = url => {
    if (url.indexOf(`${TYK_SERVER_PROTOCOL}${TYK_SERVER_NAME}`) >= 0) {
        return url;
    }
    let oldName = `http://${OLD_TYK_NAME}/`;
    if (url.indexOf(oldName) >= 0) {
        url = url.replace(oldName, '');
    }
    return `${TYK_SERVER_PROTOCOL}${TYK_SERVER_NAME}/${url}`;
};

/* Common HTTP constants
 */
export const AUTHORIZATION_HEADER = 'Authorization';
export const CONTENT_TYPE_HEADER = 'Content-Type';
export const CONTENT_TYPE_APPLICATION_JSON = 'application/json';
export const REQUEST_ID_HEADER = 'X-Request-Id';

/* Internal Constants
 */

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

/**
 * A class to hold the values in the virtual endpoint's "config_data"
 */
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

/**
 * An error that can be thrown when ctx.sendRequest() fails with a single request.
 *
 * This error is automatically handled by the wrapper. The error code and body are returned to the client.
 */
class RequestError extends Error {
    constructor(code, body) {
        super();
        this.type = 'RequestError';
        this.code = code;
        this.body = body;
    }
}

/**
 * The context of handling a request.
 *
 * This class encapsulates Tyk's JavaScript API, and provides functionality such as logging, sending requests, resolving
 * UUIDs in a JSON structure, etc.
 */
class Context {
    /**
     * Construct the context.
     *
     * @param request The Tyk request object
     * @param session The Tyk session object
     * @param config A {@link Config} object
     */
    constructor(request, session, config) {
        this.request = request;
        this.session = session;
        this.config = config;

        this._init();
    }

    /* Initializer */

    _init() {
        if (this.request.Headers[REQUEST_ID_HEADER] === undefined) {
            this.request.Headers[REQUEST_ID_HEADER] = [uuid()];
        }
    }

    /* Logging */

    /**
     * Log a message at the debug level.
     *
     * @param message The message
     */
    debug(message) {
        this._log(LOG_LEVELS.DEBUG, message);
    }

    /**
     * Log a message at the info level.
     *
     * @param message The message
     */
    info(message) {
        this._log(LOG_LEVELS.INFO, message);
    }

    /**
     * Log a message at the warning level.
     *
     * @param message The message
     */
    warning(message) {
        this._log(LOG_LEVELS.WARNING, message);
    }

    /**
     * Log a message at the error level.
     *
     * @param message The message
     */
    error(message) {
        this._log(LOG_LEVELS.ERROR, message);
    }

    _log(level, message) {
        // return;
        // eslint-disable-next-line
        if (level >= this.config.logLevel) {
            const requestId = this.request.Headers[REQUEST_ID_HEADER][0];
            const date = new Date().toISOString();
            rawlog(`[${date}] ${REVERSED_LOG_LEVELS[level]} in gateway: [${requestId}] ${message}`);
        }
    }

    /* Request */

    /**
     * Create a DELETE request.
     *
     * @param url The URL to send the request to, usually starting with 'http://tyk-gateway/'
     * @param params The URL parameters in a dictionary; if missing, an empty dictionary is used
     * @returns {{headers: {}, relative_url: *, method: *}} A Tyk request
     */
    createDeleteRequest(url, params) {
        return this._createRequest(METHODS.DELETE, url, params);
    }

    /**
     * Create a GET request.
     *
     * @param url The URL to send the request to, usually starting with 'http://tyk-gateway/'
     * @param params The URL parameters in a dictionary; if missing, an empty dictionary is used
     * @returns {{headers: {}, relative_url: *, method: *}} A Tyk request
     */
    createGetRequest(url, params, body) {
        return this._createRequest(METHODS.GET, url, params, body);
    }

    /**
     * Create a PATCH request.
     *
     * @param url The URL to send the request to, usually starting with 'http://tyk-gateway/'
     * @param body The body to send as a JSON structure; if missing, an empty dictionary is used
     * @returns {{headers: {}, relative_url: *, method: *}} A Tyk request
     */
    createPatchRequest(url, body) {
        return this._createRequest(METHODS.PATCH, url, body);
    }

    /**
     * Create a POST request.
     *
     * @param url The URL to send the request to, usually starting with 'http://tyk-gateway/'
     * @param body The body to send as a JSON structure; if missing, an empty dictionary is used
     * @returns {{headers: {}, relative_url: *, method: *}} A Tyk request
     */
    createPostRequest(url, body) {
        return this._createRequest(METHODS.POST, url, body);
    }

    /**
     * Create a PUT request.
     *
     * @param url The URL to send the request to (usually starting with 'http://tyk-gateway/')
     * @param body The body to send as a JSON structure; if missing, an empty dictionary is used
     * @returns {{headers: {}, relative_url: *, method: *, body: *}} A Tyk request
     */
    createPutRequest(url, body) {
        return this._createRequest(METHODS.PUT, url, body);
    }

    _createRequest(method, url, data = {}, payload = undefined) {
        const req = {
            method,
            headers: {},
            relative_url: prefixRestApi(url)
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
                    if (entry[1].length === 0) {
                        query.push(entry[0] + '=');
                    } else {
                        // url上传递中文时，后端识别异常，这里做一下编码处理，同时防止一些特殊字符
                        entry[1].forEach(value => query.push(entry[0] + '=' + encodeURIComponent(value)));
                    }
                } else {
                    query.push(entry[0] + '=' + encodeURIComponent(entry[1]));
                }
            });
            if (query.length > 0) {
                req.relative_url += '?' + query.join('&');
            }
            if (payload) {
                req.body = JSON.stringify(payload);
            }
        } else {
            req.headers[CONTENT_TYPE_HEADER] = CONTENT_TYPE_APPLICATION_JSON;
            req.body = JSON.stringify(data);
        }
        return req;
    }


    /**
     * Send a request.
     * @param request The request to send
     * @param preventError Prevent the default error handler, return an empty Object as response
     * @returns {*} A dictionary or an array returned by the backend service, if successful
     * @throws RequestError When the request fails with HTTP status < 200 or >= 400
     */
    sendRequest(request, preventError) {
        const batch = {
            'requests': [request],
            'suppress_parallel_execution': true
        };

        const response = JSON.parse(TykBatchRequest(JSON.stringify(batch)))[0];

        if (this.config.logLevel <= LOG_LEVELS.DEBUG) {
            this.debug(`Sent request ${JSON.stringify(request)}. Received response ${JSON.stringify(response)}`);
        } else {
            this.info(`Send request ${request.method} ${request.relative_url.split('?')[0]}. Received response ${response.code}`);
        }

        if (response.code < 200 || response.code >= 400) {
            if (!preventError) {
                throw new RequestError(response.code, response.body);
            } else {
                return {};
            }
        }

        return JSON.parse(response.body);
    }

    /**
     * Send a batch of requests in parallel.
     *
     * @param requests A variable number of requests to send
     * @returns {[]} An array of responses, each corresponding to a request in same order
     */
    sendRequests(...requests) {
        const batch = {
            requests,
            'suppress_parallel_execution': false
        };

        const responses = JSON.parse(TykBatchRequest(JSON.stringify(batch)));

        const responseMap = {};
        responses.forEach(response => {
            responseMap[response.relative_url] = response;
        });
        const result = [];
        requests.forEach(request => {
            result.push(responseMap[request.relative_url]);
        });

        if (this.config.logLevel <= LOG_LEVELS.DEBUG) {
            this.debug(`Sent requests ${JSON.stringify(requests)}. Received responses ${JSON.stringify(responses)}`);
        } else {
            const methodAndUrls =
                requests.map(request => request.method + ' ' + request.relative_url.split('?')[0]).join(', ');
            const codes = result.map(response => response.code).join(', ');
            this.info(`Send requests ${methodAndUrls}. Received responses ${codes}`);
        }

        return result;
    }

    /* Response */

    /**
     * Create a response to return to Tyk
     *
     * @param code The HTTP status
     * @param result The result as an object
     * @return TykJsResponse The response
     */
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

    /* Helpers */

    /**
     * Rename keys in the object.
     *
     * @param object The object
     * @param path The path to the keys, with components separated by '.' ('*' as a component refers to all elements in
     *  an array)
     * @param name The new name
     * @return {*} The same object
     * @example
     * // Rename the 'uuid' key to 'user'.
     * rename({uuid: '...', 'accessToken': '...', 'type': 'bearer'}, 'uuid', 'user')
     * // Rename all 'uuid' keys to 'group_uuid'.
     * rename({groups: [{uuid: '...'}, {uuid: '...'}]}, 'groups.*.uuid', 'group_uuid')
     */
    rename(object, path, name) {
        const parts = path.split('.');
        const oldName = parts.pop();
        const prefix = parts.join('.');
        const renamer = function(element, value) {
            value[name] = value[oldName];
            delete value[oldName];
        };
        if (oldName === path) {
            renamer('', object);
        } else {
            scanObject(object, prefix, renamer);
        }
        return object;
    }

    /**
     * Resolve UUIDs in the object by sending batched requests to backend services
     *
     * @param object The object containing the UUIDs
     * @param patterns A variable number of patterns, each in the form of {path: '', paths: ['', ''], url: '',
     *  result: ''}, where path is a path to the keys in the object, paths is an array of paths to process at once, url
     *  is the URL to fetch the data for the UUIDs (usually starting with 'http://tyk-gateway/'), and result is the
     *  (optional) path to the result data in the response.
     * @return {*} The same object
     * @example
     * // Resolve the UUID in the OAuth token. 'uuid' is a key in the token. The URL leads to a GET request at
     * // http://tyk-gateway/user-manager/api/v1/users?uuids={uuid}. If successful, the response has a 'users' key that
     * // contains the user's information. The user's information is retried from the 'users' key and is used to replace
     * // the 'uuid' key in the token.
     * resolveUuids(token,
     *   {
     *     path: 'uuid',
     *     url: 'http://tyk-gateway/user-manager/api/v1/users',
     *     result: 'users'
     *   }
     * )
     * // In the list of users, resolve the roles, groups and permissions of each user. The roles request returns
     * // {'roles': [...]}, so the first pattern includes {result: 'roles'} to retries to the data. The groups and
     * // permissions requests are similar, except that the keys in their responses are 'groups' and 'permissions',
     * // respectively
     * resolveUuids(users,
     *   {
     *     path: '*.roles.*',
     *     url: 'http://tyk-gateway/user-manager/api/v1/roles',
     *     result: 'roles'
     *   },
     *   {
     *     path: '*.groups.*',
     *     url: 'http://tyk-gateway/user-manager/api/v1/groups',
     *     result: 'groups'
     *   },
     *   {
     *     path: '*.permissions.*',
     *     url: 'http://tyk-gateway/user-manager/api/v1/permissions',
     *     result: 'permissions'
     *   }
     * )
     */
    resolveUuids(object, ...patterns) {
        const requests = [];
        const resultKeys = {};
        const resultIdKeys = {};
        patterns.forEach(pattern => {
            const uuids = new Set();
            const path = pattern.path;
            const paths = pattern.paths;
            const url = prefixRestApi(pattern.url);
            const result = pattern.result;
            const method = (pattern.method || 'GET').toUpperCase();
            resultIdKeys[url] = pattern.resultIdKey || 'uuid';
            if (result !== undefined) {
                resultKeys[url] = result;
            }
            const collector = function(element, value) {
                // only add uuid into uuids when value is not empty
                if (value) {
                    uuids.add(value);
                }
            };
            if (path !== undefined) {
                scanObject(object, path, collector);
            }
            if (paths !== undefined) {
                paths.forEach(path => scanObject(object, path, collector));
            }
            if (uuids.size > 0) {
                requests.push(this._createRequest(method, url, {uuids: [...uuids]}));
            }
        });
        if (requests.length > 0) {
            const responses = this.sendRequests(...requests);

            const results = {};
            responses.forEach(response => {
                if (response.code >= 200 && response.code < 300) {
                    const url = response.relative_url.split('?')[0];
                    let body = JSON.parse(response.body);
                    if (resultKeys[url] !== undefined) {
                        resultKeys[url].split('.').forEach(key => body = body[key]);
                    }
                    if (Array.isArray(body)) {
                        this.info('array body from batch get: ' + JSON.stringify(body));
                        body.forEach(element => {
                            if (element[resultIdKeys[url]] !== undefined) {
                                results[element[resultIdKeys[url]]] = element;
                            }
                        });
                    } else {
                        this.error('non-array body from batch get: ' + JSON.stringify(response));
                    }
                } else {
                    this.error('status code ' + response.code + ' from batch get: ' + JSON.stringify(response));
                }
            });

            patterns.forEach(pattern => {
                const path = pattern.path;
                const paths = pattern.paths;
                const errorReplaceKey = pattern.errorReplaceKey;
                const replacer = (element, value) => {
                    // replace the result when value is exist.In some case, path does not exist in the result
                    if (value) {
                        return results[value] || errorReplaceKey && {[errorReplaceKey]: value};
                    }
                    return undefined;
                };
                if (path !== undefined) {
                    scanObject(object, path, replacer);
                }
                if (paths !== undefined) {
                    paths.forEach(path => scanObject(object, path, replacer));
                }
            });
        }
        return object;
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
        obj && Object.entries(obj).forEach(entry => {
            runner(entry[0], entry[1]);
        });
    } else {
        runner(key, obj[key]);
    }
}

/**
 * A wrapper that wraps a handler and returns a Tyk request handler
 *
 * @param handler The handler to wrap around, in the form of 'function(ctx, request): TykJsResponse'.
 * @return {function(*=, *=, *): TykJsResponse}
 */
export default function (handler) {
    return function(request, session, config) {
        const ctx = new Context(request, session, new Config(config.config_data));

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
