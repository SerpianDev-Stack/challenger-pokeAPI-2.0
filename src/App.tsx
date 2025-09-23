import { GlobalStyle } from "./style/globalStyle";
import { AppRoutes } from "./pages/Routes";
import { CustomThemeProvider } from "./contexts/themeContext";

function App() {

  return (
    <CustomThemeProvider>
      <GlobalStyle />
      <AppRoutes />
    </CustomThemeProvider>
  )
}

export default App
