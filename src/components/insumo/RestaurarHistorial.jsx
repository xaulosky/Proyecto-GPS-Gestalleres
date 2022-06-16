import { Button, Dialog, DialogActions, DialogContentText, DialogTitle, DialogContent } from '@mui/material'
import React from 'react'
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import axios from 'axios';

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

const RestaurarHistorial = ({ row, obtenerInsumos }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [data, setData] = React.useState({
        nombreInsumo: row.nombreInsumo,
        cantidad: row.cantidad,
        costo: row.costo,
        cInsumo: row.cInsumo,
    });
    const submit = (e) => {
        e.preventDefault();
        axios.put(import.meta.env.VITE_APP_BACKEND_URL + 'insumoHistorial.php', {
            data: {

                nombreInsumo: row.nombreInsumo,
                cantidad: row.cantidad,
                costo: row.costo,
                cInsumo: row.cInsumo
            }
        })
            .then(respuesta => {
                obtenerInsumos();
                handleClose();
            })
    }

    return (
        <><Button onClick={handleOpen}
            color="primary"
            type={'submit'}
            name={'restaurar'}
            title={'Restaurar'}
        >
            <SettingsBackupRestoreIcon />
        </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle  > Restaurar Insumo </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Está seguro que desea restaurar los datos del insumo?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={submit}
                        variant="contained"
                        color="primary"
                        name={'restaurar'}
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

export default RestaurarHistorial