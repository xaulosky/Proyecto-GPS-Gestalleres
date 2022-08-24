import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Grid, Stack } from '@mui/material';
import DataTable from 'react-data-table-component';
import EditarVehiculo from './EditarVehiculo';
import EliminarVehiculo from './EliminarVehiculo';
import AgregarVehiculo from './AgregarVehiculo';



function formatoNumeros(numero) {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/*const formatoDinero = (numero) => {
    return ' $ ' + formatoNumeros(numero);
}*/


const ListaVehiculos = () => {

    const columns = [
        {
            name: '#Vehiculo',
            selector: row => row.cVehiculo,
        },
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
        },
        {
            name: 'Estado',
            selector: row => row.estadoV,
        },
        {
            name: 'Estado Revision Tecnica',
            selector: row => row.estadoRevisionTecnicaV,
        },
        {
            name: 'Monto Aseguradora',
            selector: row => (formatoNumeros(row.montoAseguradora)),
        },
        {
            name: 'Tipo Carroceria',
            selector: row => row.cTipoCarroceria,
        },
        {
            name: 'Acciones',
            cell: (row) => {
                return (
                    <Stack direction={row} textAlign="center" >
                        <EditarVehiculo
                            row={row}
                            obtenerVehiculos={obtenerVehiculos}
                        />
                        <EliminarVehiculo
                            row={row}
                            obtenerVehiculos={obtenerVehiculos}
                        />
                    </Stack>
                )
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '150px',
            align: 'center',
        }
    ];

    const [tipoCarrocerias, setTipoCarrocerias] = useState();
    const [tipoCarroceriaSeleccionada, setTipoCarroceriaSeleccionada] = useState();


    const [vehiculos, setVehiculos] = useState([]);

    const obtenerVehiculos = () => {
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'vehiculo.php')
            .then(respuesta => {
                setVehiculos(respuesta.data);
            })
    }

    const obtenerTipoCarrocerias = () => {
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'tipoCarroceria.php')
            .then(respuesta => {
                setTipoCarrocerias(respuesta.data);
            })
    }

    useEffect(() => {
        obtenerVehiculos();
        obtenerTipoCarrocerias();
    }, [])

    return (
        <>
            <Grid item align='right' xs={12} >
                <AgregarVehiculo obtenerVehiculos={obtenerVehiculos} />
            </Grid>

            <DataTable
                title=""
                columns={columns}
                data={vehiculos}
                dense
                direction="auto"
                fixedHeaderScrollHeight="300px"
                pagination
                responsive
                subHeaderAlign="center"
                subHeaderWrap
            />
        </>
    )
}

export default ListaVehiculos