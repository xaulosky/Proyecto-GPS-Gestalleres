import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'ID',
        selector: row => row.cVehiculo,
        sortable: true,
        width: '10%',
        right: true,
        center: true
    },
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
        name: 'ID Aseguradora',
        selector: row => row.cAseguradora,
        sortable: true
    },
    {
        name: 'Tipo Carroceria',
        selector: row => row.cTipoAseguradora,
        sortable: true
    },
    {
        name: 'ID cliente',
        selector: row => row.cCliente,
        sortable: true
    }
];

const ListaVehiculos = () => {

    const [vehiculos, setVehiculos] = useState([]);

    const obtenerVehiculos = () => {
        axios.get('http://localhost/APIgps/apigps/api/vehiculo.php')
            .then(respuesta => {
                setVehiculos(respuesta.data);
            })
    }

    useEffect(() => {
        obtenerVehiculos();
    }, []);

    return (
        <DataTable
            title="Lista de Vehiculos"
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