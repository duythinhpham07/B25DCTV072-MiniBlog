import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <p className="not-found-code" aria-hidden="true">
        <span>4</span>
        <span>0</span>
        <span>4</span>
      </p>
      <h1>Không tìm thấy trang này</h1>
      <p>Đường dẫn không tồn tại hoặc bài viết đã bị xóa.</p>
      <Link to="/" className="btn">
        Về trang chủ
      </Link>
    </div>
  )
}
