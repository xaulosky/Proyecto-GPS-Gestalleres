import { AppBar, Button, IconButton } from '@mui/material'
import React from 'react'

const NavBar = () => {
  return (
    <AppBar position="sticky">
        <Button>
            <IconButton aria-label="Menu">
                <i className="material-icons">menu</i>
            </IconButton>
        </Button>

    </AppBar>

  )
}

export default NavBar