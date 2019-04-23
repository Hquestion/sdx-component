import axios from "axios";

let errorHandler;
let instance;
let mockUrlList;
let needUpdate = false;
let axiosConfig = {
    baseURL: '',
    headers: {
        'Content-Type':'application/json;charset=UTF-8'
    },
    timeout: 30000,
    withCredentials: false,
    responseType: 'json'
};

export default function $axios(options) {
    return new Promise((resolve, reject) => {
        if (!instance || needUpdate) {
            instance = axios.create(axiosConfig);

            // request 拦截器
            instance.interceptors.request.use(
                config => {
                    if (axiosConfig.tokenKey) {
                        config.headers[axiosConfig.tokenKey] = axiosConfig.tokenValue;
                    }
                    if (process.env.NODE_ENV === 'development') {
                        let needMock = mockUrlList.some(url => {
                            if (typeof url === 'string') {
                                return url === config.url;
                            } else if (typeof url === 'object' && url instanceof RegExp) {
                                return url.test(config.url);
                            } else {
                                return false;
                            }
                        });
                        needMock && (config.url = `/mock${config.url}`);
                    }
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

            // response 拦截器
            instance.interceptors.response.use(
                response => {
                    let data = response.data;

                    // 根据返回的code值来做不同的处理（和后端约定）
                    switch (data.code) {
                    case "":
                        break;
                    default:
                        break;
                    }
                    // 若不是正确的返回code，且已经登录，就抛出错误
                    // const err = new Error(data.description)

                    // err.data = data
                    // err.response = response

                    // throw err
                    return data;
                },
                err => {
                    if (errorHandler) errorHandler();
                    return Promise.reject(err); // 返回接口返回的错误信息
                }
            );

            needUpdate = false;
        }

        //请求处理
        instance(options)
            .then(res => {
                resolve(res);
            })
            .catch(error => {
                reject(error);
            });
    });
}

$axios.register = (handler, config, mock) => {
    errorHandler = handler;
    Object.assign(axiosConfig, config);
    mockUrlList = mock;
    needUpdate = true;
};
