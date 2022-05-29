import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import NavBar from './ui/NavBar'
import { Box, Grid } from '@mui/material'
import SideBar from './ui/SideBar'
import AuthContext from '../context/AuthContex'

const Layout = () => {

    const { auth } = useContext(AuthContext);
    if (auth.logged == false) {
        return <Navigate to="/login" replace={true} />
    } else {
        return (
            <Grid container>
                <Grid md={3}>
                    <SideBar style={{
                        position: 'sticky',
                        top: '0',
                        zIndex: '1',
                        backgroundColor: '#010101',
                        height: '100vh',
                        color: '#fff'
                    }} />
                </Grid>
                <Grid md={9}>

                    <NavBar />
                    <Box component="main" p={2}>

                        <Outlet />
                    </Box >
                </Grid>
            </Grid>
        )
    }
}
export default Layout