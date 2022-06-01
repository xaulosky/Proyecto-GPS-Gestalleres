import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from '../components/home/HomeScreen'
import LoginScreen from '../components/login/LoginScreen'
import DashboardRoutes from './DashboardRoutes'
import PublicRoutes from './PublicRoutes'
import PrivateRoutes from './PrivateRoutes'


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={
                    <PublicRoutes>
                        <LoginScreen />
                    </PublicRoutes>
                } />

                <Route path="/*" element={
                    <PrivateRoutes>
                        <DashboardRoutes />
                    </PrivateRoutes>
                } />

            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter