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
        'axios': 'axios'
    }, externals),
    nodeExternals(),
    /^element-ui/,
    /^~element-ui/,
    function(context, request, callback){
        if (/^@sdx\/ui\/components\/(.*)?/.test(request)) {
            const macthed = request.match(/^@sdx\/ui\/components\/(.*)?/)[1];
            return callback(null, 'commonjs ' + `@sdx/ui/lib/${macthed}`);
        }
        if (/^@sdx\/widget\/components\/(.*)?/.test(request)) {
            const macthed = request.match(/^@sdx\/widget\/components\/(.*)?/)[1];
            return callback(null, 'commonjs ' + `@sdx/widget/lib/${macthed}`);
        }
        if (/^@sdx\/view\/components\/(.*)?/.test(request)) {
            const macthed = request.match(/^@sdx\/view\/components\/(.*)?/)[1];
            return callback(null, 'commonjs ' + `@sdx/view/lib/${macthed}`);
        }
        if (/^@sdx\/utils\/src\/(.*)?/.test(request)) {
            const macthed = request.match(/^@sdx\/utils\/src\/(.*)?/)[1];
            return callback(null, 'commonjs ' + `@sdx/utils/lib/${macthed}`);
        }
        callback();
    }

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
