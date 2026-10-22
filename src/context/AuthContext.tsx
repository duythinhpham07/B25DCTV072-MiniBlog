import { createContext, useContext, useState, type ReactNode } from 'react'
import type { User } from '../types'

const ACCOUNT = { username: 'admin', password: '123456' }
const KEY = 'miniblog_user'

interface AuthContextValue {
  user: User | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function getSavedUser(): User | null {
  try {
    const saved = localStorage.getItem(KEY)
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getSavedUser)

  function login(username: string, password: string) {
    if (username !== ACCOUNT.username || password !== ACCOUNT.password) {
      return false
    }
    const newUser = { username }
    setUser(newUser)
    localStorage.setItem(KEY, JSON.stringify(newUser))
    return true
  }

  function logout() {
    setUser(null)
    localStorage.removeItem(KEY)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth phải dùng bên trong AuthProvider')
  return context
}
