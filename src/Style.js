import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  body{ 
    margin:0; 
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    font-style: normal;
    font-size: 12px;
    font-weight: normal;
    line-height: 1.5;
    color:#25282B;
  }
`;

const screen = {
  default: "1024px",
  medium: "768px",
  small: "480px",
};

export { GlobalStyle, screen };
