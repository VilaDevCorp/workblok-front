import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { conf } from '../conf';
import { User } from '../types/entities';
import { useMisc } from './useMisc';

interface LoginResult {
  csrf: string
}

export interface AuthContext {
  user?: User,
  csrfToken?: string,
  login: (user: string, password: string) => Promise<LoginResult>,
  authenticate: (username: string, password: string) => void,
  logout: () => void,
  isCompletedLoad: boolean
}

const AuthContext = createContext<AuthContext>({} as any)

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (ctx === null) {
    throw new Error('useAuth() can only be used on the descendants of AuthProvider')
  } else {
    return ctx
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUser] = useState<User | undefined>(undefined)
  const [isCompletedLoad, setIsCompletedLoad] = useState<boolean>(true)
  const { reloadUserInfoFlag } = useMisc()
  const [csrfToken, setCsrfToken] = useState<string>('')

  useEffect(() => {
    loadCsrf()
  }, [])

  useEffect(() => {
    if (csrfToken) {
      reloadUserInfo()
    }
  }, [csrfToken, reloadUserInfoFlag])

  const login = async (user: string, password: string) => {
    const url = `${conf.mainApiUrl}public/login`
    const options: RequestInit = {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ username: user, password }),
      headers: new Headers({
        'content-type': 'application/json',
      })
    }
    try {
      const res = await fetch(url, options)
      if (!res.ok) {
        throw new Error(JSON.stringify(res))
      }
      const result = await res.json()
      return result
    } catch (e) {
      throw Error('Error al realizar el login')
    }
  }

  const authenticate = async (username: string, password: string) => {
    try {
      const result = await login(username, password)
      setCsrfToken(result.obj.csrf)
      localStorage.setItem('csrfToken', result.obj.csrf)
    } catch (e) {
      cleanUserParams()
    }
    // if (user !== undefined) {
    //   setUser(user)
    // } else {
    //   cleanUserParams()
    // }
  }

  const logout = () => {
    cleanUserParams()
  }

  const self = async () => {
    if (csrfToken) {

      const url = `${conf.mainApiUrl}private/self`
      const options: RequestInit = {
        method: 'GET',
        headers: new Headers({
          'X-API-CSRF': csrfToken ? csrfToken : ''
        }),
        credentials: 'include'
      }
      try {
        const res = await fetch(url, options)
        if (!res.ok) {
          throw new Error(JSON.stringify(res))
        }
        const result = await res.json()
        return result.obj
      } catch (e) {
        throw Error('Error al realizar el login')
      }
    } else {
      throw Error('Error al realizar el login')
    }
  }


  const loadCsrf = () => {
    if (!csrfToken) {
      const csrf = localStorage.getItem('csrfToken')
      if (csrf) {
        setCsrfToken(csrf)
      }
    }
  }

  const reloadUserInfo = async () => {
    setIsCompletedLoad(() => false)
    let ownUser: User | undefined = undefined
    try {
      const ownUser = await self()
      if (ownUser !== undefined) {
        setUser(ownUser)
      } else {
        cleanUserParams()
      }
    } catch (e) {
      cleanUserParams()
    }
    setIsCompletedLoad(() => true)
  }


  const cleanUserParams = async () => {
    localStorage.setItem("csrfToken", "")
    setCsrfToken('')
    setUser(undefined)
  }


  const value: AuthContext = {
    user,
    csrfToken,
    login,
    authenticate,
    logout,
    isCompletedLoad
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
