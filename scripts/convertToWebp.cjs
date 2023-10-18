const readDir = require('./readBlogDir.cjs')
const { basename, dirname, extname, join } = require('path')
const sharp = require('sharp')

const extensions = ['png', 'jpg', 'jpeg']
const images = readDir(extensions)

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
