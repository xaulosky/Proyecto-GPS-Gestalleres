import { Autocomplete, Button, Grid, IconButton, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { usePartes } from '../../hooks/usePartes'
import { useVehiculos } from '../../hooks/useVehiculos'
import { getFichas, getUltimaFicha, postFicha } from '../../services/apiFicha'
import { postEstadosPV } from '../../services/apiEstadoPV'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


/* screen final */
const ScreenFicha = () => {

    /* usuario loggeado */
    const { auth } = useAuth()

    console.log(auth)
    /* getVehiculos  */
    const { result: vehiculos } = useVehiculos({ action: 'get' })
    const { result: partes } = usePartes({ action: 'get' }) /* getPartes */

    const [fichas, setFichas] = useState([]) /* fichas */
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

    const handleChange = (event) => {
        setDataFicha({
            ...dataFicha,
            [event.target.name]: event.target.value
        })
    }

    const submitFicha = async (event) => {
        event.preventDefault()
        if (dataFicha.cVehiculo == '' || dataFicha.fichaObservacion == '') {
            swal(
                'Todos los campos son requeridos', {
                icon: 'error',
                buttons: false,
            });
            setTimeout(() => {
                swal.close()
            }, 2000);
        } else {
            postFicha(dataFicha).then(response => {
                setDataFicha({
                    fechaIngresoFicha: new Date().toISOString().substring(0, 10),
                    fechaEntregaEstimada: new Date().toISOString().substring(0, 10),
                    fechaEntrega: "",
                    cTaller: auth.cTaller,
                    cVehiculo: '',
                    cUsuario: auth.cUsuario,
                    fichaObservacion: '',
                })

            }).then(() => {
                postEstadosPV(estadoPartes).then(response => {
                    console.log(response)
                }).then(() => {
                    setPartesSeleccionadas([])
                    setVehiculoSeleccionado()
                })
            }).then(() => {
                swal(
                    'Ficha creada!', {
                    icon: 'success',
                    buttons: false,
                });
                setTimeout(() => {
                    swal.close()
                }, 2000);
                setEstadoPartes([])
            })
        }
    }

    useEffect(() => {
        getUltimaFicha(auth.cTaller).then(response => {
            setUltimaFicha(response)
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }, [])


    return (
        <Box component='form'>
            <h1>Ingresar Vehículo a Taller</h1>

            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField label="Fecha Ingreso" type="date" name="fechaIngresoFicha" onChange={handleChange} value={dataFicha.fechaIngresoFicha} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Fecha Entrega Estimada" type="date" name="fechaEntregaEstimada" onChange={handleChange} value={dataFicha.fechaEntregaEstimada} />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            id="vehiculo"
                            options={vehiculos}
                            value={vehiculoSeleccionado}
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
                                            cFicha: ultimaFicha.cFicha + 1,
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
                        <Button variant="contained" color="primary" onClick={submitFicha} fullWidth size='large'>
                            Ingresar Vehículo al Taller
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ScreenFicha