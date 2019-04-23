import axios from "axios";

let errorHandler;

export default function $axios(options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            headers: {},
            transformResponse: [function(data) {}]
        });

        // request 拦截器
        instance.interceptors.request.use(
            config => {
                // 带上 token , 可以结合 vuex 或者 localStorage
                // if (store.getters.token) {
                //     config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
                // } else {
                //     // 重定向到登录页面
                // }
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

        //请求处理
        instance(options)
            .then(res => {
                resolve(res);
                return false;
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function setErrorHandler(handler) {
    errorHandler = handler;
}
