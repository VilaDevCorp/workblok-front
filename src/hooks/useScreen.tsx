import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface ScreenContext {
  screenWidth: number;
  screenHeight: number;
  isDesktop: boolean;
  isMobile: boolean;
  isTablet: boolean;
}

export const ScreenWidthEnum = {
  s: 425,
  m: 768,
  l: 1024,
  xl: 1440,
};

const ScreenContext = createContext<ScreenContext>({} as any);

export const useScreen = () => {
  const ctx = useContext(ScreenContext);
  if (ctx === null) {
    throw new Error(
      "useScreen() can only be used on the descendants of ScreenProvider"
    );
  } else {
    return ctx;
  }
};

export const ScreenProvider = ({ children }: { children: ReactNode }) => {
  const [screenWidth, setScreenWidth] = useState<number>(window.screen.width);
  const [screenHeight, setScreenHeight] = useState<number>(
    window.screen.height
  );
  const isDesktop = screenWidth >= ScreenWidthEnum.l;
  const isMobile = screenWidth <= ScreenWidthEnum.s;
  const isTablet = screenWidth <= ScreenWidthEnum.m;

  const onResize = () => {
    setScreenWidth(window.screen.width);
    setScreenHeight(window.screen.height);
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const value: ScreenContext = {
    screenWidth,
    screenHeight,
    isDesktop,
    isMobile,
    isTablet,
  };

  return (
    <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>
  );
};
