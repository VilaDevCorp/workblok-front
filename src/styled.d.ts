// import original module declarations
import "styled-components";
import { ValueGradient } from "./StyledTheme";

// and extend them!
export interface ThemeColors {
  background: ColorShades;
  main: ColorShades;
  second: ColorShades;
  highlightColor: string;
  highlightColorLowOp: string;
  mainLowOp: string;
  modalBackground: string;
  lightFont: string;
  darkFont: string;
  darkFontLowOp: string;
  button: string;
  completedGreen: string;
  buttonHoverDark: string;
  buttonHoverLight: string;
  inactive:string;
  inputDark: string;
  danger: string;
  inputLight:string;
  hoverInputLight: string;
  hoverInputDark: string;
  grey:string;
  lightGrey:string;
  taskSize: ValueGradient
}

interface ThemeFontSizes {
  regularText: string;
  title: string;
  highText: string;
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
