import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'

const SideBar = () => {
    return (
        
            <List >
                <ListItem button>
                    <ListItemIcon>
                        <i className="material-icons">home</i>
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <i className="material-icons">person</i>
                    </ListItemIcon>
                    <ListItemText primary="Usuarios" />
                </ListItem>

            </List>
    )
}

export default SideBar