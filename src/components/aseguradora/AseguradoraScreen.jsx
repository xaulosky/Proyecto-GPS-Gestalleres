import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { Button, Grid, Stack, Typography } from '@mui/material';
import DataTable from 'react-data-table-component';
import AuthContext from '../../context/AuthContext';
import AddAseguradora from './AddAseguradora'


import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

function formatoNumeros(numero) {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const formatoDinero = (numero) => {
    return ' $ ' + formatoNumeros(numero);
}

const aseguradora = () => {


    const columns = [
        {
            name: 'Nombre aseguradora',
            selector: row => row.nombreAseguradora,
        },
        {
            name: 'Tipo seguro',
            selector: row => row.tipoSeguro,
        },
        {
            name: 'Acciones',
            cell: (row) => {
                return (
                    <Stack direction={row} textAlign="center" >
                        
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
    //Pie de pagina 
    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    const [aseguradoras, setAseguradora] = useState([]);
    const obtenerAseguradora = () => {
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'aseguradora.php')
            .then(respuesta => {
                setAseguradora(respuesta.data);
            })
    }
    useEffect(() => {
        obtenerAseguradora();
    }, [])

    return (
        <>
            <Grid item align='right' xs={12} >
                <AddAseguradora obtenerAseguradora={obtenerAseguradora} />
            </Grid>

            <DataTable
                title=""
                columns={columns}
                data={aseguradoras}
                dense
                direction="auto"
                fixedHeaderScrollHeight="300px"
                pagination
                responsive
                subHeaderAlign="center"
                noDataComponent={<Typography variant="h5" component="h2" s>
                    No existen datos disponibles
                </Typography>
                }
                paginationComponentOptions={paginationComponentOptions}
                subHeaderWrap
            />
        </>
    )
}


export default aseguradora