import LoginScreen from './components/login/LoginScreen';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import ClienteScreen from './components/cliente/ClienteScreen';
import VehiculoScreen from './components/vehiculo/VehiculoScreen';
import Layout from './components/Layout';
import { useState } from 'react';
import UsuarioScreen from './components/usuario/UsuarioScreen';
import InsumoScreen from './components/insumo/InsumoScreen';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        
        <Route path="/" element={<Layout />} >
          <Route path="/cliente" element={<ClienteScreen/>} />
          <Route path="/vehiculo" element={<VehiculoScreen  />} />
          <Route path="/usuarios" element={<UsuarioScreen />} />
          <Route path="/insumo" element={<InsumoScreen />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App