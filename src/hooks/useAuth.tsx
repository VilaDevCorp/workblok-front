import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { conf } from '../conf';
import { User } from '../types/entities';
import { useMisc } from './useMisc';
import { ApiError, ApiResponse } from '../types/types';

export interface AuthContext {
  user?: User,
  csrfToken?: string,
  login: (user: string, password: string) => Promise<string>,
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
  const [isCompletedLoad, setIsCompletedLoad] = useState<boolean>(false)
  const { reloadUserInfoFlag } = useMisc()
  const [csrfToken, setCsrfToken] = useState<string>('')

  useEffect(() => {
    loadCsrf()
  }, [])

  useEffect(() => {
    if (csrfToken) {
      reloadUserInfo()
    } else {
      setIsCompletedLoad(true)
    }
  }, [csrfToken, reloadUserInfoFlag])

  interface LoginResponse {
    csrf: string
  }

  const login = async (mail: string, password: string): Promise<string> => {
    const url = `${conf.mainApiUrl}public/login`
    const options: RequestInit = {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ mail, password }),
      headers: new Headers({
        'content-type': 'application/json',
      })
    }
    try {
      const res = await fetch(url, options)
      const result: ApiResponse<unknown> = await res.json()
      if (!res.ok) {
        throw new ApiError({ cause: res.status, message: result.message, errCode: result.errCode })
      }
      console.log(result.obj)
      return (result.obj as LoginResponse).csrf
    } catch (e) {
      throw e
    }
  }

  const authenticate = async (username: string, password: string) => {
    try {
      const csrf = await login(username, password)
      setCsrfToken(csrf)
      localStorage.setItem('csrfToken', csrf)
    } catch (e) {
      throw e
    }
  }

  const logout = () => {
    cleanUserParams()
  }

  const self = async (): Promise<User> => {
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
        const result: ApiResponse<unknown> = await res.json()
        if (!res.ok) {
          throw new ApiError({ cause: res.status, message: result.message, errCode: result.errCode })
        }
        return result.obj as User
      } catch (e) {
        throw e
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
