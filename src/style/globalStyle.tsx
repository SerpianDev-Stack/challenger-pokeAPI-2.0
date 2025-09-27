import { createGlobalStyle } from "styled-components";

/**
 * fontBase:
 * - em dev (localhost) usa "/" para não quebrar sua máquina local
 * - em produção usa import.meta.env.BASE_URL (definido no vite.config.js)
 * - se BASE_URL for vazio/"/" no build, fallback para "/challenger-pokeAPI-2.0/"
 */
const base = import.meta.env.BASE_URL;
const isLocal =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");
const fontBase = isLocal ? "/" : (base && base !== "/" ? base : "/challenger-pokeAPI-2.0/");

console.log("FONT BASE ->", fontBase);

export const GlobalStyle = createGlobalStyle`
  /* =========================================
     FONTS
  ========================================= */
  @font-face {
    font-family: 'Orbitron';
    src: url("${fontBase}fonts/Orbitron-Regular.ttf") format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Orbitron';
    src: url("${fontBase}fonts/Orbitron-SemiBold.ttf") format('truetype');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'Orbitron';
    src: url("${fontBase}fonts/Orbitron-Bold.ttf") format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans Condensed';
    src: url("${fontBase}fonts/OpenSans_Condensed-Medium.ttf") format('truetype');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans Condensed';
    src: url("${fontBase}fonts/OpenSans_Condensed-Bold.ttf") format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans Condensed';
    src: url("${fontBase}fonts/OpenSans_Condensed-LightItalic.ttf") format('truetype');
    font-weight: 300;
    font-style: italic;
  }

  /* =========================================
     VARIÁVEIS DE CORES
  ========================================= */
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

  /* =========================================
     RESET GLOBAL
  ========================================= */
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
    font-family: 'Open Sans Condensed', sans-serif;
    min-height: 100vh;
    width: 100%;
  }
`;
