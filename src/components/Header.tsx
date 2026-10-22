import { Link, NavLink } from 'react-router-dom'

export default function Header() {
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
        </nav>
      </div>
    </header>
  )
}
