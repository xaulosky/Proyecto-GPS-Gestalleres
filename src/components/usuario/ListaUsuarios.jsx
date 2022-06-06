import { Table, TableBody, TableCell, 
    TableContainer, TableHead, 
    TableRow, Button, IconButton, 
    Dialog, DialogActions, DialogContent, 
    DialogContentText, DialogTitle, Slide, 
    FormControl, FormLabel, FormGroup, 
    FormHelperText, TextField, Grid, Divider, 
    MenuItem, InputLabel, Select, Modal, Box, makeStyles } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import AgregarUsuarios from './AgregarUsuarios'

//Eliminar usuario
function btnEliminar (row) {

  function prueba(row)  {
      eliminar(row)
      handleClose()
  }

  const [open, setOpen]   = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const eliminar = (row) =>{
      axios.delete(import.meta.env.VITE_APP_BACKEND_URL+'usuario.php?id='+row.cUsuario)
      .then(respuesta =>{
          console.log(respuesta)
      })
      window.location.replace('');
  }

  return (
    <div>
        <Grid>
        <Button
                 sx={{
                    '& > :not(style)': {
                      m: -0.05,
                      py: 1.5
                    },
                  }}
                variant = "outlined"
                color = 'error'
                size = "small"
                onClick={handleOpen}
                startIcon={<DeleteIcon />}
            >
                eliminar
        </Button>
        </Grid>
        
        
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        > 
            <DialogTitle id="alert-dialog-title">{
            "Eliminar usuario "
            }</DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ¿Esta seguro de eliminar a {row.nombreU}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={prueba} autofocus >
                    Aceptar
                </Button>
                <Button onClick={handleClose}>
                    Cancelar
                </Button>
                
        </DialogActions>
      </Dialog>
    </div>
  );
  
}

function btnEditar(row){
    return(
        <div>
            <Grid >
                <AgregarUsuarios />
            </Grid>
            
        </div>
    )
}

const ListaUsuarios = () => {

    const columns = [

        {
            name: 'Nombre',
            selector: row => row.nombreU,
            grow : 1,
        },
        {
            name: 'Email',
            selector: row => row.email,
            grow : 1,
        },
        {
            name: 'Rol',
            selector: row => row.cRolU,
            grow : 2,
        },
        {	
    
            cell: (row) => 
            btnEditar(row),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            
            
        },
        {			
            cell: (row) => 
            btnEliminar(row),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,

        },
    ];

    const [usuarios,setUsuarios] = useState([]);

    const obtenerUsuarios = () =>{
        axios.get(import.meta.env.VITE_APP_BACKEND_URL+'usuario.php')
        .then(respuesta => {
            setUsuarios(respuesta.data);
        })
    }
    useEffect(() => {
        obtenerUsuarios();
    }, [])

    return (
        <DataTable
            columns={columns}
            data={usuarios}
        />

    )
}

export default ListaUsuarios