import * as React from 'react'
import { Box, Button, DialogActions, Grid, Modal, TextField, Typography, MenuItem, Input, InputLabel, Select, Menu, FormControl, Stack, Autocomplete } from '@mui/material'
import axios from 'axios';
import { useState } from 'react';
import { useEffect, useContext } from 'react';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import { useClientes } from '../../hooks/useClientes';
import swal from 'sweetalert';
import AuthContext from '../../context/AuthContext';


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

const opciones = [
    {
        value: 1,
        label: 'En revisión',
    },
    {
        value: 2,
        label: 'En reparación',
    },
    {
        value: 3,
        label: 'Pintura'
    },
    {
        value: 4,
        label: 'Reparado',
    },
    {
        value: 5,
        label: 'Entregado',
    },
    {
        value: 6,
        label: 'Cancelado',
    },
    {
        value: 7,
        label: 'En espera',
    },
];

const opciones1 = [
    {
        value: 1,
        label: 'Activo',
    },
    {
        value: 2,
        label: 'Finalizado',
    }
];

const AgregarVehiculo = ({ row, obtenerVehiculos }) => {

    const { auth } = useContext(AuthContext)

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
        cTaller: '',
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
            cCliente: data.cCliente,
            cAseguradora: data.cAseguradora,
            cTipoCarroceria: data.cTipoCarroceria,
            cTaller: auth.cTaller,


        }).then(respuesta => {
            obtenerVehiculos()
            console.log(respuesta.data);
            handleClose();
            if (respuesta.data.msg === 'Agregado correctamente') {

                swal("CREADO!", "Vehiculo creado correctamente", "success");
            } else {
                swal("ERROR", "Error al crear el vehiculo", "error");
                console.log(respuesta.data.msg);
            }
            setTimeout(() => {
                swal.close()
            }, 3000);
        })

    };

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.name] = e.target.value;
        setData(newdata);
        console.log(newdata);
    };


    const [aseguradoras, setAseguradoras] = useState();
    const [aseguradoraSeleccionada, setAseguradoraSeleccionada] = useState();

    const [tipoCarrocerias, setTipoCarrocerias] = useState();
    const [tipoCarroceriaSeleccionada, setTipoCarroceriaSeleccionada] = useState();

    const [clientes, setClientes] = useState();
    const [clienteSeleccionado, setClienteSeleccionado] = useState();


    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'aseguradora.php')
            .then(respuesta => {
                setAseguradoras(respuesta.data);
        })
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'TipoCarroceria.php')
            .then(respuesta => {
                setTipoCarrocerias(respuesta.data);
        })
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'vehiculo_cliente.php?cTaller=' + auth.cTaller)
            .then(respuesta => {
                setClientes(respuesta.data);
        })
    }, []);

    const deshabilitarBoton = () => {

        if (auth.cRolU != 3) {
            return false;
        } else {
            return true;
        }
    }

    return (
        <>
            <Button onClick={handleOpen}
                variant="contained"
                color="primary"
                type={'submit'}
                name={'crear'}
                disabled={deshabilitarBoton()}
                endIcon={<CarRepairIcon />}
            >
                Añadir Vehiculo
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
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
                                <Autocomplete
                                    id="estadoV"
                                    options={opciones}
                                    getOptionLabel={(option) => option.label}

                                    onChange={(e, value) => {
                                        setData({ ...data, estadoV: value.label })
                                    }
                                    }
                                    renderInput={(params) => <TextField {...params} label="Estado Vehiculo" required />}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {/*Autocomplete de estado de revision tecnica*/}
                                <Autocomplete
                                    id="estadoRevisionTecnicaV"
                                    options={opciones1}
                                    getOptionLabel={(option) => option.label}

                                    onChange={(e, value) => {
                                        setData({ ...data, estadoRevisionTecnicaV: value.label })
                                    }
                                    }
                                    renderInput={(params) => <TextField {...params} label="Estado revision tecnica" required />}
                                />

                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="montoAseguradora" name="montoAseguradora" label="Monto Aseguradora" type={'number'} required InputProps={{ inputProps: { min: 0 } }} onChange={(e) => handle(e)} />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    id="aseguradora"
                                    options={aseguradoras}
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
                                    options={tipoCarrocerias}
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
                                    options={clientes}
                                    value={clienteSeleccionado}
                                    getOptionLabel={(option) => option.nombreC}
                                    onChange={(event, value) => {
                                        if (value) {
                                            setData({
                                                ...data,
                                                cCliente: value.cCliente,

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
                                    isOptionEqualToValue={(option, value) => option.cCliente === value.cCliente}
                                    renderInput={(params) => (<TextField {...params} label="Cliente" variant="outlined" fullWidth required />)}
                                />
                            </Grid>
                            <Grid item xs={12} fullWidth>
                                <DialogActions>
                                    <Button
                                        xs={6}
                                        align='center'
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        name={'Aceptar'}
                                        type={'submit'}
                                    >
                                        Aceptar
                                    </Button>
                                    <Button
                                        xs={6}
                                        align='center'
                                        fullWidth
                                        onClick={handleClose}
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