import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, FormControl, FormLabel, FormGroup, FormHelperText, TextField, Grid, Divider, MenuItem, InputLabel, Select } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

export const str = 'Hola';

const ListaUsuarios = () => {

    const editarUsuario = (row) => {
        console.log(row)
    }

    const columns = [

        {
            name: 'Nombre',
            selector: row => row.nombreU,
            grow: 2,
        },
        {
            name: 'Email',
            selector: row => row.email,
            grow: 2,
        },
        {
            name: 'Rol',
            selector: row => row.cRolU,
            grow: 2,
        }
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
            columns={columns}
            data={usuarios}
        />

    )
}


export default ListaUsuarios