const webpack = require('webpack')
const path = require('path')
// const packageJson = require('../package.json')
const AssetsPlugin = require('assets-webpack-plugin')

module.exports = {
  entry: {
    // you can specific vendor as a import js
    // vendor: [path.join(__dirname, '../src', 'vendor.js')]
    vendor: ['vue', 'vuex', 'vue-router']
    // the following usage will occur an error, possibly owing to using babel-runtime dependency
    // vendor: Object.keys(packageJson.dependencies).filter(item => {
    //   // the item will remain when filter function return true
    //   return item.indexOf('normalize') < 0
    // })
  },

  output: {
    path: path.join(__dirname, '../static'),
    filename: 'dll.[name].js',
    // bundle as a library
    library: '[name]'
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../', '[name]-manifest.json'),
      name: '[name]'
    }),
    new AssetsPlugin({
      filename: 'vendor-config.json',
      path: path.join(__dirname, '../')
    })
  ]
}
