const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopoyWebpackPlugin = require('copy-webpack-plugin');

const plugins = [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new CopoyWebpackPlugin([
        {from: './src/gateway/register.js', to: '../'},
        {from: './src/gateway/config.js', to: '../'},
        {from: './src/gateway/register-tool', to: '../'}
    ])
];

const GATEWAY_COMPOSE_LOCATION = path.resolve(__dirname, '../src/gateway/compose');
const files = fs.readdirSync(GATEWAY_COMPOSE_LOCATION);
const entry = {};
files.forEach(item => {
    const extensionIndex = item.indexOf('.js');
    const entryName = item.slice(0, extensionIndex);
    entry[entryName] = path.resolve(GATEWAY_COMPOSE_LOCATION, item);
});

module.exports = {
    mode: 'production',
    entry: entry,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../gateway/compose'),
        publicPath: './',
        library: '[name]',
        libraryTarget: 'var',
        // chunkFilename: "[id].js",
        // libraryExport: 'default'
    },
    resolve: {
        extensions: ['.js'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.(jsx?|babel|es6)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins
};

