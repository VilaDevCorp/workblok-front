import { createGlobalStyle } from "styled-components";
import { device } from "./StyledTheme";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Seymour+One&display=swap');

    font-family: 'Open Sans', sans-serif;

    padding: 0;
    width:100%;
    height: 100vh;
    overflow: hidden;
    scroll-behavior: smooth;
    color: ${(props) => props.theme.color.darkFont};
    @media ${device.desktopL} { 
      font-size: 150% !important;
    }

  }
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: ${(props) => props.theme.color.mainColorLowOp};  
}
`;

export default GlobalStyle;
