const packageInfo = require('./package.json');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: './dist',
        filename: 'bundle.js',
        libraryTarget: 'umd',
        library: 'vueify'
    },

    externals: {
        jquery: 'jQuery',
        vue: 'Vue',
        'shopware/plugin-base': '$.PluginBase'
    },

    devtool: 'source-map',

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader'
        }]
    }
};
