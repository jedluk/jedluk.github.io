const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const BLOG_ASSETS_DIR = path.join(__dirname, '..', 'public', 'blog')

const isDirectory = (thing) =>
  fs.lstatSync(path.join(BLOG_ASSETS_DIR, thing)).isDirectory()

fs.readdirSync(BLOG_ASSETS_DIR)
  .filter(isDirectory)
  .forEach((folder) => {
    fs.readdirSync(path.join(BLOG_ASSETS_DIR, folder)).forEach((file) => {
      const nameChunks = file.split('.')
      const extension = nameChunks.pop()
      const fileName = nameChunks.join('')

      if (['png', 'jpg', 'jpeg'].includes(extension)) {
        const input = path.join(BLOG_ASSETS_DIR, folder, file)
        const output = path.join(BLOG_ASSETS_DIR, folder, `${fileName}.webp`)

        sharp(input).toFile(output, (err, info) => {
          if (err) {
            console.warn(err)
          } else {
            console.log(`converted: ${file} => ${fileName}.webp`)
          }
        })
      }
    })
  })
