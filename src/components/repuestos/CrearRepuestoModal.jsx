import { Add } from '@mui/icons-material';
import { Button, Grid, Modal } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

const AgregarRepuesto = () => {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [data, setData] = React.useState({
        nombreRepuesto: '',
        cantidad: '',
        fechaSolicitud: '',
        estadoRepuesto: ''
    })

    function handle(e) {
        const newData = { ...data }
        newData[e.target.name] = e.target.value
        setData(newData)
        console.log(newData)
    }

    const submit = (e) => {
        axios.post(import.meta.env.VITE_APP_BACKEND_URL + 'repuesto.php', {
            nombreRepuesto: data.nombreRepuesto,
            cantidad: data.cantidad,
            fechaSolicitud: data.fechaSolicitud,
            estadoRepuesto: data.estadoRepuesto
        })
            .then(respuesta => {
                console.log(respuesta.data)
            })
    }
}

const CrearRepuestoModal = () => {
    return (
        <div>
            <Button onClick={handleOpen} variant='outlined' endIcon={<Add />}>
                Agregar Repuesto
            </Button>

            <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
                <Box>

                </Box>
            </Modal>
        </div>
    )
}



export default CrearRepuestoModal