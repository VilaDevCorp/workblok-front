import { defineStyleConfig, extendTheme } from "@chakra-ui/react";
import {
  sliderAnatomy,
  switchAnatomy,
  checkboxAnatomy,
  inputAnatomy,
} from "@chakra-ui/anatomy";
const { defineMultiStyleConfig: defineMultiStyleConfigSlider } =
  createMultiStyleConfigHelpers(sliderAnatomy.keys);
import {} from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { defineMultiStyleConfig: defineMultiStyleConfigSwitch } =
  createMultiStyleConfigHelpers(switchAnatomy.keys);

const { defineMultiStyleConfig: defineMultiStyleConfigCheckbox } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const { defineMultiStyleConfig: defineMultiStyleConfigInput } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const colors = {
  background: {
    100: "#B4C8D3",
    200: "#315264",
    300: "#213E4E",
    400: "#132B37",
    500: "#ffffff",
    600: "#08161E",
    700: "#07141B",
    800: "#061117",
    900: "#060F14",
  },
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
    disabled: "#415849",
  },
  secondary: {
    50: "#CAD7E3",
    100: "#C0D0DD",
    200: "#B7C8D8",
    300: "#ADC1D2",
    400: "#A4BACD",
    500: "#9CB3C7",
    600: "#8CA1B3",
    700: "#7C8F9F",
    800: "#6D7D8B",
    900: "#5D6B77",
    disabled: "#4D4D4D",
  },
  success: {
    50: "#CAD7E3",
    100: "#C0D0DD",
    200: "#B7C8D8",
    300: "#ADC1D2",
    400: "#A4BACD",
    500: "#9CB3C7",
    600: "#8CA1B3",
    700: "#7C8F9F",
    800: "#6D7D8B",
    900: "#5D6B77",
    disabled: "#4D4D4D",
  },
  error: "#e73232",
};
const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {},
  // Two sizes: sm and md
  sizes: {},
  // Two variants: outline and solid
  variants: {
    outline: {
      border: "2px solid",
      borderColor: "primary.600",
      _hover: {},
      color: "primary.900",
    },
    solid: {
      bg: "primary.600",
      _hover: {
        bg: "primary.500",
      },
      _disabled: {
        bg: "primary.600 !important",
      },
      color: "white",
    },
    ghost: {
      bg: "transparent",
      _hover: {
        color: "primary.900",
        bg: "transparent !important",
      },
      _disabled: {
        color: "primary.50",
      },
      color: "primary.500",
    },
  },
  // The default size and variant values
  defaultProps: {},
});

const Heading = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {},
  // Two sizes: sm and md
  sizes: {
    lg: {
      fontSize: "1.5rem",
    },
  },
});

export const Slider = defineMultiStyleConfigSlider({
  baseStyle: {
    filledTrack: {
      bg: "primary.600",
    },
  },
});

export const Switch = defineMultiStyleConfigSwitch({
  baseStyle: {
    track: {
      _checked: {
        bg: "primary.600",
      },
    },
  },
});

export const CheckBox = defineMultiStyleConfigCheckbox({
  baseStyle: {
    control: {
      _checked: {
        bg: "primary.600",
      },
    },
  },
});

export const Input = defineMultiStyleConfigInput({
  baseStyle: {},
});

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "white",
        color: "primary.900",
      },
    },
  },
  colors,
  components: {
    Button: Button,
    Heading: Heading,
    Slider: Slider,
    Switch: Switch,
    Checkbox: CheckBox,
  },
});
