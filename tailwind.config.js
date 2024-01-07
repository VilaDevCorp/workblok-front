/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [{ pattern: /.{background|primary}./ }],
  theme: {
    colors: {
      primary: {
        50: "#C8D2DE",
        100: "#AFBCCD",
        200: "#98A8BD",
        300: "#8294AC",
        400: "#6E829C",
        500: "#5B708B",
        600: "#4A5F7A",
        700: "#3B4F6A",
        800: "#2D4059",
        900: "#293A50",
        1000: "#121A24",
        disabled: "#415849",
      },
      background: "#fafafa",
      success: "#256E58",
      error: "#e73232",
      warning: "#ED9121",
      successLow: "#d7ca27",
      transparent: "transparent",
    },
    extend: {
      keyframes: {
        loadingPulseAnimation: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.3)" },
        },
      },
      animation: {
        //give me the possibilities to use in my animation

        loadingPulse: "loadingPulseAnimation .8s ease-in infinite alternate ",
      },
    },
  },
  plugins: [],
};
