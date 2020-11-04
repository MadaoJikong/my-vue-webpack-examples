const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
//每次build 先清除 dist下的文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.join(__dirname, 'src/main.js'), // 项目总入口js文件
    // 输出文件
    output: {
        path: path.join(__dirname, 'dist'), // 所有的文件都输出到dist/目录下
        filename: 'bundle-[hash].js'
    },
    module: {
        rules: [{
            // 使用vue-loader解析.vue文件
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
            test: /\.css$/,
            // 要加上style-loader才能正确解析.vue文件里的<style>标签内容
            use: [
                MiniCssExtractPlugin.loader,
                //'style-loader',
                'css-loader',
                'postcss-loader'
            ]
        },
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/, // 不处理这两个文件夹里的内容
            loader: 'babel-loader'
        }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            errors: true,
        },
        hot: true
    },
    plugins: [
        new VueLoaderPlugin(), // 最新版的vue-loader需要配置插件
        new HtmlWebpackPlugin({
            filename: 'index.html', // 生成的文件名称
            template: 'index.html', // 指定用index.html做模版
            inject: 'body' // 指定插入的<script>标签在body底部
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "style.[hash:8].css",
            chunkFilename: "[id].[hash:8].css"
        })

    ],
    /**
    * 添加可以自动解析的扩展
    * 就是 import 的时候可以不用写后缀也能正确引用文件了
    * eg：添加了'.vue'，import App from './app.vue' 可以写成 import App from './app' 了
    * 参考：https://webpack.docschina.org/configuration/resolve/#resolve-extensions
    */
    resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.json', '.vue']
    }

};