import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  // reset css
  * {
    margin: 0;
    padding: 0;
    font: inherit;
    color: inherit;
  }
  *,
  :after,
  :before {
    box-sizing: border-box;
    flex-shrink: 0;
  }

  html,
  body,
  #root {
    height: 100%;
  }
  
  button {
    background: none;
    border: 0;
    cursor: pointer;
  }
`;
