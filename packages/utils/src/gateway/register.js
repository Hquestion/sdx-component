/**
 * 这里会调用注册网关API的bash脚本
 * 支持传参指定注定某些接口，将文件名直接跟在后面。如node register.js userProfiles groupProfiles...
 *
 */
/* eslint-disable */
const childProcess = require('child_process');
let configs = require('./config');

let argsName = [];

childProcess.exec('chmod 777 ./register-tool', function() {
    configs = configs.filter(cfg => {
        if (argsName.length > 0) {
            return argsName.find(arg => cfg.functionName.startsWith(arg));
        } else {
            return true;
        }
    });
    configs.forEach(config => {
        childProcess.execSync(`./register-tool unregister ${config.apiId}`, (err, stdout) => {
            if (err) {
                console.log('[NODEJS UNREGISTER]: unregister error!');
                console.log(JSON.stringify(err));
                throw new Error(err);
            }
            console.log('[NODEJS UNREGISTER]: unregister success ' + config.apiId);
        });
    });
    setTimeout(() => {
        configs.forEach(config => {
            childProcess.execSync(`./register-tool register ${config.functionName} ${config.filePath} ${config.apiId} ${config.method}`, (err, stdout) => {
                if (err) {
                    console.log('[NODEJS REGISTER]: register error!');
                    console.log(JSON.stringify(err));
                    throw new Error(err);
                }
                console.log('[NODEJS REGISTER]: register success ' + config.apiId);
            });
        })
    }, 1000);
});

