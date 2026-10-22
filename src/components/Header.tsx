import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import useTheme from '../hooks/useTheme'

export default function Header() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          MiniBlog
        </Link>

        <nav className="nav">
          <NavLink to="/" end>
            Trang chủ
          </NavLink>
          <NavLink to="/new">Viết bài</NavLink>
        </nav>

        <div className="user-box">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={theme === 'light' ? 'Chuyển sang giao diện tối' : 'Chuyển sang giao diện sáng'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {user ? (
            <>
              <span>
                Xin chào, <b>{user.username}</b>
              </span>
              <button className="btn btn-outline" onClick={logout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <Link to="/login" className="btn">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
