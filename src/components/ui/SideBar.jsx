import { Box, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
/* iconos */
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import HomeIcon from '@mui/icons-material/Home';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

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
                <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")} >
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inicio" />
                    </ListItem>
                </NavLink>
                <NavLink to="/cliente" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")} >
                    <ListItem button>
                        <ListItemIcon>
                            <PersonOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary="Clientes" />
                    </ListItem>
                </NavLink>
                <NavLink to="/repuestos" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
                    <ListItem button>
                        <ListItemIcon>
                            <CarRepairIcon />
                        </ListItemIcon>
                        <ListItemText primary="Repuestos" />
                    </ListItem>
                </NavLink>
                <NavLink to="/vehiculo" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
                    <ListItem button>
                        <ListItemIcon>
                            <DirectionsCarIcon />

                        </ListItemIcon>
                        <ListItemText primary="Vehiculos" />
                    </ListItem>
                </NavLink>
                <NavLink to="/usuarios" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
                    <ListItem button>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Usuarios" />
                    </ListItem>
                </NavLink>
                <NavLink to="/insumos" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
                    <ListItem button>
                        <ListItemIcon>
                            <PrecisionManufacturingIcon />
                        </ListItemIcon>
                        <ListItemText primary="Insumos" />
                    </ListItem>
                </NavLink>
            </List>
        </Box >

    )
}

export default SideBar