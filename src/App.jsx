import LoginScreen from './components/login/LoginScreen';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import ClienteScreen from './components/cliente/ClienteScreen';
import VehiculoScreen from './components/vehiculo/VehiculoScreen';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/cliente" element={<ClienteScreen />} />
        <Route path="/vehiculo" element={<VehiculoScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
