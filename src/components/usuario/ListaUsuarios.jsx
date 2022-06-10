import { Table, TableBody, TableCell, 
    TableContainer, TableHead, 
    TableRow, Button, IconButton, 
    Dialog, DialogActions, DialogContent, 
    DialogContentText, DialogTitle, Slide, 
    FormControl, FormLabel, FormGroup, 
    FormHelperText, TextField, Grid, Divider, 
    MenuItem, InputLabel, Select, Modal, Box, makeStyles, Stack } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import AgregarUsuarios from './AgregarUsuarios'
import EliminarUsuario from './EliminarUsuario';
import EditarUsuario from './EditarUsuario'

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
            grow : 1.3,
        },
        {
            name: 'Email',
            selector: row => row.email,
            grow : 1.3,
        },
        {
            name: 'Rol',
            cell: (row) =>
            rol(row),
            grow : 0.8,
           
        },
        
        {	
            name: 'Acciones',		
            cell: (row) => (
                <Stack direction="row" sx ={{xs:5}}>
                    <EditarUsuario row={row}/>
                    <EliminarUsuario row={row}/>
                    <p></p>
                </Stack>
            ),
            grow:1,
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
        fixedHeaderScrollHeight="600px"
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

