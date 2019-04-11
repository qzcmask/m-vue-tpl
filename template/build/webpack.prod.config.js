const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HTMLWebpackPlugin = require('html-webpack-plugin')
// const ExtractWebpackPlugin = require('extract-text-webpack-plugin')
// MiniCssExtractPlugin is created to replace ExtractWebpackPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const config = require('../config')
const utils = require('./utils')
const baseWebpackConfig = require('./webpack.base.config')

module.exports = webpackMerge(baseWebpackConfig, {
  mode: 'production',
  entry: {
    app: path.resolve(__dirname, '../src/index.js'),
    // otherEntry: path.resolve(__dirname, '../src/otherEntry.js')
  },
  devtool: config.build.devtool,
  output: {
    path: config.build.assetsRoot,
    // common file
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    // single module file
    // chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'image-webpack-loader',
        // This will apply the loader before the other ones
        enforce: 'pre',
      },
      {
        test: /\.styl(us)$/,
        // use: ExtractWebpackPlugin.extract({
        //   fallback: 'vue-style-loader',
        //   use: [
        //     'css-loader',
        //     {
        //       loader: 'postcss-loader',
        //       options: {
        //         sourceMap: true
        //       }
        //     },
        //     'stylus-loader'
        //   ]
        // })，
        use: [
          MiniCssExtractPlugin.loader,
          // 'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: [
    // new ExtractWebpackPlugin({
    //   filename: utils.assetsPath('css/[name].[contenthash].css'),
    //   // set the following option to `true` if you want to extract CSS from
    //   // codesplit chunks into this main css file as well.
    //   // This will result in *all* of your app's CSS being loaded upfront.
    //   allChunks: false
    // }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // set the following option to `true` if you want to extract CSS from
      // codesplit chunks into this main css file as well.
      // This will result in *all* of your app's CSS being loaded upfront.
      allChunks: false
    }),
    new HTMLWebpackPlugin({
      filename: config.build.index,
      template: config.dev.templatePath,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    // new UglifyJsPlugin({
    //   parallel: true,
    // })
  ],
  optimization: {
    // 配置多个chunk使用cacheGroups组，chunk名为键值，如果只有一个chunk，直接一个配置项，指定name即可
    splitChunks: {
      // 这里开始设定要缓存的chunks
      cacheGroups: {
        // commons是共享entry模块中共同引用的块
        // commons: {
        //   chunks: 'initial',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
        //   minSize: 0,             // 最小尺寸，默认0,
        //   name: 'commons',
        //   minChunks: 2,           // 最小 chunk ，默认1
        //   maxInitialRequests: 5   // 最大初始化请求书，默认1
        // },
        // // 所有引用node_modules的文件
        // vendors: { // vendors名字随便起
        //   test: /node_modules/,   // 正则规则验证，如果符合就提取 chunk
        //   chunks: 'initial',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
        //   name: 'vendors',         // 要缓存的 分隔出来的 chunk 名称
        //   priority: 10,           // 缓存组优先级
        //   enforce: true           // 这里
        // }
      }

    },
    // bundle webpack runtime environment solely
    runtimeChunk: true,
    // defined minimizer personally
    minimizer: [
      new UglifyJsPlugin({
        // exclude the minimized js file,
        // because we think it has been compressed.
        exclude: /\.min\.js$/,
        cache: true,
        // open the parallel compression, so as to use cpu fully
        parallel: true,
        // open this option may make you find the location of errors more easily
        sourceMap: true,
        // remove comments, such as // ...
        extractComments: false,
        uglifyOptions: {
          compress: {
            unused: true,
            warnings: false,
            drop_debugger: true
          },
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g, // default, this plugin will function after css is extracted
        cssProcessor: require('cssnano'), // default
        cssProcessorPluginOptions: {
          preset: ['default', {discardComments: {removeAll: true}}],
        },
        canPrint: true // default
      })
    ]
  }
})

