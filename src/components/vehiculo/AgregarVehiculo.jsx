import React from 'react'
import { Box, Button, DialogActions, Grid, Modal, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import CarRepairIcon from '@mui/icons-material/CarRepair';

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


const AgregarVehiculo = ({obtenerVehiculos}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [data, setData] = React.useState({
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
        })
            .then(respuesta => {
                obtenerVehiculos()
                handleClose();
            })
        
    }

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.name] = e.target.value;
        setData(newdata);
        console.log(newdata);
    }


return (
    <>
        <Button onClick={handleOpen}
                variant="contained"
                color="primary"
                type={'submit'}
                name={'crear'}
                endIcon={<CarRepairIcon/>}
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
            <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'div'}>
            <TextField fullWidth
                id="standard-basic"
                margin="normal"
                variant="outlined"
                type={'text'}
                name={'patenteV'}
                label="Patente"
                required
                onChange={(e) => handle(e)}
            />
            <TextField fullWidth
                id="standard-basic"
                margin="normal"
                variant="outlined"
                type={'text'}
                name={'modeloV'}
                label="Modelo"
                required
                onChange={(e) => handle(e)}
            />
            <TextField fullWidth
                id="standard-basic"
                margin="normal"
                variant="outlined"
                type={'text'}
                name={'colorV'}
                label="Color"
                required
                onChange={(e) => handle(e)}
            />
            <TextField fullWidth
                id="standard-basic"
                margin="normal"
                variant="outlined"
                type={'text'}
                name={'estadoV'}
                label="Estado"
                required
                onChange={(e) => handle(e)}
            />
            <TextField fullWidth
                id="standard-basic"
                margin="normal"
                variant="outlined"
                type={'text'}
                name={'estadoRevisionTecnicaV'}
                label="Estado Revision Tecnica"
                required
                onChange={(e) => handle(e)}
            />
            <TextField fullWidth
                id="standard-basic"
                margin="normal"
                variant="outlined"
                type={'number'}
                name={'montoAseguradora'}
                label="Monto Aseguradora"
                required
                onChange={(e) => handle(e)}
            />
            <TextField fullWidth
                id="standard-basic"
                margin="normal"
                variant="outlined"
                type={'number'}
                name={'cAseguradora'}
                label="C Aseguradora"
                required
                onChange={(e) => handle(e)}
            />
            <TextField fullWidth
                id="standard-basic"
                margin="normal"
                variant="outlined"
                type={'number'}
                name={'cTipoCarroceria'}
                label="C Tipo Carroceria"
                required
                onChange={(e) => handle(e)}
            />
            <TextField fullWidth
                id="standard-basic"
                margin="normal"
                variant="outlined"
                type={'number'}
                name={'cCliente'}
                label="C Cliente"
                required
                onChange={(e) => handle(e)}
            />
            <Grid item xs={12} sm={12} style={{ height: '100px' }}>
                <DialogActions >
                    <Button
                        variant="contained"
                        color="primary"
                        name={'crear'}
                        type={'submit'}
                    >
                    Aceptar
                    </Button>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        color="error"
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
    );
}

export default AgregarVehiculo