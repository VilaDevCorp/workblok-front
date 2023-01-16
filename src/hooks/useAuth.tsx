import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Rol, User } from '../types/entities';
import { RolEnum } from '../types/types';
import { useApi } from './useApi';
import { useNavigate } from 'react-router-dom';

export interface AuthContext {
  isAuth: boolean
  user?: User
  id?: string,
  login: (user: string, password: string) => void,
  logout: () => void,
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>,
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

  const [isAuth, setIsAuth] = useState(true)
  const [authChange, setAuthChange] = useState(false)
  const [rol, setRol] = useState<Rol | undefined>(undefined)
  const [id, setId] = useState<string | undefined>(undefined)
  const [user, setUser] = useState<User | undefined>(undefined)
  const [isCompletedLoad, setIsCompletedLoad] = useState<boolean>(false)
  const { fakeDelay } = useApi()




  useEffect(() => {
    setUser({id: 'a7c467ce-6062-11ed-9f5a-9822efc702f8', name: 'davidvilas'})
    reloadUserInfo()
  }, [authChange])

  const login = async () => {
    let user: User | undefined = undefined
    try {
      await fakeDelay(500)
      user = { id: '123' }
    } catch (e) {
      cleanUserParams()
    }
    if (user !== undefined) {
      setUserParams(user)
    } else {
      cleanUserParams()
    }
    setAuthChange((old) => !old)
  }

  const logout = async () => {
    let user: User | undefined = undefined
    try {
      await fakeDelay(500)
    } catch (e) {
      cleanUserParams()
    }
    cleanUserParams()
    setAuthChange((old) => !old)
  }


  const reloadUserInfo = async () => {
    setIsCompletedLoad(() => false)
    let user: User | undefined = undefined
    try {
      await fakeDelay(500)
      // user = {id:'1'}
      user = undefined
    } catch (e) {
      cleanUserParams()
    }
    if (user !== undefined) {
      setUserParams(user)
    } else {
      cleanUserParams()
    }
    setIsCompletedLoad(() => true)
  }

  const setUserParams = async (user: User) => {
    if (user !== undefined) {
      setIsAuth(() => true)
      setId(() => user.id)
    }
  }

  const cleanUserParams = async () => {
    setIsAuth(() => false)
    setId(() => undefined)
  }


  const value: AuthContext = {
    isAuth,
    user,
    id,
    login,
    logout,
    setIsAuth,
    isCompletedLoad
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
