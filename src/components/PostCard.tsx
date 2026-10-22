import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { Post } from '../types'
import { authorColor } from '../utils/authors'
import Avatar from './Avatar'

interface PostCardProps {
  post: Post
  authorName?: string
}

export default function PostCard({ post, authorName }: PostCardProps) {
  const excerpt = post.body.length > 140 ? post.body.slice(0, 140) + '...' : post.body
  const name = post.author ?? authorName ?? `Tác giả #${post.userId}`

  return (
    <article className="post-row" style={{ '--author': authorColor(post.userId).bg } as CSSProperties}>
      <h2 className="post-row-title">
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h2>
      <p className="post-row-excerpt">{excerpt}</p>
      <p className="post-row-meta">
        <Avatar name={name} colorId={post.userId} size="sm" />
        <span>{name}</span>
        {post.author && <span className="badge">Bài của bạn</span>}
      </p>
    </article>
  )
}
