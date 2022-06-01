import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component'
import { TextField } from '@mui/material';

const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};

const TablaClientes = () => {

    const columns = [
        {
            name: 'Id',
            selector: row => row.cCliente,
            sortable: true,
            width: '10%',
            right: true,
            center: true,

        },
        {
            name: 'Rut',
            selector: row => row.rutC,
            sortable: true
        },
        {
            name: 'Email',
            selector: row => row.emailC,
            sortable: true
        }, {
            name: 'Nombre',
            selector: row => row.nombreC,
            sortable: true
        }, {
            name: 'Apellido',
            selector: row => row.apellidoC,
            sortable: true
        }, {
            name: 'Dirección',
            selector: row => row.direccionC,
            sortable: true
        }, {
            name: 'Estado',
            selector: row => row.estadoC,
            sortable: true
        },
        {
            name: 'Comuna',
            selector: row => row.cComuna,
            sortable: true
        },
    ];

    const [clientes, setClientes] = useState([])

    const getClientes = () => {
        axios.get('http://localhost/apigps/api/cliente.php')
            .then(res => {
                setClientes(res.data)
            })
    }

    /* filtrar clientes por rut */
    const [rut, setRut] = useState('')
    const [filtrarClientes, setFiltrarClientes] = useState([])

    const onChangeRut = (e) => {
        setRut(e.target.value)
        const clientesFiltrados = clientes.filter(cliente => cliente.rutC.includes(e.target.value))
        setFiltrarClientes(clientesFiltrados)
    }

    useEffect(() => {
        getClientes()
    }, [])


    return (
        <>
            <TextField
                label="Buscar por Rut"
                margin="normal"
                variant="outlined"
                fullWidth
                name="search"
                value={rut}
                onChange={onChangeRut}
            />

            <DataTable
                title="Lista de clientes"
                columns={columns}
                data={
                    filtrarClientes.length > 0 ? filtrarClientes : clientes
                }
                direction="auto"
                fixedHeader
                fixedHeaderScrollHeight="300px"
                highlightOnHover
                noContextMenu
                pagination
                persistTableHead
                pointerOnHover
                responsive
                subHeaderAlign="right"
                subHeaderWrap
                paginationComponentOptions={paginationComponentOptions}
            />
        </>


    )
}

export default TablaClientes