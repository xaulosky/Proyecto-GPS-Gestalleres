import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ClienteScreen from '../components/cliente/ClienteScreen'
import EditarFicha from '../components/ficha/EditarFicha'
import FichaScreen from '../components/ficha/FichaScreen'
import EmpleadoScreen from '../components/empleado/EmpleadoScreen'
import ListaFichas from '../components/ficha/ListaFichas'
import ScreenFicha from '../components/ficha/ScreenFicha'
import VerFicha from '../components/ficha/VerFicha'
import DashboardHome from '../components/homedashboard/DashboardHome'
import InsumoScreen from '../components/insumo/InsumoScreen'
import Layout from '../components/Layout'
import RepuestosScreen from '../components/repuestos/RepuestosScreen'
import TrabajoScreen from '../components/trabajo/TrabajoScreen'
import UsuarioScreen from '../components/usuario/UsuarioScreen'
import VehiculoScreen from '../components/vehiculo/VehiculoScreen'
import AseguradoraScreen from '../components/Aseguradora/AseguradoraScreen'


const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route path="cliente" element={<ClienteScreen />} />
                <Route path="usuarios" element={<UsuarioScreen />} />
                <Route path="repuestos" element={<RepuestosScreen />} />
                <Route path="repuestos2" element={<Repuestos2Screen />} />
                <Route path="trabajo" element={<TrabajoScreen />} />
                <Route path="empleado" element={<EmpleadoScreen />} />
                <Route path="vehiculo" element={<VehiculoScreen />} />
                <Route path="insumos" element={<InsumoScreen />} />
                <Route path="/" element={<DashboardHome />} />
                <Route path="/agregar-ficha" element={<ScreenFicha />} />
                <Route path="/fichas" element={<ListaFichas />} />
                <Route path='/ficha/:id' element={<VerFicha />} />
                <Route path='/editficha/:id' element={<EditarFicha />} />
                <Route path='/Aseguradora/' element={<AseguradoraScreen/>} />
                <Route path="*" element={<> <h1>Página no encontrada</h1></>} />
            </Route>
        </Routes>
    )
}

export default DashboardRoutes