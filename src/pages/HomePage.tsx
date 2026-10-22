import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { POSTS_URL, USERS_URL } from '../api'
import AuthorFilter from '../components/AuthorFilter'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import Pagination from '../components/Pagination'
import PostCard from '../components/PostCard'
import useFetch from '../hooks/useFetch'
import useSessionState from '../hooks/useSessionState'
import type { Author, Post } from '../types'
import { getLocalPosts } from '../utils/localPosts'

const PAGE_SIZE = 10

export default function HomePage() {
  const { data, loading, error } = useFetch<Post[]>(POSTS_URL)
  const { data: authors } = useFetch<Author[]>(USERS_URL)
  const [localPosts] = useState(getLocalPosts)
  const [keyword, setKeyword] = useSessionState('miniblog_keyword', '')
  const [authorId, setAuthorId] = useSessionState('miniblog_author', 0)
  const [page, setPage] = useSessionState('miniblog_page', 1)

  const location = useLocation()
  const navigate = useNavigate()
  const [message] = useState((location.state as { message?: string } | null)?.message)

  useEffect(() => {
    if (location.state) navigate(location.pathname, { replace: true, state: null })
  }, [location, navigate])

  const selectedAuthor = authors ? authorId : 0

  const allPosts = [...localPosts, ...(data ?? [])]
  const search = keyword.trim().toLowerCase()
  const filteredPosts = allPosts.filter(
    (post) =>
      (selectedAuthor === 0 || post.userId === selectedAuthor) && post.title.toLowerCase().includes(search),
  )

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pagePosts = filteredPosts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const authorName = (id: number) => authors?.find((author) => author.id === id)?.name
  const ofAuthor = selectedAuthor ? ` của ${authorName(selectedAuthor)}` : ''

  function handleSearch(value: string) {
    setKeyword(value)
    setPage(1)
  }

  function handleSelectAuthor(id: number) {
    setAuthorId(id)
    setPage(1)
  }

  function handlePageChange(newPage: number) {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      <section className="intro">
        <h1 className="intro-title">Hôm nay đọc bài của ai?</h1>
        {authors && <AuthorFilter authors={authors} selected={selectedAuthor} onSelect={handleSelectAuthor} />}
      </section>

      {message && <p className="success-box">{message}</p>}

      <div className="toolbar">
        <input
          className="search-input"
          type="search"
          placeholder="Tìm theo tiêu đề"
          aria-label="Tìm bài viết theo tiêu đề"
          value={keyword}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {!loading && (!error || localPosts.length > 0) && (
          <p className="result-count" aria-live="polite">
            {search
              ? `Tìm thấy ${filteredPosts.length} bài${ofAuthor}`
              : `${filteredPosts.length} bài${ofAuthor || ' viết'}`}
          </p>
        )}
      </div>

      {loading && <Loading text="Đang tải danh sách bài viết..." />}

      {error && <ErrorMessage message={`Không tải được bài viết từ máy chủ. ${error}`} />}

      {!loading && (!error || localPosts.length > 0) && (
        <>
          {filteredPosts.length === 0 && (
            <p className="empty">
              {search
                ? `Không có bài nào${ofAuthor} có tiêu đề chứa "${keyword.trim()}".`
                : 'Chưa có bài viết nào.'}
            </p>
          )}

          <div className="post-list">
            {pagePosts.map((post) => (
              <PostCard key={post.id} post={post} authorName={authorName(post.userId)} />
            ))}
          </div>

          <Pagination page={currentPage} totalPages={totalPages} onChange={handlePageChange} />
        </>
      )}
    </div>
  )
}
