import React, { useContext } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import Button from '@mui/material/Button'
import NavBar from './ui/NavBar'
import { Box, Card, Grid } from '@mui/material'
import SideBar from './ui/SideBar'

const Layout = () => {


    return (
        /* contenedor */
        <Grid container style={{
            backgroundColor: "#f7f7f7",
            position: "relative",
        }}>
            {/* sidebar */}
            <Grid item md={2} >
                <Card style={{
                    margin: "10px",
                    borderRadius: "10px",
                    textAlign: "center",
                    position: "sticky",
                    top: 10,
                }}>
                    <SideBar />
                </Card>
            </Grid> {/* cierre sidebar */}
            <Grid item md={10}>
                <Card style={{
                    margin: "10px",
                    borderRadius: "10px",
                    position: "sticky",
                    top: 10,
                    zIndex: 9,
                }}>
                    <NavBar />
                </ Card>
                {/* contenido */}
                <Card style={{
                    margin: "10px",
                    borderRadius: "10px",

                }}>
                    <Box component="main" p={2}>
                        <Outlet />
                    </Box >
                </ Card>

            </Grid>
        </Grid> /* cierre contenedor */
    )
}
export default Layout