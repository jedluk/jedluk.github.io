const fs = require('fs')
const { join, resolve, extname } = require('path')

function readDir(baseDir, extensions = []) {
  return fs
    .readdirSync(baseDir, { recursive: true })
    .filter((thing) => fs.lstatSync(join(baseDir, thing)).isFile())
    .filter((file) => extensions.includes(extname(file).toLowerCase().slice(1)))
    .map((file) => resolve(join(baseDir, file)))
}

module.exports = readDir
