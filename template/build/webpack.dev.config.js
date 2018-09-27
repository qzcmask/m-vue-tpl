const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const config = require('../config')
const baseWebpackConfig = require('./webpack.base.config')
const vendorConfig = require('../vendor-config.json')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

module.exports = webpackMerge(baseWebpackConfig, {
  mode: 'development',
  devtool: config.dev.devtool,

  devServer: {
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    overlay: config.dev.errorOverlay
      ? {warnings: false, errors: true}
      : false,
    hot: true,
    // proxy: {
    //   '/': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //     secure: false
    //   }
    // }
  },
  module: {
    rules: [
      {
        test: /\.styl(us)$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            // options: {
            //   sourceMap: true
            // }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // open hot function
    // When happening some errors during the bundle stage,
    // this plugin will make sure that it will jump over the print state without console log,
    // so that the bundled resources don't contain errors.
    new webpack.NoEmitOnErrorsPlugin(),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: config.dev.templatePath,
      inject: true,
      bundleName: vendorConfig.vendor.js
    })
  ]
})
