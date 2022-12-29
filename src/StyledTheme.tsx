import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';


const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1700px',
  desktopL: '1950px'
}

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`
};


export const StyledTheme = ({ children }: { children: ReactNode }) => {

  const bgColor = '#091820'
  const mainColor = '#0F3E57'
  const secondColor = '#94BFBE'
  const highlightColor = '#E1A600'
  const mainColorLowOp = '#0071bc5c'
  const modalBackground = '#3fb1fc21'
  const danger = 'red'
  const lightFont = '#EEF7FC'
  const darkFont = '#040126'
  const lightBackground = '#123040'
  const button = '#0F9EFB'
  const buttonHover = '#005790'
  const hoverInputLight = '#ccdef5'
  const hoverInputDark = '#005790'
  const inputDark  = '#ccdef5'
  const inputLight = '#ccdef5'
  const inactive = '#bbe2ff'
  

  const color = { bgColor, mainColor, secondColor, highlightColor, modalBackground,
    mainColorLowOp, lightFont, darkFont, lightBackground, button, buttonHover, inactive, hoverInputDark, hoverInputLight, inputDark, inputLight, danger
   }

  const regularText = '1.1rem'
  const title = '1.2rem'
  const buttonLabel = '1.3rem'
  const h1 = '1.8rem'
  const h2 = '1.6rem'

  const fontSize = { regularText, h1, buttonLabel, title, h2}

  const value: DefaultTheme = {
    color,
    fontSize
  }

  

  return (
    <ThemeProvider theme={value} >
      {children}
    </ThemeProvider>
  )
}
