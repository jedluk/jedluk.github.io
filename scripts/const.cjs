const { join } = require('path')

module.exports = {
  BLOG_ASSETS_DIR: join(__dirname, '..', 'public', 'blog'),
  BLOG_CONTENT_DIR: join(__dirname, '..', 'src', 'content', 'blog'),
}
