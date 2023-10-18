const { BLOG_CONTENT_DIR } = require('./const.cjs')
const readDir = require('./readDir.cjs')
const fs = require('fs')

// Create a regular expression to match <img /> tags and capture the src attribute and everything between the <img> and />
const IMG_SRC_REGEX = /<img\b(.*?)src=['"](.*?)['"](.*?)\/?>/g
const extensions = ['md', 'mdx']

const posts = readDir(BLOG_CONTENT_DIR, extensions)

posts.forEach((post) => {
  const fileContent = fs.readFileSync(post, 'utf8')

  const updatedContent = fileContent.replace(
    IMG_SRC_REGEX,
    (match, beforeSrc, src, afterSrc) => {
      console.log(`transforming ${match}`)
      const webpSrc = src.replace(/\.(jpe?g|png)$/, '.webp')
      return `<img${beforeSrc}src="${webpSrc}"${afterSrc}/>`
    }
  )

  fs.writeFileSync(post, updatedContent, 'utf-8')
})
