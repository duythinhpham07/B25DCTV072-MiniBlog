import { Link } from 'react-router-dom'
import type { Post } from '../types'

interface PostCardProps {
  post: Post
  authorName?: string
}

export default function PostCard({ post, authorName }: PostCardProps) {
  const excerpt = post.body.length > 120 ? post.body.slice(0, 120) + '...' : post.body

  return (
    <article className="post-card">
      <h2>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h2>
      <p className="post-meta">
        {post.author ? (
          <>
            <span className="badge">Bài của bạn</span> {post.author}
          </>
        ) : (
          (authorName ? `Tác giả: ${authorName}` : `Tác giả #${post.userId}`)
        )}
      </p>
      <p>{excerpt}</p>
    </article>
  )
}
