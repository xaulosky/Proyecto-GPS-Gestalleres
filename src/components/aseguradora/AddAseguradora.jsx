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

const AddAseguradora = ({ row, obtenerAseguradora }) => {

    const { auth } = useContext(AuthContext)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [data, setData] = useState({
        nombreAseguradora: '',
        tipoSeguro: '',
    });

    const submit = (e) => {

        e.preventDefault();
        axios.post(import.meta.env.VITE_APP_BACKEND_URL + 'aseguradora.php', {
            nombreAseguradora: data.nombreAseguradora,
            tipoSeguro: data.tipoSeguro,


        }).then(respuesta => {
            obtenerAseguradora()
            console.log(respuesta.data);
            handleClose();
            if (respuesta.data.msg === 'Faltan datos') {

                swal("CREADO!", "Aseguradora añadida correctamente", "success");
            } else {
                swal("ERROR", "Error al añadir aseguradora", "error");
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

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'aseguradora.php')
            .then(respuesta => {
                setAseguradoras(respuesta.data);
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
                Añadir Aseguradora
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box component='form' sx={style} onSubmit={submit} >
                    <Typography id="modal-modal-title" variant="h6" component={'div'} align='center'>
                        Añadir Aseguradora
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 1 }} component={'div'}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField id="nombreAseguradora" name="nombreAseguradora" label="Aseguradora" type={'text'} required onChange={(e) => handle(e)} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="tipoSeguro" name="tipoSeguro" label="TipoSeguro" type={'text'} required onChange={(e) => handle(e)} />
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

export default AddAseguradora