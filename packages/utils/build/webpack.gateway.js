const path = require('path');
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


module.exports = {
    mode: 'production',
    entry: {
        login: './src/gateway/compose/login.js',
        userProfiles: './src/gateway/compose/userProfiles.js',
        groupProfiles: './src/gateway/compose/groupProfiles.js',
        imageProfiles: './src/gateway/compose/imageProfiles.js',
    },
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

