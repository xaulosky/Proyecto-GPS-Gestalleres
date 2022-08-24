import { Button, Chip, Grid, IconButton, Stack } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import useAuth from '../../hooks/useAuth'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom'
import EliminarFicha from './EliminarFicha'
import { getFichas } from '../../services/apiFicha'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

const ListaFichas = () => {

    const { auth } = useAuth()
    const [fichas, setFichas] = useState([])
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
                    <>
                        <Stack direction={"row"}>
                            <Link to={"/ficha/" + row.cFicha}>
                                <IconButton title="Ver Ficha">
                                    <VisibilityIcon />
                                </IconButton>
                            </Link>
                           {/*  <Link to={"/editficha/" + row.cFicha}>
                                <IconButton title="Editar Ficha">
                                    <EditIcon />
                                </IconButton>
                            </Link> */}
                            <EliminarFicha cFicha={row.cFicha} setFichas={setFichas} />
                        </Stack>

                    </>
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
                <h1>Lista Fichas</h1>

            </Grid>
            <Grid item md={6} display={'flex'} justifyContent={'end'} alignItems={'center'}>
                <Link to={'/agregar-ficha'} >
                    <Button variant='contained' startIcon={<AddCircleIcon />}>
                        Recepcionar Vehículo
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