import React, { useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { DialogTitle } from '@mui/material';

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

const EliminarInsumo = ({ row, obtenerInsumos }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [data, setData] = React.useState({
        cInsumo: row.cInsumo,
    });

    const [res, setRes] = React.useState({
        msg: '',
    });
    const submit = (e) => {
        e.preventDefault();
        axios.delete(import.meta.env.VITE_APP_BACKEND_URL + 'insumo.php', {
            data: {
                cInsumo: data.cInsumo,
            }
        }
        ).then(respuesta => {
            obtenerInsumos();
            handleClose();
            setRes(respuesta.data);
            if (respuesta.data.msg === 'ok') {
                swal("ELIMINADO", "Insumo eliminado correctamente", "success");
            } else {
                swal("ERROR", "Error al eliminar el insumo", "error");
            }
        })
    }
    useEffect(() => {
        obtenerInsumos();
    }, [])
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
                <DialogTitle> Eliminar Insumo </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Está seguro que desea eliminar el insumo?
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

export default EliminarInsumo