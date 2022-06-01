<<<<<<< HEAD
import LoginScreen from './components/login/LoginScreen';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import ClienteScreen from './components/cliente/ClienteScreen';
import VehiculoScreen from './components/vehiculo/VehiculoScreen';
import Layout from './components/Layout';
import { useState } from 'react';
import UsuarioScreen from './components/usuario/UsuarioScreen';


=======
import AppRouter from './routes/AppRouter';
import { AuthProvider } from './context/AuthContext';
>>>>>>> 87222311b0d8406cc7c0110227d77e8100c6cd30
function App() {
  return (
<<<<<<< HEAD
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<Layout />} >
          <Route path="/cliente" element={<ClienteScreen/>} />
          <Route path="/vehiculo" element={<VehiculoScreen  />} />
          <Route path="/usuarios" element={<UsuarioScreen />} />

        </Route>
      </Routes>
    </BrowserRouter>
=======
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
>>>>>>> 87222311b0d8406cc7c0110227d77e8100c6cd30
  )
}

export default App