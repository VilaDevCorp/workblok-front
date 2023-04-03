import { createGlobalStyle } from "styled-components";
import { device } from "./StyledTheme";

const GlobalStyle = createGlobalStyle`
  body {
    margin:0;
  }
  #root {
    margin: 0;
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Seymour+One&display=swap');

    font-family: 'Open Sans', sans-serif;

    padding: 0;
    width:100%;
    height: 100vh;
    @media ${device.tablet} { 
        height: 100%;
    }    
    overflow: hidden;
    scroll-behavior: smooth;
    color: ${(props) => props.theme.color.main.l6};

  }
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  padding-left: 10px;
}

::-webkit-scrollbar-track {
}

::-webkit-scrollbar-thumb {
  background: ${(props) => props.theme.color.highlightColor};
  border-radius: 50px;
  border: 4px solid ${props => props.theme.color.background.n}
}
`;

export default GlobalStyle;
