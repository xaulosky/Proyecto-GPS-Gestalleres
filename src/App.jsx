import LoginScreen from './components/login/LoginScreen';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import ClienteScreen from './components/cliente/ClienteScreen';
import VehiculoScreen from './components/vehiculo/VehiculoScreen';
import Layout from './components/Layout';
import ResponsiveDrawer from './components/ui/ResponsiveDrawer';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />

        <Route path="/" element={<ResponsiveDrawer />} >
          <Route path="/cliente" element={<ClienteScreen />} />
          <Route path="/vehiculo" element={<VehiculoScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App