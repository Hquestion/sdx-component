const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackNodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    context: path.resolve(__dirname, '../packages'),
    entry: {
        index: './ui/index.js'
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, '../packages/ui/lib'),
        publicPath: './',
        library: "IluvatarUI",
        libraryTarget: "commonjs2",
        // chunkFilename: "[id].js",
        libraryExport: "default"
    },
    externals: [
        '@sdx/utils/src/mixins/locale',
        WebpackNodeExternals()
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ['vue-style-loader', {loader: 'css-loader'}],
                        scss: ['vue-style-loader', {loader: 'sass-loader'}],
                    }
                }
            },
            {
                test: /\.(jsx?|babel|es6)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader',"css-loader"]
            },
            {
                test: /\.scss$/,
                use: ['style-loader', "css-loader", "sass-loader"]
            },
            {
                test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([
            {from: './ui/theme', to: 'theme'},
            {from: './ui/utils', to: 'utils'}
        ]),
        new BundleAnalyzerPlugin({
            analyzerPort: 3366
        })
    ]
};

