import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts'

export async function GET(context) {
  const posts = await getCollection('blog')
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    xmlns: {
      media: 'http://search.yahoo.com/mrss/'
    },
    items: posts.map((post) => ({
      ...post.data,
      author: 'jedrzej.lukasiuk@gmail.com',
      link: `/blog/${post.slug}/`,
      customData: `<media:content
        type="image/${/\.jpe?g/.test(post.data.heroImage) ? 'jpeg' : 'png'}"
        width="320"
        height="440"
        medium="image"
        url="${post.data.heroImage}" />
      `
    }))
  })
}
