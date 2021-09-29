import { useRouter } from 'next/router'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { NEXT_URL } from '../config'
import { User } from '../typings'

type Data = {
  user?: User
  message?: string
}

type LoginObj = {
  email: string
  password: string
}

type RegisterObj = {
  username: string
  email: string
  password: string
}

type AuthContextType = {
  user: User | null
  error: string
  register: (registerObj: RegisterObj) => Promise<void>
  login: (loginObj: LoginObj) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext({} as AuthContextType)

type Props = {
  children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    checkUserLoggedIn()
  }, [])

  const router = useRouter()

  // Register user
  const register = async (registerObj: RegisterObj) => {
    const { username, email, password } = registerObj
    const response = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })
    const data = await response.json() as Data
    if (response.ok) {
      setUser(data.user!)
      router.push('/account/dashboard')
    } else {
      setError(data.message!)
      setError('')
    }
  }

  // Login user
  const login = async (loginObj: LoginObj) => {
    const { email: identifier, password } = loginObj
    const response = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password })
    })
    const data = await response.json() as Data
    if (response.ok) {
      setUser(data.user!)
      router.push('/account/dashboard')
    } else {
      setError(data.message!)
      setError('')
    }
  }

  // Logout user
  const logout = async () => {
    const response = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST'
    })
    if (response.ok) {
      setUser(null)
      router.push('/')
    }
  }

  // check if user is logged in
  const checkUserLoggedIn = async () => {
    const response = await fetch(`${NEXT_URL}/api/user`)
    const data = await response.json()
    if (response.ok) {
      setUser(data.user)
    } else {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
