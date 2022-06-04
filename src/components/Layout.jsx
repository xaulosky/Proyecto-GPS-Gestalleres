import React, { useContext } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import Button from '@mui/material/Button'
import NavBar from './ui/NavBar'
import { Box, Grid } from '@mui/material'
import SideBar from './ui/SideBar'

const Layout = () => {


    return (
        <Grid container>
            <Grid item md={2} >
                <SideBar />
            </Grid>
            <Grid item md={10}>
                <NavBar />
                <Box component="main" p={2}>
                    <Outlet />
                </Box >
            </Grid>
        </Grid>
    )
}
export default Layout