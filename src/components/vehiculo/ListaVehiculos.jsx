import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Patente',
        selector: row => row.patenteV,
    },
    {
        name: 'Modelo',
        selector: row => row.modeloV,
    },
    {
        name: 'Color',
        selector: row => row.colorV,
    }
];

const ListaVehiculos = () => {

    const [vehiculos, setVehiculos] = useState([]);

    const obtenerVehiculos = () => {
        axios.get('http://localhost/apigps/api/vehiculo.php')
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