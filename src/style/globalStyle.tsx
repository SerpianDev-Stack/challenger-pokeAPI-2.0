import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --navy-850: hsl(217, 28%, 15%);
    --navy-900: hsl(218, 28%, 13%);
    --navy-950: hsl(216, 53%, 9%);
    --navy-800: hsl(219, 30%, 18%);
    --teal-200: hsl(176, 68%, 64%);
    --cyan-500: hsl(198, 60%, 50%);
    --red-500: hsl(0, 100%, 63%);
    --white: hsl(0, 0%, 100%);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  body {
    background-color: var(--navy-850);
    color: var(--white);
    font-family: 'Open Sans', sans-serif;
    min-height: 100vh;
    width: 100%;
  }

  h1, h2, h3 {
    font-family: 'Orbitron', sans-serif;
  }
`;
