#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const currentPath = process.cwd()

/**
 * Copy one dir to another
 *
 * @param fromBasePath  the source path(just a reference)
 * @param toBasePath    the new path(will create new file)
 * @param dirs          the children of the fromBasePath
 * @returns {Promise}
 */
const copyDir = (fromBasePath, toBasePath, dirs) => new Promise((resolve, reject) => {
  dirs.forEach(dir => {
    let fromFullDirPath = path.join(fromBasePath, dir)
    let toFullDirPath = path.join(toBasePath, dir)
    let stats = fs.statSync(fromFullDirPath)
    let isDir = stats.isDirectory()

    if (isDir) {
      fs.mkdirSync(toFullDirPath)
      // judge fromFullDirPath whether it has children
      let ds = fs.readdirSync(fromFullDirPath)
      if (ds.length) {
        Promise.resolve(copyDir(fromFullDirPath, toFullDirPath, ds))
      } else {
        resolve()
      }
    } else {
      fs.copyFile(fromFullDirPath, toFullDirPath, (err) => {
        err ? reject(err) : resolve()
      })
    }
  })
})

const run = (args) => {
  let option = args[0]

  switch (option) {
    case '-v':
    case "--version":
      console.log('v0.0.1')
      break

    case '-n':
    case '--new':
      // make template
      let projectName = args[1]
      if (!projectName) {
        return console.error(`[m-vue-tpl] you must specific the project name, such as "m-vue-tpl -n projectName"`)
      }

      let fromBasePath = path.join(__dirname, '../template')
      let toBasePath = path.join(currentPath, projectName)

      if (!fs.existsSync(toBasePath)) {
        fs.mkdirSync(toBasePath)
      } else {
        return console.error(`[m-vue-tpl] this project "${projectName}" has existed, please input unique project name.`)
      }

      const dirs = fs.readdirSync(fromBasePath)

      console.log(`[m-vue-tpl] it is ready to init project "${projectName}"...`)
      console.log(`> loading ............`)
      copyDir(fromBasePath, toBasePath, dirs).then(_ => {
        console.log(`[m-vue-tpl] init project "${projectName}" successfully.`)
        console.log(``)
        console.log(``)
        console.log(`[m-vue-tpl] execute the following commands to run you app`)
        console.log(``)
        console.log(`       cd ${projectName} && npm install`)
        console.log(`       npm run dll`)
        console.log(`       npm run dev or npm run build`)
      }).catch(err => {
        console.log(`[m-vue-tpl] init project "${projectName}" erroneously. The reason is : ${err}`)
      })
      break

    case '-h':
    case '--help':
    default:
      console.log(`[Usages]: `)
      console.log(``)
      console.log(`{-v|--version}      version`)
      console.log(`{-n|--new param}    init project with m-vue-tpl`)
      console.log(`{-h|--help}         help`)
      break
  }
}

// process.argv[0] is node'path,  process.argv[1] is current filename
run(process.argv.slice(2))
