<<<<<<< HEAD
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
=======
import { Table, TableBody, TableCell, 
    TableContainer, TableHead, 
    TableRow, Button, IconButton, 
    Dialog, DialogActions, DialogContent, 
    DialogContentText, DialogTitle, Slide, 
    FormControl, FormLabel, FormGroup, 
    FormHelperText, TextField, Grid, Divider, 
    MenuItem, InputLabel, Select, Modal, Box, makeStyles, Stack } from '@mui/material'
>>>>>>> 6b599c3ae6d29155aae8ed5bbd7f7b326575ac06
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import AgregarUsuarios from './AgregarUsuarios'
import EliminarUsuario from './EliminarUsuario';
<<<<<<< HEAD

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
=======
import EditarUsuario from './EditarUsuario'
>>>>>>> 6b599c3ae6d29155aae8ed5bbd7f7b326575ac06

function rol(row) {
    if (row.cRolU == 1) {
        return (
            <div>
                Jefe de taller
            </div>
        )
    }
    if (row.cRolU == 2) {
        return (
            <div>
                Secretaria
            </div>
        )
    }
    if (row.cRolU == 3) {
        return (
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
<<<<<<< HEAD
            grow: 1,
=======
            grow : 1.3,
>>>>>>> 6b599c3ae6d29155aae8ed5bbd7f7b326575ac06
        },
        {
            name: 'Email',
            selector: row => row.email,
<<<<<<< HEAD
            grow: 1,
=======
            grow : 1.3,
>>>>>>> 6b599c3ae6d29155aae8ed5bbd7f7b326575ac06
        },
        {
            name: 'Rol',
            cell: (row) =>
<<<<<<< HEAD
                rol(row),

        },
        {
            name: "Acciones",
            cell: (row) => (
                <Stack direction={"row"}>
                    <EliminarUsuario row={row} />
                    {btnEditar(row)}
=======
            rol(row),
            grow : 0.8,
           
        },
        
        {	
            name: 'Acciones',		
            cell: (row) => (
                <Stack direction="row" spacing={1} justifyContent = 'flex-start' >
                    <EditarUsuario row={row}/>
                    <EliminarUsuario row={row}/>
                    <p></p>
>>>>>>> 6b599c3ae6d29155aae8ed5bbd7f7b326575ac06
                </Stack>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
<<<<<<< HEAD

=======
            grow : 2,
            
>>>>>>> 6b599c3ae6d29155aae8ed5bbd7f7b326575ac06
        },
    ];

    const [usuarios, setUsuarios] = useState([]);

    const obtenerUsuarios = () => {
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'usuario.php')
            .then(respuesta => {
                setUsuarios(respuesta.data);
            })
    }
    useEffect(() => {
        obtenerUsuarios();
    }, [])

    return (

        <DataTable
<<<<<<< HEAD
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
=======
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
>>>>>>> 6b599c3ae6d29155aae8ed5bbd7f7b326575ac06
    )
}

export default ListaUsuarios

