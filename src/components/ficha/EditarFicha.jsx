import { Autocomplete, Box, Button, Grid, TextField } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { getEstadosPV } from '../../services/apiEstadoPV'
import { getFichaById } from '../../services/apiFicha'
import { getVehiculoById, getVehiculos } from '../../services/apiVehiculos'

const EditarFicha = () => {

    const { id } = useParams()
    const { auth } = useAuth()


    const [vehiculos, setVehiculos] = useState([]);
    const [ultimaFicha, setUltimaFicha] = useState({}) /* ultima ficha */

    const [dataFicha, setDataFicha] = useState({
        fechaIngresoFicha: new Date().toISOString().substring(0, 10),
        fechaEntregaEstimada: new Date().toISOString().substring(0, 10),
        fechaEntrega: "",
        cTaller: auth.cTaller,
        cVehiculo: '',
        cUsuario: auth.cUsuario,
        fichaObservacion: '',
    })

    const [partesSeleccionadas, setPartesSeleccionadas] = useState([])
    const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState()
    const [estadoPartes, setEstadoPartes] = useState([]);


    const [partes, setPartes] = useState([])
    const [ficha, setFicha] = useState({})

    useEffect(() => {
        getEstadosPV(id).then(res => {
            setPartes(res)
            console.log(res)
        })
        getFichaById(id, auth.cTaller).then(res => {
            setFicha(res[0])
            return res[0]
        }).then((res) => {
            console.log(res)
            getVehiculoById(res.cVehiculo).then((res) => {
                setVehiculoSeleccionado(res[0])
            })
        })

        getVehiculos(auth.cTaller).then((res) => setVehiculos(res))

    }, [])

    const handleChange = (event) => {
        setDataFicha({
            ...dataFicha,
            [event.target.name]: event.target.value
        })
    }


    return (
        <Box component='form'>
            <Grid container>
                <Grid item xs={6}>
                    <h1>Modificar ficha recepción</h1>
                </Grid>
                <Grid item xs={6} display={'flex'} justifyContent={'end'} alignItems={'center'}>
                    <Link to="/fichas">
                        <Button variant="contained">Lista de fichas</Button>
                    </Link>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Fecha Ingreso" type="date" InputLabelProps={{ shrink: true }} name="fechaIngresoFicha" onChange={handleChange} value={ficha.fechaIngresoFicha} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Fecha Entrega Estimada" type="date" InputLabelProps={{ shrink: true }} name="fechaEntregaEstimada" onChange={handleChange} value={ficha.fechaEntregaEstimada} />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            id="vehiculo"
                            defaultValue={vehiculoSeleccionado}
                            options={vehiculos}
                            getOptionLabel={(option) => option.nombreC + ' ' + option.rutC + ' ' + option.patenteV + '  ' + option.modeloV}
                            onChange={(event, value) => {
                                if (value) {
                                    setDataFicha({
                                        ...dataFicha,
                                        cVehiculo: value.cVehiculo
                                    })
                                    setVehiculoSeleccionado(value)
                                } else {
                                    setVehiculoSeleccionado()
                                    setDataFicha({
                                        ...dataFicha,
                                        cVehiculo: ''
                                    })

                                }
                            }
                            }
                            renderInput={(params) => <TextField {...params} label="Selecciona Vehiculo" variant="outlined" fullWidth />}
                            isOptionEqualToValue={(option, value) => option.cVehiculo === value.cVehiculo}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {/* autocomplete multiple partes */}
                        <Autocomplete
                            multiple={true}
                            value={partesSeleccionadas}
                            id="partes"
                            options={partes || []}
                            getOptionLabel={(option) => option.nombrePV}
                            onChange={(event, value) => {
                                if (value) {
                                    setPartesSeleccionadas(value)
                                    setEstadoPartes(value.map(parte => {
                                        return {
                                            cParteV: parte.cParteV,
                                            estado: true
                                        }
                                    }
                                    ))
                                } else {
                                    setPartesSeleccionadas([])
                                    setEstadoPartes([])
                                }

                            }
                            }
                            renderInput={(params) => <TextField {...params} label="Selecciona Partes" variant="outlined" fullWidth />}
                            isOptionEqualToValue={(option, value) => option.cParteV === value.cParteV}
                        />


                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Observaciones" name="fichaObservacion" onChange={handleChange} value={dataFicha.fichaObservacion} fullWidth multiline rows={"4"} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" fullWidth size='large'>
                            Ingresar Vehículo al Taller
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default EditarFicha