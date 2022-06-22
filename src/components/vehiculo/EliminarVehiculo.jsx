import React from 'react'
import { Button, Grid, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

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

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [data, setData] = React.useState({
        cVehiculo: row.cVehiculo
    });

    const submit = (e) => {
        axios.delete(import.meta.env.VITE_APP_BACKEND_URL + 'vehiculo.php?cVehiculo=' + data.cVehiculo
        ).then(respuesta => {   
            obtenerVehiculos();
            handleClose(e);
        })
    }

  return (
    <>
            <Button onClick={handleOpen}
                color="error"
                type={'submit'}
                name={'eliminar'}
                title={'Eliminar'}
                endIcon={<DeleteIcon />}
            >
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
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
                        onClick={handleClose}
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