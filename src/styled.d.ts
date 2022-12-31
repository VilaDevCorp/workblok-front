// import original module declarations
import "styled-components";

// and extend them!
export interface ThemeColors {
  bgColor: string;
  mainColor: string;
  lightMain: string;
  secondColor: string;
  highlightColor: string;
  mainColorLowOp: string;
  modalBackground: string;
  lightBackground: string;
  lightFont: string;
  darkFont: string;
  button: string;
  buttonHover: string;
  inactive:string;
  inputDark: string;
  danger: string;
  inputLight:string;
  hoverInputLight: string;
  hoverInputDark: string;
}

interface ThemeFontSizes {
  regularText: string;
  title: string;
  buttonLabel: string;
  h1: string;
  h2: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    color: ThemeColors;
    fontSize: ThemeFontSizes;
  }
}
