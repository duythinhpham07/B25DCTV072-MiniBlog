const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const POSTS_URL = `${BASE_URL}/posts`

export function postUrl(id: number) {
  return `${BASE_URL}/posts/${id}`
}

export function commentsUrl(postId: number) {
  return `${BASE_URL}/posts/${postId}/comments`
}
