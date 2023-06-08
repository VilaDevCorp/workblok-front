import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { IconType } from '../components/ui/VilaIcon';


type SnackbarColor = 'error' | 'success'

export interface SnackbarContext {
  visible: boolean
  text: string
  icon?: IconType
  color?: SnackbarColor
  onOpen: (text: string, icon?: IconType, color?: SnackbarColor) => void
  onClose: () => void

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

  const [visible, setVisible] = useState<boolean>(false)
  const [text, setText] = useState<string>('')
  const [icon, setIcon] = useState<IconType | undefined>(undefined)
  const [color, setColor] = useState<SnackbarColor | undefined>(undefined)

  const onOpen = (text: string, icon?: IconType, color?: SnackbarColor) => {
    setText(text)
    setIcon(icon)
    setColor(color)
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  const value: SnackbarContext = {
    visible,
    text,
    icon,
    color,
    onOpen,
    onClose
  }

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  )
}
