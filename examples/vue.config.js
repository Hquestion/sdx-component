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
            '/api': {
                target: 'https://easy-mock.com',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '/api': '/mock/5cd04685adb0973be6a3d969/api'
                }
            }
        },
    }
};
