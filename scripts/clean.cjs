const readBlogDir = require('./readBlogDir.cjs')
const fs = require('fs')

const [, , extensions = ['webp']] = process.argv

const filesToRemove = readBlogDir(extensions)
filesToRemove.forEach((file) => fs.unlinkSync(file))
console.log(`${filesToRemove.length} file(s) removed. Bye.`)
