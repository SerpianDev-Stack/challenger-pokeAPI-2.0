import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './style/globalStyle.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/challenger-pokeAPI-2.0">
    <StrictMode>
      <GlobalStyle />
      <App />
    </StrictMode>
  </BrowserRouter>
)
