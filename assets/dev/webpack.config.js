'use strict';

var path = require('path');
var webpack = require('webpack');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');

const prod = process.argv.indexOf('-p') !== -1;

let min = '';
let devtool = 'source-map';

if(prod){
    min = '.min';
    devtool = false;
}


module.exports = {
    entry: [
        path.join(__dirname, 'index.js'),
    ],
    output: {
        path: path.join(__dirname, '../js/'),
        filename: 'main'+min+'.js'
    },
    plugins: [
        new LiveReloadPlugin(),
        new WebpackNotifierPlugin({alwaysNotify: true, skipFirstNotification: false, title: 'Webpack'})
    ],
    externals : {
        jquery: 'jQuery'
    },
    devtool: devtool,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}
