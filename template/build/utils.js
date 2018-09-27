const path = require('path')
const config = require('../config')
const isDev = process.env.NODE_ENV === 'development'

exports.assetsPath = function(_path) {
  const assetsSubDirectory = isDev
    ? config.dev.assetsSubDirectory
    : config.build.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}
