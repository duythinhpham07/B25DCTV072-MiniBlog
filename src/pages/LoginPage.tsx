import { useState, type FormEvent } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { user, login } = useAuth()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const from = (location.state as { from?: string } | null)?.from ?? '/'

  if (user) return <Navigate to={from} replace />

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!username.trim() || !password) {
      setError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.')
      return
    }

    if (!login(username.trim(), password)) {
      setError('Sai tên đăng nhập hoặc mật khẩu.')
      setPassword('')
    }
  }

  return (
    <div className="form-page">
      <h1>Đăng nhập</h1>
      {from !== '/' && <p className="info-box">Bạn cần đăng nhập để tiếp tục.</p>}

      <form className="form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="username">Tên đăng nhập</label>
        <input
          id="username"
          value={username}
          autoComplete="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Mật khẩu</label>
        <input
          id="password"
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="field-error">{error}</p>}

        <button type="submit" className="btn">
          Đăng nhập
        </button>
      </form>

      <p className="hint">
        Tài khoản thử: <code>admin</code> / <code>123456</code>
      </p>
    </div>
  )
}
