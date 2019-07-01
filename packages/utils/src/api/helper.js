import auth from '@sdx/widget/components/auth';

export function authWrapper(fn, authKey = '',  authTag = 'API') {
    return function(...rest) {
        if (auth.checkAuth(authKey, authTag)) {
            // 有权限
            let val = fn.apply(this, rest);
            if (val instanceof Promise) {
                return val;
            }
            return Promise.resolve(val);
        } else {
            // 无权限
            return Promise.reject('NO_PERMISSION');
        }
    };
}
