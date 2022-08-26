import { Add, Today } from '@mui/icons-material';
import { Button, Grid, Modal, Box, Typography, TextField, DialogActions } from '@mui/material'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import React, { useContext, useState } from 'react'

const style = {

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

const AgregarRepuesto = ({ obtenerRepuestos }) => {
    const { auth } = useContext(AuthContext)

    //Comportamiento Modal
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    //Datos Ingreso
    const [data, setData] = useState({
        nombreRepuesto: '',
        cantidad: '',
        fechaSolicitud: '',
        estadoRepuesto: ''
    })

    function handle(e) {
        const newData = { ...data }
        newData[e.target.name] = e.target.value
        setData(newData)
    }

    const submit = (e) => {
        e.preventDefault()
        axios.post(import.meta.env.VITE_APP_BACKEND_URL + 'repuesto.php', {
            nombreRepuesto: data.nombreRepuesto,
            cantidad: data.cantidad,
            marcaVehiculo: data.marcaVehiculo,
            modeloVehiculo: data.modeloVehiculo,
            cTaller: auth.cTaller
        })
            .then(respuesta => {
                obtenerRepuestos();
                handleClose();
                console.log(respuesta)
            })
    }
}

const AgregarRepuesto2 = () => {
    return (
        <div>
            <Button
                onClick={handleOpen}
                sx={{ ml: 3, p: '10px 15px' }}
                variant='contained'
                color='primary'
                type={'submit'}
                title='Agregar Repuesto'
                endIcon={<Add />}
                disabled={restringirBoton()}>

                Agregar Repuesto
            </Button>
        </div> 
    )
}

export default AgregarRepuesto2
