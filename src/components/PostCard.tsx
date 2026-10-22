import { Link } from 'react-router-dom'
import type { Post } from '../types'

export default function PostCard({ post }: { post: Post }) {
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
          `Tác giả #${post.userId}`
        )}
      </p>
      <p>{excerpt}</p>
    </article>
  )
}
