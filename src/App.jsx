<<<<<<< HEAD
import LoginScreen from './components/login/LoginScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClienteScreen from './components/cliente/ClienteScreen';
import VehiculoScreen from './components/vehiculo/VehiculoScreen';
import Layout from './components/Layout';
import UsuarioScreen from './components/usuario/UsuarioScreen';
import { AuthProvider } from './context/AuthContex';
import TrabajoScreen from './components/trabajo/TrabajoScreen';
import EmpleadoScreen from './components/empleado/EmpleadoScreen';
=======
import AppRouter from './routes/AppRouter';
import { AuthProvider } from './context/AuthContext';
import { esES } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';

/* traduccion de los componentes */
const theme = createTheme(
  esES
);

>>>>>>> 308a94d8cf4c2bed921966e8a6765b715496615e

function App() {
  return (
<<<<<<< HEAD
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/" element={<Layout />} >
            <Route path="/cliente" element={<ClienteScreen />} />
            <Route path="/vehiculo" element={<VehiculoScreen />} />
            <Route path="/usuarios" element={<UsuarioScreen />} />
            <Route path="/trabajo" element={<TrabajoScreen />} />
            <Route path="/empleado" element={<EmpleadoScreen />} />

            
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
=======
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
>>>>>>> 308a94d8cf4c2bed921966e8a6765b715496615e
  )
}

export default App