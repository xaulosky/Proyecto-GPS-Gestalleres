import React from 'react'
import { Button, Grid, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    backgroundColor: '#FFFFFF',
    pt: 2,
    px: 4,
    pb: 3,
};

const EliminarVehiculo = ({row, obtenerVehiculos}) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [data, setData] = useState({
        cVehiculo: row.cVehiculo
    });

    const submit = (e) => {
        axios.delete(import.meta.env.VITE_APP_BACKEND_URL + 'vehiculo.php?cVehiculo=' + data.cVehiculo
        ).then(respuesta => {   
            obtenerVehiculos();
            handleClose(e);
        }).then(() => {
            swal(
                'Vehiculo eliminado', {
                icon: 'success',
                buttons: false,
            });
            setTimeout(() => {
                swal.close()
            }, 2000);
        })
    }

    const abrirModal = () => {
        obtenerVehiculos();
        setData({
            patenteV: row.patenteV,
            modeloV: row.modeloV,
            colorV: row.colorV,
            estadoV: row.estadoV,
            estadoRevisionTecnicaV: row.estadoRevisionTecnicaV,
            montoAseguradora: row.montoAseguradora,
            tipoAseguradora: row.tipoAseguradora,
            cVehiculo: row.cVehiculo,
        });
        handleOpen();
    }

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
            <Button onClick={abrirModal}
                color="error"
                type={'submit'}
                name={'eliminar'}
                title={'Eliminar'}
                endIcon={<DeleteIcon />}
            >
            </Button>
            <Dialog
                open={open}
                onClose={cerrarModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle> Eliminar Vehiculo </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Está seguro que desea eliminar el vehiculo?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={submit}
                        variant="contained"
                        color="primary"
                        name={'eliminar'}

                    >
                        Aceptar
                    </Button>
                    <Button
                        onClick={cerrarModal}
                        variant="contained"
                        color="error"
                        name={'cancelar'}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
  )
}

export default EliminarVehiculo