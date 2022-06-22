import React from 'react'
import { useEffect, useState } from 'react'
import { Box, Button, DialogActions, Grid, Modal, TextField, Typography } from '@mui/material';
import DataTable from 'react-data-table-component';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';


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

const EditarVehiculo = ({row, obtenerVehiculos}) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    

    const [data, setData] = React.useState({
        patenteV: row.patenteV,
        modeloV: row.modeloV,
        colorV: row.colorV,
        estadoV: row.estadoV,
        estadoRevisionTecnicaV: row.estadoRevisionTecnicaV,
        montoAseguradora: row.montoAseguradora,
        tipoAseguradora: row.tipoAseguradora,
        cVehiculo: row.cVehiculo,
    });

    const submit = (e) => {
        e.preventDefault(e);
        axios.put(import.meta.env.VITE_APP_BACKEND_URL + 'vehiculo.php', {
            
            patenteV: data.patenteV,
            modeloV: data.modeloV,
            colorV: data.colorV,
            estadoV: data.estadoV,
            estadoRevisionTecnicaV: data.estadoRevisionTecnicaV,
            montoAseguradora: data.montoAseguradora,
            cVehiculo: data.cVehiculo,
        })
            .then(respuesta => {
                obtenerVehiculos();
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
                type={'submit'}
                name={'editar'}
                color="primary"
                endIcon={<EditIcon/>} 
                >
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component='form' sx={style} onSubmit={submit} >
                <Typography id="modal-modal-title" variant="h6" component={'div'} align='center'>
                        Editar Vehiculo
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 1 }} component={'div'}>
                        <TextField fullWidth
                            name={'patenteV'}
                            label="Patente"
                            margin="normal"
                            variant="outlined"
                            type={'text'}
                            value={data.patenteV}
                            required
                            onChange={(e) => handle(e)}
                        />
                        <TextField fullWidth
                            name={'modeloV'}
                            label="Modelo"
                            margin="normal"
                            variant="outlined"
                            type={'text'}
                            value={data.modeloV}
                            required
                            onChange={(e) => handle(e)}
                        />
                        <TextField fullWidth
                            name={'colorV'}
                            label="Color"
                            margin="normal"
                            variant="outlined"
                            type={'text'}
                            value={data.colorV}
                            required
                            onChange={(e) => handle(e)}
                        />
                        <TextField fullWidth
                            name={'estadoV'}
                            label="Estado"
                            margin="normal"
                            variant="outlined"
                            type={'text'}
                            value={data.estadoV}
                            required
                            onChange={(e) => handle(e)}
                        />
                        <TextField fullWidth
                            name={'estadoRevisionTecnicaV'}
                            label="Estado Revision Tecnica"
                            margin="normal"
                            variant="outlined"
                            type={'text'}
                            value={data.estadoRevisionTecnicaV}
                            required
                            onChange={(e) => handle(e)}
                        />
                        <TextField fullWidth
                            name={'montoAseguradora'}
                            label="Monto Aseguradora"
                            margin="normal"
                            variant="outlined"
                            type={'number'}
                            value={data.montoAseguradora}
                            required
                            onChange={(e) => handle(e)}
                        />
                        <Grid item xs={12} sm={12} style={{ height: '100px' ,Textalign: 'center'}}>
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
                                    onClick={handleClose}
                                    variant="contained"
                                    color="error"
                                    name={'Cancelar'}
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
export default EditarVehiculo