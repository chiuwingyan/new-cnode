const path=require('path');
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: '!!ejs-compiled-loader!' + path.join(__dirname, '../client/server.template.ejs'),   //以这个为模板
    filename: 'server.ejs'
});
const config = webpackMerge(baseConfig,{
   // target: 'node',             //表示运行在node
    entry:{
        app:path.join(__dirname,'../client/server-entry.js')
    },
    externals: Object.keys(require('../package.json').dependencies),
    output:{
        filename:'server-entry.js',
        libraryTarget :'commonjs2'  //打包出来的文件使用哪种规范，这里使用的是commonjs2的规范
    },
    devServer: {
        inline: true,
        port: 8008,
    },
    plugins: [HTMLWebpackPluginConfig],
    mode:'development',       //在webpack4当中，此配置是必需的.development为开发环境，production为生产环境
})

module.exports = config