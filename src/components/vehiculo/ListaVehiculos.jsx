import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import EditIcon from '@mui/icons-material/Edit';

const columns = [
    {
        name: 'Patente',
        selector: row => row.patenteV,
        sortable: true
    },
    {
        name: 'Modelo',
        selector: row => row.modeloV,
        sortable: true
    },
    {
        name: 'Color',
        selector: row => row.colorV,
        sortable: true
    },
    {
        name: 'Estado',
        selector: row => row.estadoV,
        sortable: true
    },
    {
        name: 'Estado Revision Tecnica',
        selector: row => row.estadoRevisionTecnicaV,
        sortable: true
    },
    {
        name: 'Aseguradora Monto',
        selector: row => row.montoAseguradora,
        sortable: true
    },
    {
        name: 'Tipo Carroceria',
        selector: row => row.cTipoAseguradora,
        sortable: true
    },
    {
        name: "Acciones",
        cell: (row) => <Button raised primary onClick={() => { console.log(row) }}><EditIcon /></Button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    }
];



const ListaVehiculos = () => {

    const [vehiculos, setVehiculos] = useState([]);

    const obtenerVehiculos = () => {
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'vehiculo.php')
            .then(respuesta => {
                setVehiculos(respuesta.data);
            })
    }

    useEffect(() => {
        obtenerVehiculos();
    }, []);

    return (
        <DataTable
            columns={columns}
            data={vehiculos}
            dense
            direction="auto"
            fixedHeaderScrollHeight="300px"
            pagination
            responsive
            subHeaderAlign="right"
            subHeaderWrap
        />
    )
}

export default ListaVehiculos