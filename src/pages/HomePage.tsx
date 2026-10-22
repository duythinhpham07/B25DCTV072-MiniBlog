import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { POSTS_URL } from '../api'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import Pagination from '../components/Pagination'
import PostCard from '../components/PostCard'
import useFetch from '../hooks/useFetch'
import useSessionState from '../hooks/useSessionState'
import type { Post } from '../types'
import { getLocalPosts } from '../utils/localPosts'

const PAGE_SIZE = 10

export default function HomePage() {
  const { data, loading, error } = useFetch<Post[]>(POSTS_URL)
  const [localPosts] = useState(getLocalPosts)
  const [keyword, setKeyword] = useSessionState('miniblog_keyword', '')
  const [page, setPage] = useSessionState('miniblog_page', 1)

  const location = useLocation()
  const navigate = useNavigate()
  const [message] = useState((location.state as { message?: string } | null)?.message)

  useEffect(() => {
    if (location.state) navigate(location.pathname, { replace: true, state: null })
  }, [location, navigate])

  const allPosts = [...localPosts, ...(data ?? [])]
  const search = keyword.trim().toLowerCase()
  const filteredPosts = allPosts.filter((post) => post.title.toLowerCase().includes(search))

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pagePosts = filteredPosts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function handleSearch(value: string) {
    setKeyword(value)
    setPage(1)
  }

  function handlePageChange(newPage: number) {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      <h1>Danh sách bài viết</h1>

      {message && <p className="success-box">{message}</p>}

      <input
        className="search-input"
        type="search"
        placeholder="Tìm kiếm theo tiêu đề..."
        value={keyword}
        onChange={(e) => handleSearch(e.target.value)}
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
            {pagePosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <Pagination page={currentPage} totalPages={totalPages} onChange={handlePageChange} />
        </>
      )}
    </div>
  )
}
