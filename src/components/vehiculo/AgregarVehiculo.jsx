import * as React from 'react'
import { Box, Button, DialogActions, Grid, Modal, TextField, Typography, MenuItem, Input, InputLabel, Select, Menu, FormControl, Stack, Autocomplete } from '@mui/material'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import { useClientes } from '../../hooks/useClientes';
import swal from 'sweetalert';

const style = {

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};



const AgregarVehiculo = ({ row, obtenerVehiculos }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [data, setData] = useState({
        patenteV: '',
        modeloV: '',
        colorV: '',
        estadoV: '',
        estadoRevisionTecnicaV: '',
        montoAseguradora: '',
        cAseguradora: '',
        cTipoCarroceria: '',
        cCliente: '',
    });

    const submit = (e) => {

        e.preventDefault();
        axios.post(import.meta.env.VITE_APP_BACKEND_URL + 'vehiculo.php', {
            patenteV: data.patenteV,
            modeloV: data.modeloV,
            colorV: data.colorV,
            estadoV: data.estadoV,
            estadoRevisionTecnicaV: data.estadoRevisionTecnicaV,
            montoAseguradora: data.montoAseguradora,
            cAseguradora: data.cAseguradora,
            cTipoCarroceria: data.cTipoCarroceria,
            cCliente: data.cCliente,

        }).then(respuesta => {
            obtenerVehiculos()
            handleClose();
        }).then(() => {
            swal(
                'Vehiculo agregado exitosamente!', {
                icon: 'success',
                buttons: false,
            });
            setTimeout(() => {
                swal.close()
            }, 2000);
        })

    };

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.name] = e.target.value;
        setData(newdata);
        console.log(newdata);
    };

    const onChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };



    const [aseguradoras, setAseguradoras] = useState();
    const [aseguradoraSeleccionada, setAseguradoraSeleccionada] = useState();

    const [clientes, setClientes] = useState();
    const [clienteSeleccionado, setClienteSeleccionado] = useState();

    const [tipoCarrocerias, setTipoCarrocerias] = useState();
    const [tipoCarroceriaSeleccionada, setTipoCarroceriaSeleccionada] = useState();

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'aseguradora.php').then(respuesta => {
            setAseguradoras(respuesta.data);
        })
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'cliente.php').then(respuesta => {
            setClientes(respuesta.data);
        })
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'TipoCarroceria.php').then(respuesta => {
            setTipoCarrocerias(respuesta.data);
        })
    }, [], [], []);

    const cerrarModal = () => {
        obtenerVehiculos();
        setData({
            patenteV: '',
            modeloV: '',
            colorV: '',
            estadoV: '',
            estadoRevisionTecnicaV: '',
            montoAseguradora: '',
            tipoAseguradora: '',
            cVehiculo: '',
        });
        handleClose();
    };

    return (
        <>
            <Button onClick={handleOpen}
                variant="contained"
                color="primary"
                type={'submit'}
                name={'crear'}
                endIcon={<CarRepairIcon />}
            >
                Añadir Vehiculo
            </Button>


            <Modal
                open={open}
                onClose={cerrarModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box component='form' sx={style} onSubmit={submit} >
                    <Typography id="modal-modal-title" variant="h6" component={'div'} align='center'>
                        Añadir Vehiculo
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 1 }} component={'div'}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField id="patenteV" name="patenteV" label="Patente" type={'text'} required onChange={(e) => handle(e)} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="modeloV" name="modeloV" label="Modelo" type={'text'} required onChange={(e) => handle(e)} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="colorV" name="colorV" label="Color" type={'text'} required onChange={(e) => handle(e)} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="estadoV" name="estadoV" label="Estado" type={'text'} required onChange={(e) => handle(e)} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="estadoRevisionTecnicaV" name="estadoRevisionTecnicaV" label="Estado Revision Tecnica" required type={'text'} onChange={(e) => handle(e)} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="montoAseguradora" name="montoAseguradora" label="Monto Aseguradora" type={'number'} required InputProps={{ inputProps: { min: 0 } }} onChange={(e) => handle(e)} />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    id="aseguradora"
                                    options={aseguradoras || []}
                                    value={aseguradoraSeleccionada}
                                    getOptionLabel={(option) => option.nombreAseguradora}
                                    onChange={(event, value) => {
                                        if (value) {
                                            setData({
                                                ...data,
                                                cAseguradora: value.cAseguradora
                                            })
                                            setAseguradoraSeleccionada(value)
                                        } else {
                                            setAseguradoraSeleccionada()
                                            setData({
                                                ...data,
                                                cAseguradora: ''
                                            })

                                        }
                                    }
                                    }
                                    renderInput={(params) => <TextField {...params} label="Aseguradora" variant="outlined" fullWidth required />}
                                    isOptionEqualToValue={(option, value) => option.cAseguradora === value.cAseguradora}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    id="TipoCarroceria"
                                    options={tipoCarrocerias || []}
                                    value={tipoCarroceriaSeleccionada}
                                    getOptionLabel={(option) => option.tipoCarroceria}
                                    onChange={(event, value) => {
                                        if (value) {
                                            setData({
                                                ...data,
                                                cTipoCarroceria: value.cTipoCarroceria
                                            })
                                            setTipoCarroceriaSeleccionada(value)
                                        } else {
                                            setTipoCarroceriaSeleccionada()
                                            setData({
                                                ...data,
                                                cTipoCarroceria: ''
                                            })

                                        }
                                    }
                                    }
                                    renderInput={(params) => <TextField {...params} label="Tipo Carroceria" variant="outlined" fullWidth required />}
                                    isOptionEqualToValue={(option, value) => option.cTipoCarroceria === value.cTipoCarroceria}
                                />
                            </Grid>
                            <Grid item xs={6} fullWidth align='center'>
                                <Autocomplete
                                    id="Cliente"
                                    options={clientes || []}
                                    value={clienteSeleccionado}
                                    getOptionLabel={(option) => option.nombreC}
                                    onChange={(event, value) => {
                                        if (value) {
                                            setData({
                                                ...data,
                                                cCliente: value.cCliente
                                            })
                                            setClienteSeleccionado(value)
                                        } else {
                                            setClienteSeleccionado()
                                            setData({
                                                ...data,
                                                cCliente: ''
                                            })

                                        }
                                    }
                                    }
                                    renderInput={(params) => <TextField {...params} label="Cliente" variant="outlined" fullWidth required />}
                                    isOptionEqualToValue={(option, value) => option.cCliente === value.cCliente}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} style={{ height: '100px', Textalign: 'center' }}>
                                <DialogActions>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        name={'Aceptar'}
                                        type={'submit'}
                                    >
                                        Aceptar
                                    </Button>
                                    <Button
                                        onClick={cerrarModal}
                                        variant="contained"
                                        color="error"
                                        name={'Cancelar'}
                                    >
                                        Cancelar
                                    </Button>
                                </DialogActions>
                            </Grid>
                        </Grid>
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}

export default AgregarVehiculo