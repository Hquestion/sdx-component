const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');
const components = require('./component');

let externals = {};

Object.keys(components).forEach(cate => {
    Object.keys(components[cate]).forEach(key => {
        externals[`@sdx/${cate}/components/${key}`] = `@sdx/${cate}/lib/${key}`;
    });
});

let mixinsList = [
    '@sdx/utils/lib/mixins/locale'
];

mixinsList.forEach(key => {
    externals[key] = key;
});

externals = [Object.assign({
    vue: 'vue',
    'element-ui': 'element-ui'
}, externals), nodeExternals()];

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
