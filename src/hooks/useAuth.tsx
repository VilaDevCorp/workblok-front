import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { conf } from '../conf';
import { User } from '../types/entities';
import { useMisc } from './useMisc';
import { ApiError, ApiResponse } from '../types/types';
import moment from 'moment';
import StatusCode from 'status-code-enum';

export interface AuthContext {
  user?: User,
  weekCompletedPercentage: number,
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
  const [weekCompletedPercentage, setWeekCompletedPercentage] = useState<number>(0)
  const { reloadUserInfoFlag, reloadWeekPercentageFlag } = useMisc()
  const [csrfToken, setCsrfToken] = useState<string>('')
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL

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

  useEffect(() => {
    reloadWeekPercentage()
  }, [reloadWeekPercentageFlag, user])

  interface LoginResponse {
    csrf: string
  }

  const login = async (mail: string, password: string): Promise<string> => {
    const url = `${apiUrl}public/login`
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
      return (result.obj as LoginResponse).csrf
    } catch (e) {
      throw e
    }
  }

  const authenticate = async (username: string, password: string) => {
    try {
      const csrf = await login(username.toLowerCase().trim(), password)
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

  const getWeekCompletedPercentage = async (userId: string): Promise<number> => {
    const startWeekMoment = moment().get('weekday') > 0 ? moment().set('weekday', 1) : moment().subtract(1, 'week').set('weekday', 1)
    const startDate = moment([startWeekMoment.year(), startWeekMoment.month(), startWeekMoment.date()]).toDate()
    const url = `${apiUrl}private/task/completedWeekPercentage`
    const options: RequestInit = {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ userId: userId, startDate: moment(startDate).format(conf.dateInputFormat) }),
      headers: new Headers({
        'X-API-CSRF': csrfToken ? csrfToken : '',
        'content-type': 'application/json',
      })
    }
    let result: number
    try {
      const res = await fetch(url, options)
      const resObject: ApiResponse<number> = await res.json()
      if (!res.ok) {
        throw new ApiError({ cause: res.status, message: resObject.message, errCode: resObject.errCode })
      }
      result = resObject.obj
    } catch (e) {
      throw e
    }
    return result
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
      const weekCompletedPercentageResult = await getWeekCompletedPercentage(ownUser.id)
      setWeekCompletedPercentage(weekCompletedPercentageResult)
    } catch (e) {
      logout()
    }
    setIsCompletedLoad(() => true)
  }

  const reloadWeekPercentage = async () => {
    if (user) {
      const weekCompletedPercentageResult = await getWeekCompletedPercentage(user.id)
      setWeekCompletedPercentage(weekCompletedPercentageResult)
    }
  }


  const cleanUserParams = async () => {
    localStorage.setItem("csrfToken", "")
    setCsrfToken('')
    setUser(undefined)
  }


  const value: AuthContext = {
    user,
    csrfToken,
    weekCompletedPercentage,
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
