import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ClienteScreen from '../components/cliente/ClienteScreen'
import DashboardHome from '../components/homedashboard/DashboardHome'
import Layout from '../components/Layout'
import RepuestosScreen from '../components/repuestos/RepuestosScreen'
import VehiculoScreen from '../components/vehiculo/VehiculoScreen'

const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route path="cliente" element={<ClienteScreen />} />
                <Route path="/" element={<DashboardHome />} />
                <Route path="/repuestos" element={<RepuestosScreen />} />
                <Route path="/vehiculo" element={<VehiculoScreen />} />
                <Route path="*" element={<> <h1>Página no encontrada</h1></>} />
            </Route>
        </Routes>
    )
}

export default DashboardRoutes