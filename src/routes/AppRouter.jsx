import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginScreen from '../components/login/LoginScreen'
import DashboardRoutes from './DashboardRoutes'
import PublicRoutes from './PublicRoutes'
import PrivateRoutes from './PrivateRoutes'
import AuthContext from '../context/AuthContext'


const AppRouter = () => {

    /* use AuthContext */
    const { auth, setAuth } = useContext(AuthContext)

    const init = () => {
        return JSON.parse(localStorage.getItem('user') || { logged: false })
    }

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