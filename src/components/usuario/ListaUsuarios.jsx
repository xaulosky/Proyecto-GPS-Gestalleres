import { Table, TableBody, TableCell, 
    TableContainer, TableHead, 
    TableRow, Button, IconButton, 
    Dialog, DialogActions, DialogContent, 
    DialogContentText, DialogTitle, Slide, 
    FormControl, FormLabel, FormGroup, 
    FormHelperText, TextField, Grid, Divider, 
    MenuItem, InputLabel, Select, Modal, Box, makeStyles } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import AgregarUsuarios from './AgregarUsuarios'
import EliminarUsuario from './EliminarUsuario';

function btnEditar(row){
    return(
        <div>
             <Grid>
        <Button
                 sx={{
                    '& > :not(style)': {
                      mx: 0.8,
                      py: 1.5
                    },
                  }}
                variant = "outlined"
                color = 'primary'
                size = "small"
               
                endIcon={<EditIcon />}
            >
                editar
        </Button>
        </Grid>
            
        </div>
    )
}

function rol(row){
    if(row.cRolU == 1){
        return(
            <div>
                Jefe de taller
            </div>
        )
    }
    if(row.cRolU == 2){
        return(
           <div>
                Secretaria
            </div> 
        )
    }
    if(row.cRolU == 3){
        return(
            <div>
                Mecanico
            </div>
        )
    }
}

//Data Table
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
            cell: (row) =>
            rol(row),
           
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
            <EliminarUsuario row={row}/>,
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
    useEffect(()=>{
        obtenerUsuarios();
    },[])
    
    return (
      
        <DataTable
        title='Lista de usuarios'
        columns ={columns}
        data = {usuarios}
        direction="auto"
        fixedHeader
        fixedHeaderScrollHeight="300px"
        highlightOnHover
        noContextMenu
        pagination
        persistTableHead
        pointerOnHover
        responsive
        subHeader      
        subHeaderComponent={<AgregarUsuarios/>} 
    />  
    )
}

export default ListaUsuarios

