import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginScreen from '../components/login/LoginScreen'
import DashboardRoutes from './DashboardRoutes'
import PublicRoutes from './PublicRoutes'
import PrivateRoutes from './PrivateRoutes'
import AuthContext from '../context/AuthContext'


const AppRouter = () => {

    return (
        <BrowserRouter >
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