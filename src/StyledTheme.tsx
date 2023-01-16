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

export interface ColorShades {
  d7?: string;
  d6?: string;
  d5?: string;
  d4?: string;
  d3?: string;
  d2?: string;
  d1?: string;
  n?: string;
  l1?: string;
  l2?: string;
  l3?: string;
  l4?: string;
  l5?: string;
  l6?: string;
  l7?: string;
}

export interface ValueGradient {
  1?: string;
  2?: string;
  3?: string;
  4?: string;
  5?: string;
}

export const StyledTheme = ({ children }: { children: ReactNode }) => {


  const background: ColorShades = {
    l5: '#5C7E90',
    l4: '#45677A',
    l3: '#315264',
    l2: '#213E4E',
    l1: '#132B37',
    n: '#091820',
    d1: '#08161E',
    d2: '#07141B',
    d3: '#061117',
    d4: '#060F14',
    d5: '#050C11',

  }

  const main: ColorShades = {
    l6: '#82ABC3',
    l5: '#6998B4',
    l4: '#5387A5',
    l3: '#3F7696',
    l2: '#2D6687',
    l1: '#1E5778',
    n: '#124969',
    d1: '#10415E',
    d2: '#0E3A54',
    d3: '#0C3349',
    d4: '#0B2C3F',
    d5: '#092434',
    d6: '#071D2A',
    d7: '#05161F',
  }

  const second: ColorShades = {
    l5: '',
    l4: '',
    l3: '',
    l2: '',
    l1: '',
    n: '',
    d1: '',
    d2: '',
    d3: '',
    d4: '',
    d5: '',
  }

  const taskSize: ValueGradient = {
    1: '#55d745',
    2: '#95da30',
    3: '#e1de18',
    4: '#df8021',
    5: '#D93030',
  }


  //   const background.n = '#091820'
  // const lightBackground = '#123040'
  // const lighterBackground = '#0D2430'

  // const mainColor = '#124969'
  // const lightMain = '#18618C'
  // const mainColorLowOp = '#0071bc5c'
  // const secondColor = '#94BFBE'
  // const highlightColor = '#CDBE51'
  // const modalBackground = '#3fb1fc21'
  // const danger = '#e92f2f'
  // const lightFont = '#EEF7FC'
  // const darkFont = '#040126'
  // const button = '#0F9EFB'
  // const buttonHover = '#005790'
  // const hoverInputLight = '#ccdef5'
  // const hoverInputDark = '#005790'
  // const inputDark = '#ccdef5'
  // const inputLight = '#ccdef5'
  // const inactive = '#092434'

  const mainLowOp = '#3659b014'
  const highlightColor = '#CDBE51'
  const highlightColorLowOp = '#e1a5002a'
  const modalBackground = '#3fb1fc21'
  const danger = 'red'
  const lightFont = '#EFF2FA'
  const darkFont = '#040126'
  const darkFontLowOp = '#040126a1'
  const button = '#0F9EFB'
  const buttonHoverDark = '#005790'
  const buttonHoverLight = '#a3cee9'
  const hoverInputLight = '#ccdef5'
  const hoverInputDark = '#005790'
  const inputDark = '#ccdef5'
  const inputLight = '#ccdef5'
  const inactive = '#bbe2ff'
  const grey = '#9492ab'
  const lightGrey = '#d3d3db'


  const color = {
    background, main, second, highlightColor, modalBackground,
    mainLowOp, lightFont, darkFont, button, buttonHoverDark, inactive, hoverInputDark, hoverInputLight, inputDark, inputLight, danger, darkFontLowOp, highlightColorLowOp,
    buttonHoverLight, grey, lightGrey, taskSize
  }

  const regularText = '.9rem'
  const highText = '1.1rem'
  const title = '1.4rem'
  const buttonLabel = '1.3rem'
  const h1 = '1.8rem'
  const h2 = '1.2rem'

  const fontSize = { regularText, h1, buttonLabel, highText, h2, title }

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
