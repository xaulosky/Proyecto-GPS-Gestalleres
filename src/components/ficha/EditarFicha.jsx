import { Box, Grid, TextField } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { getFichaById } from '../../services/apiFicha'

const EditarFicha = () => {

    const { id } = useParams()
    const { auth } = useAuth()

    const [formData, setFormData] = useState({
        cFicha: "",
        fechaIngresoFicha: "",
        fechaEntregaEstimada: "",
        fechaEntrega: '',
        cVehiculo: '',
        fichaObservacion: ''
    });

    const [ficha, setFicha] = useState();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        getFichaById({ cTaller: auth.cTaller, cFicha: id })
            .then((res) => {
                setFicha(res)
            })
    }, [])

    return (
        <Grid container>
            <Grid item xs={6} >
                <h1>Modificando ficha</h1>
            </Grid>
            <Grid item xs={12}>
                <Box component="form" >
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Fecha Ingreso Vehiculo"
                                    name="fechaIngresoFicha"
                                    type="date"
                                    value={formData.fechaIngresoFicha}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Ficha Entrega Estimada"
                                    type="date"
                                    name="fechaEntregaEstimada"
                                    value={formData.fechaEntregaEstimada}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Fecha Ingreso Vehiculo"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Fecha Ingreso Vehiculo"
                                    fullWidth
                                />
                            </Grid><Grid item xs={6}>
                                <TextField
                                    label="Fecha Ingreso Vehiculo"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Fecha Ingreso Vehiculo"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                </Box>
            </Grid>

        </Grid>
    )
}

export default EditarFicha