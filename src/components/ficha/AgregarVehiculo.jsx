import { Button, Grid, TextField } from '@mui/material'
import React from 'react'

const AgregarVehiculo = ({ vehiculoSeleccionado, vehiculo }) => {


    const handleChangeVehiculo = (event) => {
        setVehiculo({ ...vehiculo, [event.target.name]: event.target.value });
    }

    return (
        <>
            <Grid item md={6} >
                <TextField
                    label="Patente"
                    value={vehiculo.patenteV}
                    fullWidth
                    onChange={handleChangeVehiculo}
                    type='email'
                    name='patenteV'
                    required
                    disabled={vehiculoSeleccionado ? true : false}

                />
            </Grid>
            <Grid item md={6} >
                <TextField
                    type={'text'}
                    label="Modelo"
                    name="modeloV"
                    variant="outlined"
                    fullWidth
                    onChange={handleChangeVehiculo}
                    value={vehiculo.modeloV}
                    disabled={vehiculoSeleccionado ? true : false}

                />
            </Grid>
            <Grid item md={6} >
                <TextField
                    type={'text'}
                    label="Color"
                    name="colorV"
                    variant="outlined"
                    fullWidth
                    onChange={handleChangeVehiculo}
                    value={vehiculo.colorV}
                    disabled={vehiculoSeleccionado ? true : false}

                />
            </Grid>
            <Grid item md={6} >
                <TextField
                    type={'text'}
                    label="Aseguradora"
                    name="cAseguradora"
                    variant="outlined"
                    fullWidth
                    onChange={handleChangeVehiculo}
                    value={vehiculo.cAseguradora}
                    disabled={vehiculoSeleccionado ? true : false}

                />
            </Grid>
            <Grid item md={12}>
                <Button
                    fullWidth
                    type='submit'
                    disabled={vehiculoSeleccionado ? true : false}
                    value="Guardar"
                    variant="contained"
                    color="primary"
                >
                    Agregar Vehículo
                </Button>
            </Grid>
        </>
    )
}

export default AgregarVehiculo