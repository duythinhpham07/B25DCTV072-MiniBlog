import type { Post } from '../types'

const KEY = 'miniblog_posts'

export function getLocalPosts(): Post[] {
  try {
    const saved = localStorage.getItem(KEY)
    if (!saved) return []
    const posts = JSON.parse(saved)
    return Array.isArray(posts) ? posts : []
  } catch {
    return []
  }
}

export function getLocalPost(id: number): Post | undefined {
  return getLocalPosts().find((post) => post.id === id)
}

export function addLocalPost(post: Post) {
  const posts = [post, ...getLocalPosts()]
  localStorage.setItem(KEY, JSON.stringify(posts))
}
