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
            '^/api': {
                target: 'https://easy-mock.com',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '/api': '/mock/5cd04685adb0973be6a3d969/api'
                }
            },
            '^/image-manager': {
                target: 'http://10.115.1.130:30080',
                ws: true,
                changeOrigin: true,
            },
            '^/project-manager': {
                target: 'http://10.115.1.130:30080',
                ws: true,
                changeOrigin: true,
            },
            '^/.*-manager': {
                target: 'http://10.115.1.130:30080',
                ws: true,
                changeOrigin: true,
            },
            '/fe-compose': {
                target: 'http://10.115.1.130:30080',
                ws: true,
                changeOrigin: true,
            },
            '/v2': {
                // target: 'http://10.115.1.130',
                // ws: true,
                // changeOrigin: true,
                target: 'https://easy-mock.com',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '/v2': '/mock/5cd04685adb0973be6a3d969/v2'
                }
            }
        },
    }
};
