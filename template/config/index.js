/**
 * Webpack's different environment params
 */
const path = require('path')

module.exports = {
  dev: {
    // html template path
    templatePath: path.resolve(__dirname, '../src/index.html'),

    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    host: 'localhost',
    port: 8888,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    devtool: '#cheap-module-eval-source-map',

    useEslint: true,
    showEslintErrorsInOverlay: false
  },
  build: {
    // html template path
    templatePath: path.resolve(__dirname, '../src/index.html'),

    port: 9999,
    // render html dist path
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    devtool: '#source-map',
  }
}
