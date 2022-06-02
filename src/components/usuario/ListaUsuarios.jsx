import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, FormControl, FormLabel, FormGroup, FormHelperText, TextField, Grid, Divider, MenuItem, InputLabel, Select } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

const ListaUsuarios = () => {
    
	const handleButtonClick = () => {
		console.log('clicked');
	};

    const columns = [
    
        {
            name: 'Nombre',
            selector: row => row.nombreU,
            grow : 2,
        },
        {
            name: 'Email',
            selector: row => row.email,
            grow : 2,
        },
        {
            name: 'Rol',
            selector: row => row.cRolU,
            grow : 2,
        },
        {	
            cell: () => 
            <Button 
                onClick={handleButtonClick} 
                variant = "outlined"
                size = "small"
                startIcon={<EditIcon fontSize = "small" />}
            >
                Modificar
            </Button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            left: true
            
        },
        {			
            cell: () => 
            <Button 
                onClick={handleButtonClick} 
                variant = "outlined"
                color = 'error'
                size = "small"
                startIcon={<DeleteIcon fontSize = "small"/>}
            >
                Eliminar 
            </Button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            right: true,

        },
    ];

    

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
            columns ={columns}
            data = {usuarios}
        />
    )
}


export default ListaUsuarios
