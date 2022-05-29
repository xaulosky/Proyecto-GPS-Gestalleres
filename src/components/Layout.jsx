import React from 'react'
import { Outlet } from 'react-router-dom'
import Button from '@mui/material/Button'
import NavBar from './ui/NavBar'
import { Box, Grid } from '@mui/material'
import SideBar from './ui/SideBar'
const Layout = () => {
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

export default Layout