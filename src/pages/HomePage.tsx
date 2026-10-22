import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { POSTS_URL } from '../api'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import PostCard from '../components/PostCard'
import useFetch from '../hooks/useFetch'
import type { Post } from '../types'
import { getLocalPosts } from '../utils/localPosts'

export default function HomePage() {
  const { data, loading, error } = useFetch<Post[]>(POSTS_URL)
  const [localPosts] = useState(getLocalPosts)
  const [keyword, setKeyword] = useState('')

  const location = useLocation()
  const navigate = useNavigate()
  const [message] = useState((location.state as { message?: string } | null)?.message)

  useEffect(() => {
    if (location.state) navigate(location.pathname, { replace: true, state: null })
  }, [location, navigate])

  const allPosts = [...localPosts, ...(data ?? [])]
  const search = keyword.trim().toLowerCase()
  const filteredPosts = allPosts.filter((post) => post.title.toLowerCase().includes(search))

  return (
    <div>
      <h1>Danh sách bài viết</h1>

      {message && <p className="success-box">{message}</p>}

      <input
        className="search-input"
        type="search"
        placeholder="Tìm kiếm theo tiêu đề..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {loading && <Loading text="Đang tải danh sách bài viết..." />}

      {error && <ErrorMessage message={`Không tải được bài viết từ máy chủ. ${error}`} />}

      {!loading && (!error || localPosts.length > 0) && (
        <>
          <p className="result-count">
            {search ? `Tìm thấy ${filteredPosts.length} bài viết` : `Có ${filteredPosts.length} bài viết`}
          </p>

          {filteredPosts.length === 0 && (
            <p className="empty">
              {search ? `Không có bài viết nào khớp với "${keyword.trim()}".` : 'Chưa có bài viết nào.'}
            </p>
          )}

          <div className="post-list">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
