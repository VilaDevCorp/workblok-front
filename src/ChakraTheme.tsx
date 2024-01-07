import {
  StyleFunctionProps,
  defineStyleConfig,
  extendTheme,
} from "@chakra-ui/react";
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
      _dark: {
        color: "primary.200",
      },
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

const Spinner = defineStyleConfig({
  // The styles all button have in common
  baseStyle: { color: "primary.500" },
});

export const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: props.colorMode === "dark" ? "primary.1000" : "background",
        color: props.colorMode === "dark" ? "primary.100" : "primary.900",
      },
    }),
  },
  initialColorMode: "dark",
  useSystemColorMode: true,

  colors,
  components: {
    Button: Button,
    Heading: Heading,
    Slider: Slider,
    Switch: Switch,
    Checkbox: CheckBox,
    Spinner: Spinner,
  },
});
