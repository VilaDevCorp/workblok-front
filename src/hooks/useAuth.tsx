import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { conf } from '../conf';
import { User } from '../types/entities';
import { useMisc } from './useMisc';
import { ApiError, ApiResponse } from '../types/types';
import { useQuery } from 'react-query';

export interface AuthContext {
  user?: User,
  csrfToken?: string,
  login: (user: string, password: string) => Promise<string>,
  authenticate: (email: string, password: string, rememberMe: boolean) => void,
  logout: () => void,
  isLoadingUserInfo: boolean
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
  const [csrfToken, setCsrfToken] = useState<string>('')
  const [user, setUser] = useState<User | undefined>(undefined)
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL


  useEffect(() => {
    loadCsrf()
  }, [])

  useEffect(() => {
    reloadUserInfo()
  }, [csrfToken])


  const self = async (): Promise<User | undefined> => {
    if (csrfToken) {
      const url = `${apiUrl}private/self`
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
      throw new Error('No csrf token')
    }
  }


  const { isLoading: isLoadingUserInfo, refetch: reloadUserInfo } = useQuery(['userInfo', csrfToken], self,
    {
      retry: false,
      onSuccess(data) {
        setUser(data)
      },
      onError(err) {
        setUser(undefined)
      }
    })


  interface LoginResponse {
    csrf: string
  }

  const login = async (email: string, password: string): Promise<string> => {
    const url = `${apiUrl}public/login`
    const options: RequestInit = {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ email, password }),
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
      return (result.obj as LoginResponse).csrf
    } catch (e) {
      throw e
    }
  }

  const authenticate = async (email: string, password: string, rememberMe: boolean) => {
    try {
      const csrf = await login(email.toLowerCase().trim(), password)
      setCsrfToken(csrf)

      if (rememberMe) {
        localStorage.setItem('csrfToken', csrf)
      } else {
        sessionStorage.setItem('csrfToken', csrf)
      }
    } catch (e) {
      throw e
    }
  }

  const logout = () => {
    cleanUserParams()
  }



  const loadCsrf = () => {
    if (!csrfToken) {
      let csrf = localStorage.getItem('csrfToken')
      if (!csrf) {
        csrf = sessionStorage.getItem('csrfToken')
      }
      if (csrf) {
        setCsrfToken(csrf)
      }
    }
  }


  const cleanUserParams = () => {
    sessionStorage.setItem("csrfToken", "")
    localStorage.setItem("csrfToken", "")
    setCsrfToken('')
  }


  const value: AuthContext = {
    user,
    csrfToken,
    login,
    authenticate,
    logout,
    isLoadingUserInfo
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
