const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');

let externals = {};

const commonComponentPackages = ['ui', 'view', 'widget'];

commonComponentPackages.forEach(cate => {
    const components = fs.readdirSync(path.resolve(__dirname, `../packages/${cate}/components`));
    components.forEach(key => {
        externals[`@sdx/${cate}/components/${key}`] = `@sdx/${cate}/lib/${key}`;
    });
});

let mixinsList = [
    {'@sdx/utils/src/mixins/locale': '@sdx/utils/lib/mixins/locale'}
];

mixinsList.forEach(item => {
    Object.keys(item).forEach(key => {
        externals[key] = item[key];
    });
});

externals = [
    Object.assign({
        vue: 'vue',
        'element-ui': 'element-ui',
        'axios': 'axios',
        'echarts': 'echarts',
        'dexie': 'dexie',
        'dayjs': 'dayjs'
    }, externals),
    /^element-ui/,
    /^~element-ui/,
    function(context, request, callback){
        if (/^@sdx\/ui\/components\/(.*)?/.test(request)) {
            const macthed = request.match(/^@sdx\/ui\/components\/(.*)?/)[1];
            return callback(null, 'commonjs ' + `@sdx/ui/lib/${macthed}`);
        }
        if (/^@sdx\/ui\/theme\/(.*)?/.test(request)) {
            const macthed = request.match(/^@sdx\/ui\/theme\/(.*)?/)[1];
            return callback(null, 'commonjs ' + `@sdx/ui/lib/theme/${macthed}`);
        }
        if (/^@sdx\/widget\/components\/(.*)?/.test(request)) {
            const macthed = request.match(/^@sdx\/widget\/components\/(.*)?/)[1];
            return callback(null, 'commonjs ' + `@sdx/widget/lib/${macthed}`);
        }
        if (/^@sdx\/widget\/theme\/(.*)?/.test(request)) {
            const macthed = request.match(/^@sdx\/widget\/theme\/(.*)?/)[1];
            return callback(null, 'commonjs ' + `@sdx/widget/lib/theme/${macthed}`);
        }
        if (/^@sdx\/view\/components\/(.*)?/.test(request)) {
            const macthed = request.match(/^@sdx\/view\/components\/(.*)?/)[1];
            return callback(null, 'commonjs ' + `@sdx/view/lib/${macthed}`);
        }
        if (/^@sdx\/view\/theme\/(.*)?/.test(request)) {
            const macthed = request.match(/^@sdx\/view\/theme\/(.*)?/)[1];
            return callback(null, 'commonjs ' + `@sdx/view/lib/theme/${macthed}`);
        }
        if (/^@sdx\/utils\/src\/(.*)?/.test(request)) {
            const macthed = request.match(/^@sdx\/utils\/src\/(.*)?/)[1];
            return callback(null, 'commonjs ' + `@sdx/utils/lib/${macthed}`);
        }
        if (/^@sdx\/utils\/theme\/(.*)?/.test(request)) {
            const macthed = request.match(/^@sdx\/utils\/theme\/(.*)?/)[1];
            return callback(null, 'commonjs ' + `@sdx/utils/lib/theme/${macthed}`);
        }
        callback();
    },
    nodeExternals()
];

exports.externals = externals;

exports.alias = {
    '@sdx/ui': path.resolve(__dirname, '../packages/ui'),
    '@sdx/utils': path.resolve(__dirname, '../packages/utils'),
    '@sdx/view': path.resolve(__dirname, '../packages/view'),
    '@sdx/widget': path.resolve(__dirname, '../packages/widget'),
};

exports.analysis = {
    enable: false,
    port: 3366
};
