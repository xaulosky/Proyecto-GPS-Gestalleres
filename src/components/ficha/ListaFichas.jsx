import { Button, Chip, Grid, Stack } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import useAuth from '../../hooks/useAuth'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom'
import EliminarFicha from './EliminarFicha'
import { getFichas } from '../../services/apiFicha'

const ListaFichas = () => {

    const { auth } = useAuth()
    const [fichas, setFichas] = useState([])
    console.log(auth.cTaller)
    const columns = [
        {
            name: 'Patente Vehiculo',
            selector: 'patenteV',
            sortable: true
        },
        {
            name: 'Fecha Ingreso',
            selector: 'fechaIngresoFicha',
            sortable: true
        },
        {
            name: 'Entrega Estimada',
            selector: 'fechaEntregaEstimada',
            sortable: true,
            title: "asdasd"
        },
        {
            name: "Estado",
            selector: row => {
                return (
                    (row.fechaEntrega != null)
                        ?
                        <Chip label="Entregado" color="primary" />
                        :
                        <Chip label="No entregado" color="secondary" />
                )
            },
            center: true
        },
        {
            name: "Acciones",
            selector: row => {
                return (
                    <Stack direction={"row"}>
                        <EliminarFicha cFicha={row.cFicha} setFichas={setFichas} />
                    </Stack>
                )
            }
        }
    ]

  /*   const obtenerFichas = () => {
        getFichas(auth.cTaller).then(res => {
            setFichas(res)
        })
    } */


    useEffect(() => {
        /* obtenerFichas() */
        getFichas(auth.cTaller).then(res => {
            setFichas(res)
        })
    }, [])

    return (
        <Grid container>
            <Grid item md={6}>
                <h1>Lista Ingresos</h1>

            </Grid>
            <Grid item md={6} display={'flex'} justifyContent={'end'} alignItems={'center'}>
                <Link to={'/agregar-ficha'} >
                    <Button variant='contained' startIcon={<AddCircleIcon />}>
                        Ingresar Vehiculo
                    </Button>
                </Link>
            </Grid>
            <Grid item md={12}>
                <DataTable
                    data={fichas}
                    columns={columns}
                    pagination={true}
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[5, 10, 15]}
                    paginationComponentOptions={{
                        rowsPerPageText: 'Filas por página:',
                        rangeSeparatorText: 'de',
                        selectAllRowsItem: true,
                        selectAllRowsItemText: 'Todas',
                        selectAllRowsItemTooltip: 'Todas',
                        firstPageTooltip: 'Primera página',
                        previousPageTooltip: 'Página anterior',
                        nextPageTooltip: 'Página siguiente',
                        lastPageTooltip: 'Última página',
                        labelDisplayedRows: '{from}-{to} de {count}',
                        labelRowsPerPage: 'Filas por página'
                    }}
                />
            </Grid>
        </ Grid>
    )
}

export default ListaFichas