import React, { useContext, useState } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import Button from '@mui/material/Button'
import NavBar from './ui/NavBar'
import { Box, Card, Grid, Hidden } from '@mui/material'
import SideBar from './ui/SideBar'
import { display } from '@mui/system'

const Layout = () => {

    const [sidebarOpen, setSidebarOpen] = useState(true)

    const onClick = () => {
        setSidebarOpen(!sidebarOpen)
    }

    window.addEventListener('resize', function (event) {
        if (event.target.screen.width < 900) {
            setSidebarOpen(false)
        } else {
            setSidebarOpen(true)
        }
    }, true)

    return (
        /* contenedor */
        <Grid container style={{
            backgroundColor: "#f7f7f7",
            position: "relative",
        }}>
            {/* sidebar */}
            {
                sidebarOpen
                    ? <Grid item xs={true} md={"2"}  >
                        <Card style={{
                            margin: "10px",
                            borderRadius: "10px",
                            textAlign: "center",
                            position: "sticky",
                            top: 10,
                            /*  visibility: sidebarOpen ? "visible" : "hidden",
                             transition: "all 0.5s ease-in-out", */
                        }}>
                            <SideBar />
                        </Card>
                    </Grid>
                    : null
            }
            {/* cierre sidebar */}
            <Grid item xs={12} md={sidebarOpen ? "10" : "12"}>
                <Card style={{
                    margin: "10px",
                    borderRadius: "10px",
                    position: "sticky",
                    top: 10,
                    zIndex: 9,
                }}>
                    <NavBar onClick={onClick} />
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