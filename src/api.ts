const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const POSTS_URL = `${BASE_URL}/posts`
export const USERS_URL = `${BASE_URL}/users`

export function postUrl(id: number) {
  return `${BASE_URL}/posts/${id}`
}

export function userUrl(id: number) {
  return `${BASE_URL}/users/${id}`
}

export function commentsUrl(postId: number) {
  return `${BASE_URL}/posts/${postId}/comments`
}
