/** @type {import('tailwindcss').Config} */
// #759BB3

// #C0E3DB

// #E8EEEE

// #77B78E

// #305E79

// #091820

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [{ pattern: /.{background|primary|secondary}./ }],
  theme: {
    colors: {
      background: {
        100: "#B4C8D3",
        200: "#315264",
        300: "#213E4E",
        400: "#132B37",
        500: "#091820",
        600: "#08161E",
        700: "#07141B",
        800: "#061117",
        900: "#060F14",
      },
      primary: {
        100: "#5387A5",
        200: "#3F7696",
        300: "#2D6687",
        400: "#1E5778",
        500: "#124969",
        600: "#10415E",
        700: "#0E3A54",
        800: "#0C3349",
        900: "#0B2C3F",
        disabled: "#415849",
      },
      secondary: {
        100: "#6F97AE",
        200: "#5D88A0",
        300: "#4C7993",
        400: "#3D6B85",
        500: "#759BB3",
        600: "#2B546C",
        700: "#264B60",
        800: "#224154",
        900: "#1D3848",
      },
      font: {
        100: "#735F99",
        200: "#493570",
        300: "#281747",
        400: "#190C32",
        500: "#170B2E",
        600: "#150A29",
        700: "#120924",
        800: "#0F071F",
        900: "#0D061A",
      },

      lightFont: {
        100: "#F0EEF4",
        200: "#EDECF3",
        300: "#EBE9F1",
        400: "#E8E6EF",
        500: "#E5E3ED",
        600: "#CFCDD5",
        700: "#B8B6BE",
        800: "#A19FA6",
        900: "#8A898E",
      },
      darkFont: {
        100: "#426172",
        200: "#2E4B5B",
        300: "#1E3643",
        400: "#10222C",
        500: "#060F14",
        600: "#060E12",
        700: "#050C10",
        800: "#040B0E",
        900: "#04090C",
      },
      coinIcon: "#bfb14b",
      success: "#256E58",
      error: "#e73232",
      transparent: "#00000000",
    },
    extend: {
      keyframes: {
        showAnimation: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        hideAnimation: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0)" },
        },
        showSnackbar: {
          "0%": { opacity: 0 },
          "20%": { opacity: 1 },
          "80%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        showSidebarAnimation: {
          "0%": { left: "-300px" },
          "100%": { left: 0 },
        },
        hideSidebarAnimation: {
          "0%": { left: 0 },
          "100%": { left: "-300px" },
        },
      },
      animation: {
        showModal: "showAnimation .1s linear",
        hideModal: "hideAnimation .1s linear",
        showSnackbar: "showSnackbar 4s linear 1",
        hideSidebar: "hideSidebarAnimation .3s",
        showSidebar: "showSidebarAnimation .3s ",
      },
    },
  },
  plugins: [],
};
