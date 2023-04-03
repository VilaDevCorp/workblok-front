import { createContext, ReactNode, useContext, useEffect, useState } from 'react';


export interface ScreenContext {
  screenWidth: number,
}

const ScreenContext = createContext<ScreenContext>({} as any)

export const useScreen = () => {
  const ctx = useContext(ScreenContext)
  if (ctx === null) {
    throw new Error('useScreen() can only be used on the descendants of ScreenProvider')
  } else {
    return ctx
  }
}

export const ScreenProvider = ({ children }: { children: ReactNode }) => {

  const [screenWidth, setScreenWidth] = useState<number>(window.screen.width)

  const onResize = () => {
    setScreenWidth(window.screen.width)
  }

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);


  const value: ScreenContext = {
    screenWidth
  }

  return (
    <ScreenContext.Provider value={value}>
      {children}
    </ScreenContext.Provider>
  )
}
