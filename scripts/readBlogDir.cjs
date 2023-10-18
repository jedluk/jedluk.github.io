const fs = require('fs')
const { join, resolve } = require('path')

const BLOG_ASSETS_DIR = join(__dirname, '..', 'public', 'blog')

const isFile = (thing) => fs.lstatSync(join(BLOG_ASSETS_DIR, thing)).isFile()

function readBlogDir(extensions = []) {
  return fs
    .readdirSync(BLOG_ASSETS_DIR, { recursive: true })
    .filter(isFile)
    .filter((file) => extensions.includes(file.split('.').pop().toLowerCase()))
    .map((file) => resolve(join(BLOG_ASSETS_DIR, file)))
}

module.exports = readBlogDir
