import { Box, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
/* iconos */
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import HomeIcon from '@mui/icons-material/Home';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ConstructionIcon from '@mui/icons-material/Construction';
import GroupsIcon from '@mui/icons-material/Groups';
import React from 'react'
import { NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';


const SideBar = () => {

    const { auth } = useAuth()

    return (
        <Box component="nav" className='bg-gradient-primary sidebar'>
            <Grid container>
                <Grid item>
                    <Box textAlign={'center'} p={2} style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#fff',
                        textAlign: 'center',
                        width: '100%',
                    }}>
                        <span text-align="center">GES-Talleres</span>
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
                <NavLink to="/agregar-ficha" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")} >
                    <ListItem button>
                        <ListItemIcon>
                            <PostAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Ficha" />
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
                        <ListItemText primary="Pedido Repuestos" />
                    </ListItem>
                </NavLink>
                <NavLink to="/repuestos2" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
                    <ListItem button>
                        <ListItemIcon>
                            <CarRepairIcon />
                        </ListItemIcon>
                        <ListItemText primary="Lista Repuestos" />
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
                <NavLink to="/trabajo" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
                    <ListItem button>
                        <ListItemIcon>
                            <ConstructionIcon />
                        </ListItemIcon>
                        <ListItemText primary="Trabajos" />
                    </ListItem>
                </NavLink>
                <NavLink to="/empleado" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
                    <ListItem button>
                        <ListItemIcon>
                            <GroupsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Empleados" />
                    </ListItem>
                </NavLink>
            </List>
        </Box >

    )
}

export default SideBar