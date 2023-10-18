const readDir = require('./readDir.cjs')
const { BLOG_ASSETS_DIR } = require('./const.cjs')
const { basename, dirname, extname, join } = require('path')
const sharp = require('sharp')

const extensions = ['png', 'jpg', 'jpeg']
const images = readDir(BLOG_ASSETS_DIR, extensions)

console.log(`${images.length} images to be transformed.`)
for (const image of images) {
  const newFileName = basename(image).replace(extname(image), '.webp')
  const output = join(dirname(image), newFileName)

  sharp(image).toFile(output, (err, info) => {
    if (!err) {
      console.log(`${basename(image)} transformed`)
    }
  })
}
