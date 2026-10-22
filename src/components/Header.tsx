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
            aria-label={theme === 'light' ? 'Chuyển sang giao diện tối' : 'Chuyển sang giao diện sáng'}
            title={theme === 'light' ? 'Giao diện tối' : 'Giao diện sáng'}
          >
            {theme === 'light' ? (
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="currentColor" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <circle cx="12" cy="12" r="4.5" fill="currentColor" />
                <path
                  d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>

          {user ? (
            <>
              <span className="greeting">
                Chào, <b>{user.username}</b>
              </span>
              <button className="btn btn-ghost" onClick={logout}>
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
