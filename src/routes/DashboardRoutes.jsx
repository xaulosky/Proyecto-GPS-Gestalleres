import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ClienteScreen from '../components/cliente/ClienteScreen'
import DashboardHome from '../components/homedashboard/DashboardHome'
import Layout from '../components/Layout'

const DashboardRoutes = () => {
    return (

        <Routes>
            <Route path="/" element={<Layout />} >
                <Route path="cliente" element={<ClienteScreen />} />
                <Route path="/" element={<DashboardHome />} />
            </Route>
        </Routes>

    )
}

export default DashboardRoutes