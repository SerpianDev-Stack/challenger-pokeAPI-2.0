import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx';
import { HashRouter } from 'react-router-dom';
import { GlobalStyle } from './style/globalStyle.tsx';

createRoot(document.getElementById('root')!).render(
  <HashRouter >
    <StrictMode>
      <GlobalStyle />
      <App />
    </StrictMode>
  </HashRouter>
)
