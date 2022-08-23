import { Add, Today } from '@mui/icons-material';
import { Button, Grid, Modal, Box, Typography, TextField } from '@mui/material'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import React, { useContext, useState } from 'react'

const style = {

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AgregarRepuesto = ({obtenerRepuestos}) => {
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

    /* const [fecha, setFecha] = useState({
        fechaSolicitudModal: new Date().toISOString().substring(0, 10),
    }) */

    function handle(e) {
        const newData = { ...data }
        newData[e.target.name] = e.target.value
        setData(newData)
        console.log(newData)
    }

    const submit = (e) => {
        e.preventDefault()
        axios.post(import.meta.env.VITE_APP_BACKEND_URL + 'repuesto.php', {
            nombreRepuesto: data.nombreRepuesto,
            cantidad: data.cantidad,
            fechaSolicitud: data.fechaSolicitud,
            estadoRepuesto: data.estadoRepuesto,
            cTaller: auth.cTaller
        })
            .then(respuesta => {
                obtenerRepuestos();
                handleClose();
                console.log(respuesta)
            })
    }

    return (
        <div>
            <Button
                onClick={handleOpen}
                variant='contained'
                color='primary'
                type={'submit'}
                title='Agregar Repuesto'
                endIcon={<Add />}>

                Agregar Repuesto
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box
                    component='form'
                    sx={style}
                    onSubmit={submit}>
                    <Typography
                        id='modal-modal-title'
                        variant='h6'
                        component={'div'}
                        align='center'>

                        Agregar Repuesto
                    </Typography>
                    <Typography
                    id='modal-modal-description'
                    sx={{ mt: 2 }}
                    component={'div'}>
                        <TextField
                            id='standard-basic'
                            label='Nombre Repuesto'
                            margin='normal'
                            variant='outlined'
                            type={'text'}
                            InputLabelProps={{ shrink: true }}
                            name={'nombreRepuesto'}
                            inputProps={{ maxlenght: 256 }}
                            required onChange={(e) => handle(e)}
                        />

                        <TextField
                            id='standard-basic'
                            label='Cantidad'
                            margin='normal'
                            variant='outlined'
                            type={'number'}
                            InputLabelProps={{ shrink: true }}
                            name={'cantidad'}
                            inputProps={{ maxlenght: 256 }}
                            required
                            onChange={(e) => handle(e)}
                        />

                        <TextField
                            id='standard-basic'
                            label='Fecha Solicitud'
                            margin='normal'
                            variant='outlined'
                            type={'date'}
                            InputLabelProps={{ shrink: true }}
                            name={'fechaSolicitud'}
                            inputProps={{ maxlenght: 256 }}
                            required
                            onChange={(e) => handle(e)}
                        />

                        <TextField
                            id='standard-basic'
                            label='Estado Repuesto'
                            margin='normal'
                            variant='outlined'
                            type={'text'}
                            InputLabelProps={{ shrink: true }}
                            name={'estadoRepuesto'}
                            inputProps={{ maxlenght: 256 }}
                            required
                            onChange={(e) => handle(e)}
                        />
                    </Typography>
                    <Button
                        sx={{ m1: 5, p: '4px 15px' }}
                        variant='contained'
                        color='primary'
                        name={'agregarRepuesto'}
                        type={'submit'}
                    >

                        Añadir
                    </Button>
                    <Button
                        sx={{ m1: 5, p: '4px 15px' }}
                        onClick={handleClose}
                        variant='contained'
                        color='error'
                        name={'salir'}
                    >

                        Cancelar
                    </Button>
                </Box>
            </Modal>
        </div >
    )
}



export default AgregarRepuesto