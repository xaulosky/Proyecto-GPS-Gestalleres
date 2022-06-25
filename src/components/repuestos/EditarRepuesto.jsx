import EditIcon from '@mui/icons-material/Edit';
import { Button, DialogActions, Grid, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import swal from 'sweetalert';
import AuthContext from '../../context/AuthContext';


const style = {

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 350,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};


const EditarRepuesto = ({ row, obtenerRepuestos }) => {

    const { auth } = useContext(AuthContext)

    //Comportamiento Modal
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    //Datos a Editar
    const [data, setData] = useState({

        nombreRepuesto: row.nombreRepuesto,
        cantidad: row.cantidad,
        fechaSolicitud: row.fechaSolicitud,
        fechaLlegada: row.fechaLlegada,
        estadoRepuesto: row.estadoRepuesto,
        cRepuesto: row.cRepuesto
    });

    const [res, setRes] = useState({

        msg: ''
    });

    const submit = (e) => {

        e.preventDefault()

        axios.put(import.meta.env.VITE_APP_BACKEND_URL + 'repuesto.php', {

            nombreRepuesto: data.nombreRepuesto,
            cantidad: data.cantidad,
            fechaSolicitud: data.fechaSolicitud,
            fechaLlegada: data.fechaLlegada,
            estadoRepuesto: data.estadoRepuesto
        })
            .then(respuesta => {
                obtenerRepuestos();
                handleClose();
                setRes(respuesta.data)
                if (respuesta.data.msg === 'ok') {
                    swal({
                        title: 'Repuesto Editado',
                        text: 'El repuesto se ha editado correctamente',
                        icon: 'success',
                        button: 'Aceptar'
                    });
                } else {
                    swal({
                        title: 'Error',
                        text: 'Se ha producido un error al editar el repuesto',
                        icon: 'error',
                        button: 'Cerrar'
                    });
                }
            })
    }

    function handle(e) {

        const newData = { ...data }
        newData[e.target.name] = e.target.value
        setData(newData)
    }

    function abrirEdit() {

        obtenerRepuestos()
        setData({

            nombreRepuesto: row.nombreRepuesto,
            cantidad: row.cantidad,
            fechaSolicitud: row.fechaSolicitud,
            fechaLlegada: row.fechaLlegada,
            estadoRepuesto: row.estadoRepuesto,
        });
        handleOpen()
    }

    function cerrarEdit() {

        obtenerRepuestos()
        setData({

            nombreRepuesto: row.nombreRepuesto,
            cantidad: row.cantidad,
            fechaSolicitud: row.fechaSolicitud,
            fechaLlegada: row.fechaLlegada,
            estadoRepuesto: row.estadoRepuesto,
        });
        handleClose()
    }

    return (
        <>
            <Button
                onClick={() => abrirEdit()}
                color='primary'
                type='submit'
                name={'editar'}
                title='Editar'
                endIcon={<EditIcon />}
            >
            </Button>
            <Modal
                open={open}
                onClose={() => cerrarEdit()}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box
                    component='form'
                    sx={style}
                    onSubmit={submit}
                >
                    <Typography
                        id='modal-modal-title'
                        variant='h6'
                        component={'div'}
                        align='center'>
                        Editar Repuesto
                    </Typography>
                    <Typography
                        id='modal-modal-description'
                        sx={{ mt: 2 }}
                        component={'div'}>
                        <TextField
                            fullWidth
                            id='standard-basic'
                            label='Nombre Repuesto'
                            margin='normal'
                            variant='outlined'
                            type={'text'}
                            name={'nombreRepuesto'}
                            InputLabelProps={{ shrink: true }}
                            value={data.nombreRepuesto}
                            onChange={(e) => handle(e)}
                        />

                        <TextField
                            fullWidth
                            id='standard-basic'
                            label='Cantidad'
                            margin='normal'
                            variant='outlined'
                            type={'number'}
                            name={'cantidad'}
                            InputLabelProps={{ shrink: true }}
                            value={data.cantidad}
                            onChange={(e) => handle(e)}
                        />

                        <TextField
                            fullWidth
                            id='standard-basic'
                            label='Fecha Solicitud'
                            margin='normal'
                            variant='outlined'
                            type={'date'}
                            name={'fechaSolicitud'}
                            InputLabelProps={{ shrink: true }}
                            value={data.fechaSolicitud}
                            onChange={(e) => handle(e)}
                        />

                        <TextField
                            fullWidth
                            id='standard-basic'
                            label='Fecha Llegada'
                            margin='normal'
                            variant='outlined'
                            type={'date'}
                            name={'fechaLlegada'}
                            InputLabelProps={{ shrink: true }}
                            value={data.fechaLlegada}
                            onChange={(e) => handle(e)}
                        />

                        <TextField
                            fullWidth
                            id='standard-basic'
                            label='Estado Repuesto'
                            margin='normal'
                            variant='outlined'
                            type={'text'}
                            name={'estadoRepuesto'}
                            InputLabelProps={{ shrink: true }}
                            value={data.estadoRepuesto}
                            onChange={(e) => handle(e)}
                        />
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            style={{ height: '100px' }}
                        >
                            <DialogActions>
                                <Button
                                    sx={{ m1: 10, p: '5px 20px' }}
                                    variant='contained'
                                    color='primary'
                                    type='submit'
                                    name={'editar'}
                                >
                                    Aceptar
                                </Button>
                                <Button
                                    sx={{ m1: 10, p: '5px 20px' }}
                                    onclick={() => cerrarEdit()}
                                    variant='contained'
                                    color='error'
                                    name={'cancelar'}
                                >
                                    Cancelar
                                </Button>
                            </DialogActions>

                        </Grid>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default EditarRepuesto