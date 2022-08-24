import { Button, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { getEstadosPV } from '../../services/apiEstadoPV'
import { getFichaById } from '../../services/apiFicha'

const VerFicha = () => {
    const { id } = useParams()
    const { auth } = useAuth()

    const [partes, setPartes] = useState([])
    const [ficha, setFicha] = useState({})

    useEffect(() => {
        getEstadosPV(id).then(res => {
            setPartes(res)
            console.log(res)
        })
        getFichaById(id, auth.cTaller).then(res => {
            setFicha(res[0])
            console.log(res[0])
        })
    }, [])

    return (
        <Grid container sx={{ p: "20px" }}>
            <Grid item xs={6}>
                <h3>Ficha: N° {id}</h3>
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent={'end'} alignItems={'center'}>
                <Link to="/fichas">
                    <Button variant="contained">Volver</Button>
                </Link>
            </Grid>
            <Grid item xs={6}>
                <p><strong>Patente Vehículo:</strong> {ficha.patenteV} </p>
            </Grid>
            <Grid item xs={6}>
                <p><strong>Nombre Cliente:</strong> {ficha.nombreC} </p>
            </Grid>
            <Grid item xs={6}>
                <p><strong>Fecha Ingreso:</strong> {ficha.fechaIngresoFicha} </p>
            </Grid>
            <Grid item xs={6}>
                <p><strong>Fecha Estimada Entrega:</strong> {ficha.fechaEntregaEstimada} </p>
            </Grid>
            <Grid item xs={6}>
                <p><strong>Fecha Entrega Real:</strong> {ficha.fechaEntrega ? ficha.fechaEntrega : "No entregado"} </p>
            </Grid>
            <Grid item xs={12}>
                <strong>Partes que se encuentran ok</strong>
                <ul>
                    {
                        partes.map(item => (
                            <li key={item.cParteV}>{item.nombrePV}</li>
                        ))
                    }
                </ul>
            </Grid>
            <Grid item xs={12}>
                <strong>Observaciones</strong> <br />
                {ficha.fichaObservacion}
            </Grid>
        </Grid>
    )
}

export default VerFicha