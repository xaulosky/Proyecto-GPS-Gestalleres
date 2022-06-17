import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { clearRUT, validarRUT } from 'validar-rut'


const AgregarCliente = ({ clienteSeleccionado }) => {

    /* state cliente */
    const [cliente, setCliente] = useState({
        cCliente: '',
        nombreC: "",
        apellidoC: "",
        rutC: '',
        emailC: '',
    })
    /* guarda datos del cliente */
    const handleChangeCliente = (event) => {
        setCliente({ ...cliente, [event.target.name]: event.target.value });
    }

    useEffect(() => {
        if (clienteSeleccionado) {
            setCliente({
                cCliente: clienteSeleccionado.cCliente,
                nombreC: clienteSeleccionado.nombreC,
                apellidoC: clienteSeleccionado.apellidoC,
                rutC: clienteSeleccionado.rutC,
                emailC: clienteSeleccionado.emailC,
            })
        }
    }, [clienteSeleccionado])


    return (
        <>
            <Grid item md={6}>
                <TextField
                    label="Nombre"
                    value={cliente.nombreC}
                    onChange={handleChangeCliente}
                    fullWidth
                    name='nombreC'
                    data
                    disabled={clienteSeleccionado ? true : false}
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                    label="Apellido"
                    value={cliente.apellidoC}
                    fullWidth
                    onChange={handleChangeCliente}
                    name='apellidoC'
                    disabled={clienteSeleccionado ? true : false}

                />
            </Grid>
            <Grid item md={6}>
                <TextField
                    label="Rut"
                    value={cliente.rutC}
                    fullWidth
                    onChange={handleChangeCliente}
                    error={cliente.rutC == '' ? false : !validarRUT(cliente.rutC)}
                    name='rutC'
                    required
                    disabled={clienteSeleccionado ? true : false}

                />
            </Grid>
            <Grid item md={6}>
                <TextField
                    label="Email"
                    value={cliente.emailC}
                    fullWidth
                    onChange={handleChangeCliente}
                    type='email'
                    name='emailC'
                    required
                    disabled={clienteSeleccionado ? true : false}
                />
            </Grid>
            <Grid item md={12}>
                <Button
                    fullWidth
                    type='submit'
                    disabled={clienteSeleccionado ? true : false}
                    value="Guardar"
                    variant="contained"
                    color="primary"
                >
                    Agregar Cliente
                </Button>
            </Grid>
        </>
    )
}

export default AgregarCliente