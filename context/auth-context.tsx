import { createContext, ReactNode, useState } from 'react'

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
  user: any
  error: any
  register: (registerObj: RegisterObj) => Promise<void>
  login: (loginObj: LoginObj) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext({} as AuthContextType)

type Props = {
  children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  // Register user
  const register = async (registerObj: RegisterObj) => {
    console.log(registerObj)
  }

  // Login user
  const login = async (loginObj: LoginObj) => {
    const { email: identifier, password } = loginObj
    console.log({identifier, password})
  }

  // Logout user
  const logout = async () => {
    console.log('Logout')
  }

  // check if user is logged in
  const checkUserLoggedIn = async (user: any) => {
    console.log('Check')
  }

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
