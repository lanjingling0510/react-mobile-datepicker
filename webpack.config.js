/* eslint-disable */
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var postNested = require('postcss-nested');
var cssnext = require('cssnext');

var TARGET = process.env.npm_lifecycle_event;
var EXAMPLES_DIR = path.resolve(__dirname, 'examples');
const ROOT_PATH = process.cwd();

module.exports = {
    entry: buildEntries(),
    output: {
        path: ROOT_PATH + '/examples/__build__',
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.min.js',
    },
    devtool: 'eval-source-map',
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
        hot: true,
        inline: true,
        host: '0.0.0.0',
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.css'],
    },

    resolveLoader: {
        moduleExtensions: ['-loader'],
    },

    performance: {
        hints: false,
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                  {loader: 'style'},
                  {loader: 'css'},
                  {
                    loader: 'postcss',
                    options: {config: {path: path.join(__dirname, 'postcss.config.js')}},
                  },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'lib-temlate',
            template: 'examples/index.html', // Load a custom template
            inject: 'body', // Inject all scripts into the body
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: [
                'vendor',
            ], // vendor libs + extracted manifest
            minChunks: Infinity
        }),
    ],
};

function buildEntries() {
    return fs.readdirSync(EXAMPLES_DIR).reduce(function(a, b) {
        if (b === '__build__') {
            return a;
        }

        var isDraft = b.charAt(0) === '_';

        if (!isDraft && isDirectory(path.join(EXAMPLES_DIR, b))) {
            a[b] = path.join(EXAMPLES_DIR, b, 'index.js');
        }

        return a;
    }, {});
}

function isDirectory(dir) {
    return fs.lstatSync(dir).isDirectory();
}
