import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const NavBar = ({ onClick }) => {

  const { setAuth } = useContext(AuthContext);

  const cerrarSesion = () => {
    setAuth({ logged: false });
    localStorage.removeItem('auth');
  }

  return (
    <Box sx={{ flexGrow: 1 }} style={{
      backgroundColor: '#f5f5f5',
    }}>
      <AppBar position="static" style={{
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
      }}>
        <Toolbar  >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => onClick()}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          <Button color="inherit" onClick={cerrarSesion}>Cerrar Sesión</Button>
        </Toolbar>
      </AppBar>
    </Box>

  )
}

export default NavBar