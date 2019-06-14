/**
 * 这里会调用注册网关API的bash脚本
 *
 */
/* eslint-disable */
const childProcess = require('child_process');
const configs = require('./config');

childProcess.exec('chmod 777 ./register-tool', function() {
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
});

