import LoginScreen from './components/login/LoginScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClienteScreen from './components/cliente/ClienteScreen';
import VehiculoScreen from './components/vehiculo/VehiculoScreen';
import Layout from './components/Layout';
import UsuarioScreen from './components/usuario/UsuarioScreen';
import { AuthProvider } from './context/AuthContex';
import TrabajoScreen from './components/trabajo/TrabajoScreen';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/" element={<Layout />} >
            <Route path="/cliente" element={<ClienteScreen />} />
            <Route path="/vehiculo" element={<VehiculoScreen />} />
            <Route path="/usuarios" element={<UsuarioScreen />} />
            <Route path="/trabajo" element={<TrabajoScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App