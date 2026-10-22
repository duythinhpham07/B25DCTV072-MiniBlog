export interface Post {
  id: number
  userId: number
  title: string
  body: string
  author?: string
  createdAt?: string
}

export interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export interface User {
  username: string
}
