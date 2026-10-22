import { Link, useNavigate, useParams } from 'react-router-dom'
import { commentsUrl, postUrl, userUrl } from '../api'
import Avatar from '../components/Avatar'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import { useAuth } from '../context/AuthContext'
import useFetch from '../hooks/useFetch'
import type { Author, Comment, Post } from '../types'
import { authorColor } from '../utils/authors'
import { deleteLocalPost, getLocalPost } from '../utils/localPosts'
import NotFoundPage from './NotFoundPage'

export default function PostDetailPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { id } = useParams()
  const postId = Number(id)
  const validId = Number.isInteger(postId) && postId > 0

  const localPost = validId ? getLocalPost(postId) : undefined
  const callApi = validId && !localPost

  const postFetch = useFetch<Post>(callApi ? postUrl(postId) : null)
  const commentsFetch = useFetch<Comment[]>(callApi ? commentsUrl(postId) : null)
  const authorFetch = useFetch<Author>(postFetch.data ? userUrl(postFetch.data.userId) : null)

  if (!validId || postFetch.notFound) return <NotFoundPage />

  const post = localPost ?? postFetch.data
  const comments = localPost ? [] : (commentsFetch.data ?? [])

  const canDelete = localPost !== undefined && user?.username === localPost.author

  function handleDelete() {
    if (!window.confirm('Bạn có chắc muốn xóa bài viết này?')) return
    deleteLocalPost(postId)
    navigate('/', { state: { message: 'Đã xóa bài viết.' } })
  }

  const color = authorColor(post?.userId ?? 0)
  const authorLabel = post?.author
    ? post.author
    : authorFetch.loading
      ? 'Đang tải tác giả...'
      : (authorFetch.data?.name ?? `Tác giả #${post?.userId}`)

  return (
    <div>
      <Link to="/" className="back-link">
        ← Quay lại danh sách
      </Link>

      {postFetch.loading && <Loading text="Đang tải bài viết..." />}

      {postFetch.error && <ErrorMessage message={`Không tải được bài viết. ${postFetch.error}`} />}

      {post && !postFetch.loading && (
        <>
          <article className="article">
            <header className="article-head" style={{ background: color.bg, color: color.on }}>
              <h1 className="article-title">{post.title}</h1>
              <div className="article-byline">
                <Avatar name={authorLabel} colorId={post.userId} size="md" />
                <div>
                  <p className="article-author">{authorLabel}</p>
                  <p className="article-sub">
                    {post.author
                      ? `Đăng lúc ${new Date(post.createdAt ?? '').toLocaleString('vi-VN')}`
                      : authorFetch.data?.email}
                  </p>
                </div>
              </div>
            </header>

            <div className="article-body">
              <p>{post.body}</p>

              {canDelete && (
                <button className="btn btn-danger" onClick={handleDelete}>
                  Xóa bài viết
                </button>
              )}
            </div>
          </article>

          <section className="comments" aria-labelledby="comments-title">
            <h2 id="comments-title">
              {commentsFetch.loading || commentsFetch.error ? 'Bình luận' : `${comments.length} bình luận`}
            </h2>

            {commentsFetch.loading && <Loading text="Đang tải bình luận..." />}

            {commentsFetch.error && (
              <ErrorMessage message={`Không tải được bình luận. ${commentsFetch.error}`} />
            )}

            {!commentsFetch.loading && !commentsFetch.error && comments.length === 0 && (
              <p className="empty">Chưa có bình luận nào.</p>
            )}

            {comments.map((comment) => (
              <div className="comment" key={comment.id}>
                <Avatar name={comment.email} colorId={(comment.id % 10) + 1} size="sm" />
                <div>
                  <p className="comment-email">{comment.email}</p>
                  <p className="comment-name">{comment.name}</p>
                  <p className="comment-body">{comment.body}</p>
                </div>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  )
}
