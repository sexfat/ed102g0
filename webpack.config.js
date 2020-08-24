const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    entry: {
       app : './app.js',
       aboutus : './app2.js'
    },               // 入口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
      },             // 出口文件
      module: {
        rules: [{
            // 格式
            test: /\.(sass|scss|css)$/,
            //順序是由下到上 sass > css > style
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: './dist'
                }
              },
                'css-loader',
                'sass-loader'
            ],
        }]

    },            // 處裡對應模組
    plugins: [
         //清除舊的建構檔案
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "./[name].css"
        }),
        //首頁配置
        new HtmlWebpackPlugin({
          //來源
          template : 'index.html',
          //目的地
          filename : 'index.html',
          title : '首頁',
          chunks : ['app']

        }),
        //內頁配置
        new HtmlWebpackPlugin({
          //來源
          template : 'aboutus.html',
          //目的地
          filename : 'aboutus.html',
          title : '內頁',
          chunks : ['aboutus']
        })
    ],             // 對應的插件
    devServer: {
      contentBase: './dist',
      host: 'localhost',
      port: 3000,
      // 指定首頁檔案
      index: 'index.html',
      open: true
    },          // 服務器配置
    mode: 'development'       // 開發模式配置 development
}