import { Link, useNavigate, useParams } from 'react-router-dom'
import { commentsUrl, postUrl, userUrl } from '../api'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import { useAuth } from '../context/AuthContext'
import useFetch from '../hooks/useFetch'
import type { Author, Comment, Post } from '../types'
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

  return (
    <div>
      <Link to="/" className="back-link">
        ← Quay lại danh sách
      </Link>

      {postFetch.loading && <Loading text="Đang tải bài viết..." />}

      {postFetch.error && <ErrorMessage message={`Không tải được bài viết. ${postFetch.error}`} />}

      {post && !postFetch.loading && (
        <>
          <article className="post-detail">
            <h1>{post.title}</h1>
            <p className="post-meta">
              {post.author
                ? `Đăng bởi ${post.author} lúc ${new Date(post.createdAt ?? '').toLocaleString('vi-VN')}`
                : authorFetch.loading
                  ? 'Tác giả: đang tải...'
                  : authorFetch.data
                    ? `Tác giả: ${authorFetch.data.name} (${authorFetch.data.email})`
                    : `Tác giả #${post.userId}`}
            </p>
            <p className="post-body">{post.body}</p>

            {canDelete && (
              <button className="btn btn-danger post-delete" onClick={handleDelete}>
                Xóa bài viết
              </button>
            )}
          </article>

          <section className="comments">
            <h2>Bình luận {!commentsFetch.loading && !commentsFetch.error && `(${comments.length})`}</h2>

            {commentsFetch.loading && <Loading text="Đang tải bình luận..." />}

            {commentsFetch.error && (
              <ErrorMessage message={`Không tải được bình luận. ${commentsFetch.error}`} />
            )}

            {!commentsFetch.loading && !commentsFetch.error && comments.length === 0 && (
              <p className="empty">Chưa có bình luận nào.</p>
            )}

            {comments.map((comment) => (
              <div className="comment" key={comment.id}>
                <p className="comment-name">{comment.name}</p>
                <p className="comment-email">{comment.email}</p>
                <p>{comment.body}</p>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  )
}
