/* eslint-disable */
class FileApi {
    constructor(props) {
        this.fileName = 'wode ';
    }

    @auth
    getFile() {
        console.log('-------');
        console.log('getFile method start to execute');
    }

    @simpleAuth('NAME:ACCESS')
    getMyInfo() {
        console.log('_================');
        console.log(2222);
        return this.fileName;
    }

    @simpleAuth('NAME:ACCESS')
    static deleteFile() {
        return 'deleted!';
    }
}


function simpleAuth (key = '', tag = 'API') {
    return function(target, name, descriptor) {
        let fn = descriptor.value;
        if (key === '') {
            console.log('不需要校验权限！');
            descriptor.value = descriptor.value = function() {
                let val = fn.apply(this, arguments);
                if(val instanceof Promise) {
                    return val;
                }
                return Promise.resolve(val);
            };
        } else {
            if (key === 'NAME:ACCESS') {
                console.log('权限校验通过！');
                descriptor.value = function() {
                    let val = fn.apply(this, arguments);
                    if(val instanceof Promise) {
                        return val;
                    }
                    return Promise.resolve(val);
                };
            } else {
                descriptor.value = function() {
                    console.log('无权限，reject');
                    return Promise.reject('NO_PERMISSION');
                };
            }
        }
    };
}

function auth(target, name, descriptor) {
    console.log(target);
    console.log(name);
    console.dir(descriptor);
}

function authWrapper(fn, p = '') {
    return function(...rest) {
        if (p === '') {
            let val = fn.apply(this, rest);
            if (val instanceof Promise) {
                return val;
            }
            return Promise.resolve(val);
        } else {
            if (p === 'USER:READ') {
                // 有权限
                console.log('有权限啊。。。');
                let val = fn.apply(this, rest);
                if (val instanceof Promise) {
                    return val;
                }

                return Promise.resolve(val);
            } else {
                return Promise.reject('NO_PERMISSION');
            }
        }
    };
}


const readFileDetail = authWrapper(function (name) {
    return {
        name: name,
        desc: '这个是一个文件'
    };
}, 'USER:READ');



new FileApi().getMyInfo().then(res => {
    console.log('调用成功，返回：' + res);
}, () => {
    console.log('调用失败啦！');
});

FileApi.deleteFile().then(res => {
    console.log('删除成功，返回：' + res);
}, () => {
    console.error('删除失败！');
});

readFileDetail('helolo wolrld').then(res => {
    console.dir(res);
}, (err) => {
    console.error(err);
});
