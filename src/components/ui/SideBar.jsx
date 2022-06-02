import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
    return (

        <List >
            <ListItem button>
                <ListItemIcon>
                    <i className="material-icons">home</i>
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
            <Link to="/cliente">
                <ListItem button>
                    <ListItemIcon>
                        <i className="material-icons">person</i>
                    </ListItemIcon>
                    <ListItemText primary="Usuarios" />
                </ListItem>
            </Link>
            <Link to="/repuestos">
                <ListItem button>
                    <ListItemIcon>
                        <i className="material-icons">persons</i>
                    </ListItemIcon>
                    <ListItemText primary="Repuestos" />
                </ListItem>
            </Link>
            <Link to="/vehiculo">
                <ListItem button>
                    <ListItemIcon>
                        <i className="material-icons">directions_car</i>
                    </ListItemIcon>
                    <ListItemText primary="Vehiculos" />
                </ListItem>
            </Link>


        </List>
    )
}

export default SideBar