import { Box, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'


const SideBar = () => {


    return (
        <Box component="nav" className='bg-gradient-primary sidebar'>
            <Grid container>
                <Grid item >
                    <Box textAlign={'center'} p={2} style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#fff'
                    }}>
                        GES-Talleres
                    </Box>
                </Grid>
            </Grid>
            <List >
                <ListItem button>
                    <ListItemIcon>
                        <i className="material-icons">home</i>
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <NavLink to="/cliente" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")} >
                    <ListItem button>
                        <ListItemIcon>
                            <i className="material-icons">person</i>
                        </ListItemIcon>
                        <ListItemText primary="Usuarios" />
                    </ListItem>
                </NavLink>
                <NavLink to="/repuestos" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
                    <ListItem button>
                        <ListItemIcon>
                            <i className="material-icons">persons</i>
                        </ListItemIcon>
                        <ListItemText primary="Repuestos" />
                    </ListItem>
                </NavLink>
                <NavLink to="/vehiculo" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
                    <ListItem button>
                        <ListItemIcon>
                            <i className="material-icons">persons</i>
                        </ListItemIcon>
                        <ListItemText primary="Vehiculos" />
                    </ListItem>
                </NavLink>
            </List>
        </Box >

    )
}

export default SideBar