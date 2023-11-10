const { BLOG_CONTENT_DIR } = require('./const.cjs')
const readDir = require('./readDir.cjs')
const fs = require('fs')

// Regular expression to match <img /> tags and capture the src attribute and everything between the <img and />
const IMG_SRC_REGEX = /<img\b(.*?)src=['"](.*?)['"](.*?)\/?>/g
const extensions = ['md', 'mdx']

const posts = readDir(BLOG_CONTENT_DIR, extensions)

posts.forEach((post) => {
  const fileContent = fs.readFileSync(post, 'utf8')

  const updatedContent = fileContent.replace(
    IMG_SRC_REGEX,
    (match, beforeSrc, imgSrc, afterSrc) => {
      console.log(`transforming ${match}`)
      const basename = imgSrc.slice(0, imgSrc.lastIndexOf('.'))

      const src = `${basename}_small.webp`
      const srcset = `${basename}_medium.webp 600w, ${basename}_large.webp 900w`
      const sizes = '(max-width: 600px) 100vw, (max-width: 900px) 50vw'

      return `<img${beforeSrc}src="${src}" srcset="${srcset}" sizes="${sizes}"${afterSrc}/>`
    }
  )

  fs.writeFileSync(post, updatedContent, 'utf-8')
})
