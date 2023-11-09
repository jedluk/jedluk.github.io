const readDir = require('./readDir.cjs')
const { BLOG_ASSETS_DIR } = require('./const.cjs')
const { basename, dirname, extname, join } = require('path')
const sharp = require('sharp')

const extensions = ['png', 'jpg', 'jpeg']
const images = readDir(BLOG_ASSETS_DIR, extensions)

console.log(`${images.length} images to be transformed.`)
for (const image of images) {
  const baseFileName = basename(image).replace(extname(image), '')

  const SIZE_TO_WIDTH = {
    small: 600,
    medium: 900,
    large: undefined // no width change
  }

  Object.keys(SIZE_TO_WIDTH).forEach(async (size) => {
    const fileName = `${baseFileName}_${size}.webp`
    const output = join(dirname(image), fileName)

    await sharp(image)
      .resize(SIZE_TO_WIDTH[size])
      .toFile(output)
      .then((data) => {
        console.log(`Generated ${fileName}`)
      })
      .catch((err) => {
        console.err(err)
        console.log(`Cannot transform ${image} into ${fileName}`)
      })
  })
}
