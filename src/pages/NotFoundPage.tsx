import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <p className="not-found-code">404</p>
      <h1>Không tìm thấy trang</h1>
      <p>Đường dẫn bạn truy cập không tồn tại hoặc đã bị xóa.</p>
      <Link to="/" className="btn">
        Về trang chủ
      </Link>
    </div>
  )
}
