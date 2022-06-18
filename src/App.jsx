import AppRouter from './routes/AppRouter';
import { AuthProvider } from './context/AuthContext';
import { esES } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';

/* traduccion de los componentes */
const theme = createTheme(
  esES
);


function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App