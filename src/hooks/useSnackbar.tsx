import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { IconTypeEnum } from '../components/atom/CoolIcon';
import { ThemeColors } from '../styled';

export interface SnackbarContext {
  snackbarProps: SnackbarProps,
  setSnackbarProps: React.Dispatch<React.SetStateAction<SnackbarProps>>,
}

export interface SnackbarProps {
  visible: boolean
  text?: string
  iconType?: IconTypeEnum
  color?: keyof ThemeColors
}

const SnackbarContext = createContext<SnackbarContext>({} as any)

export const useSnackbar = () => {
  const ctx = useContext(SnackbarContext)
  if (ctx === null) {
    throw new Error('useSnackbar() can only be used on the descendants of SnackbarProvider')
  } else {
    return ctx
  }
}

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {

  const [snackbarProps, setSnackbarProps] = useState<SnackbarProps>({ visible: false })


  const value: SnackbarContext = {
    snackbarProps,
    setSnackbarProps,
  }

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  )
}
