/**
 * 这里会调用注册网关API的bash脚本
 *
 */
/* eslint-disable */
const childProcess = require('child_process');
childProcess.execSync('npm install minimist');
const parseArgs = require('minimist');
let configs = require('./config');

let argsName = parseArgs(process.argv.slice(2));
if (argsName._ && Array.isArray(argsName._)) {
    argsName = argsName._;
} else {
    argsName = [];
}

childProcess.exec('chmod 777 ./register-tool', function() {
    configs = configs.filter(cfg => {
        if (argsName.length > 0) {
            return argsName.find(arg => cfg.functionName.startsWith(arg));
        } else {
            return true;
        }
    });
    // configs.forEach(config => {
    //     childProcess.execSync(`./register-tool unregister ${config.apiId}`, (err, stdout) => {
    //         if (err) {
    //             console.log('[NODEJS UNREGISTER]: unregister error!');
    //             console.log(JSON.stringify(err));
    //             throw new Error(err);
    //         }
    //         console.log('[NODEJS UNREGISTER]: unregister success ' + config.apiId);
    //     });
    // });
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

