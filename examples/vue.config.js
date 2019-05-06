const path = require('path');
const config = require('../build/config');

const resolve = dir => path.join(__dirname, dir);

module.exports = {
    pluginOptions: {
        i18n: {
            locale: 'zh-CN',
            fallbackLocale: 'zh-CN',
            localeDir: 'locales',
            enableInSFC: false
        }
    },
    configureWebpack: {
        resolve: {
            alias: config.alias
        }
    },
    devServer: {
        writeToDisk: false,
        port: 3300,
        proxy: {
            '/api/v1': {
                target: 'http://10.115.1.130:3000',
                ws: true,
                changeOrigin: true
            }
        },
    }
};
