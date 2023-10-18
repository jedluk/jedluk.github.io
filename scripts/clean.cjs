const readDir = require('./readDir.cjs')
const { BLOG_ASSETS_DIR } = require('./const.cjs')
const fs = require('fs')

const [, , extensions = ['webp']] = process.argv

const filesToRemove = readDir(BLOG_ASSETS_DIR, extensions)
filesToRemove.forEach((file) => fs.unlinkSync(file))

console.log(`${filesToRemove.length} file(s) removed. Bye.`)
