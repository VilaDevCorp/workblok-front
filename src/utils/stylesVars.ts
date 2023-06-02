const colors = {
  main: "#09828b",
  mainLight: "#09828b30",
  contrast: "#db504a",
  red: "#",
  green: "#",
  redPink: "#",
  yellow: "#",
  lightBlue: "#",
  lighterBlue: "#",
};

const fonts = {
  title: "Montserrat-Bold",
  subtitle: "Montserrat-SemiBold",
  titleLight: "Monserrat-Light",
  text: "OpenSans-Regular",
};

export interface ValueGradient {
  1?: string;
  2?: string;
  3?: string;
  4?: string;
  5?: string;
}

const taskSize: ValueGradient = {
  1: "#55d745",
  2: "#95da30",
  3: "#e1de18",
  4: "#df8021",
  5: "#D93030",
};

export const stylesVars = { colors, fonts, taskSize };
