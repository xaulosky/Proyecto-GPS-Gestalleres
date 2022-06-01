import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, FormControl, FormLabel, FormGroup, FormHelperText, TextField, Grid, Divider, MenuItem, InputLabel, Select } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

const columns = [
    {
        name: 'Nombre',
        selector: row => row.nombreU,
    },
    {
        name: 'Email',
        selector: row => row.email,
    },
    {
        name: 'Rol',
        selector: row => row.cRolU,
    },
];

const ListaUsuarios = () => {

    const [usuarios,setUsuarios] = useState([]);

    const obtenerUsuarios = () =>{
        axios.get('http://localhost/apigps/api/usuario.php')
        .then(respuesta => {
            setUsuarios(respuesta.data);
        })
    }
    useEffect(()=>{
        obtenerUsuarios();
    },[])
    
    return (
        <DataTable
            title ='Lista de usuarios'
            columns ={columns}
            data = {usuarios}
        />
    )
}


export default ListaUsuarios
