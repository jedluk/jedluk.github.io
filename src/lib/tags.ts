import type { CollectionEntry } from 'astro:content'

export type TagTuple = [string, number]

export function extractTags(post: CollectionEntry<'blog'>): string[] {
  return post.data.tags.map((tag) => tag.toLowerCase())
}


// sort unique tags by count first and then by name
export function getTagsByCount(posts: CollectionEntry<'blog'>[]): TagTuple[] {
  const tagsCountMap = posts
    .map(extractTags)
    .flat()
    .reduce(
      (acc, tag) => acc.set(tag, (acc.get(tag) ?? 0) + 1),
      new Map<string, number>()
    )

  return Array.from(tagsCountMap.entries()).sort(
    ([name1, count1], [name2, count2]) =>
      count1 === count2
        ? name1 > name2 ? 1 : -1
        : count2 > count1 ? 1 : -1
  )
}

export type YearTuple = [number, number]

export function getTagsByYear(posts: CollectionEntry<'blog'>[]): YearTuple[] {
  const tags = posts.reduce((acc, post) => {
    const year = post.data.pubDate.getFullYear()
    return acc.set(year, 1 + (acc.get(year) ?? 0))
  }, new Map<number, number>())

  return Array.from(tags.entries()).sort(([year1], [year2]) => year2 > year1 ? 1 : -1)
}