
import {
    Table, TableBody, TableCell,
    TableContainer, TableHead,
    TableRow, Button, IconButton,
    Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Slide,
    FormControl, FormLabel, FormGroup,
    FormHelperText, TextField, Grid, Divider,
    MenuItem, InputLabel, Select, Modal, Box, makeStyles, Stack
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';

import { Table, TableBody, TableCell, 
    TableContainer, TableHead, 
    TableRow, Button, IconButton, 
    Dialog, DialogActions, DialogContent, 
    DialogContentText, DialogTitle, Slide, 
    FormControl, FormLabel, FormGroup, 
    FormHelperText, TextField, Grid, Divider, 
    MenuItem, InputLabel, Select, Modal, Box, makeStyles, Stack, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import DataTable from 'react-data-table-component'
import AgregarUsuarios from './AgregarUsuarios'
import EliminarUsuario from './EliminarUsuario'
import EditarUsuario from './EditarUsuario'
import AuthContext from '../../context/AuthContext';
import BuscarUsuario from './BuscarUsuario';
import EliminarUsuario from './EliminarUsuario';

function btnEditar(row) {
    return (


        <Button
            sx={{
                '& > :not(style)': {
                    mx: 0.8,
                    py: 1.5
                },
            }}
            color='primary'
            size="small"

            endIcon={<EditIcon />}
        >

        </Button>



    )
}

//Roles usuarios
function rol(row){
    if(row.cRolU == 1){
        return(
            <div>
                Administrador
            </div>
        )
    }
    if(row.cRolU == 2){
        return(
           <div>
                Editor
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
};

//pie de pagina 
const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};

//Data Table
const ListaUsuarios = () => {
    const columns = [
        {
            name: 'Nombre',
            selector: row => row.nombreU,
            grow: 1,
            grow : 1,
        },
        {
            name: 'Email',
            selector: row => row.email,
            grow: 1,
            grow : 1,
        },
        {
            name: 'Rol',
            cell: (row) =>
                rol(row),

        },
        {
            name: "Acciones",
            cell: (row) => (
                <Stack direction={"row"}>
                    <EliminarUsuario row={row} />
                    {btnEditar(row)}
            rol(row),
            grow : 0.6,
           
        },
        {	
            //llamada a los botones
            name: 'Acciones',		
            cell: (row) => (
                <Stack direction="row" textAlign="center">
                        <EditarUsuario row={row} obtenerUsuarios = {obtenerUsuarios}/>                
                        <EliminarUsuario row={row} obtenerUsuarios = {obtenerUsuarios}/>
                </Stack>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '150px',
        },
    ];
    
    const [usuarios,setUsuarios] = useState([]);
    const { auth } = useContext(AuthContext)
    //Llamada a la api
    const obtenerUsuarios = () =>{
        axios.get(import.meta.env.VITE_APP_BACKEND_URL+'usuario.php?cTaller='+auth.cTaller)
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
            columns={columns}
            data={usuarios}
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
            subHeaderComponent={<AgregarUsuarios />}
        />
        title='Lista de usuarios'
        columns ={columns}
        data = {usuarios}
        direction="auto"
        fixedHeader
        fixedHeaderScrollHeight="500px"
        highlightOnHover
        noContextMenu
        pagination
        persistTableHead
        pointerOnHover
        responsive
        subHeaderWrap
        subHeaderAlign="right"
        noDataComponent = {<Typography variant="h5" component="h2"s>
                                No existen datos disponibles
                            </Typography>
                            }
        paginationComponentOptions={paginationComponentOptions}
        actions={<AgregarUsuarios obtenerUsuarios = {obtenerUsuarios}/>}
    />  
    )
}

export default ListaUsuarios

