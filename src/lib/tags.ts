import type { CollectionEntry } from "astro:content"

export function extractTags(post: CollectionEntry<'blog'>): string[] {
    return post.data.tags.map(tag => tag.toLowerCase())
}

export function getTagsByCount(posts: CollectionEntry<'blog'>[]): Map<string, number> {
    return posts
        .map(extractTags)
        .flat()
        .reduce((acc, tag) => acc.set(tag, (acc.get(tag) ?? 0) + 1)
            , new Map<string, number>())
}
