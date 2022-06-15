import { Button, Grid, Modal, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { Box } from '@mui/system';

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

const EliminarInsumo = ({row,obtenerInsumos}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [data, setData] = React.useState({
        cInsumo: row.cInsumo,
    });

    const submit = (e) => {
        axios.delete(import.meta.env.VITE_APP_BACKEND_URL + 'insumo.php', {
            data: {
                cInsumo: data.cInsumo,
            }
        }
        ).then(respuesta => {
            obtenerInsumos();
            handleClose();
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
            <Modal variant="contained"
                open={open}
                onClose={handleOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
                        ¿Desea Eliminar el insumo seleccionado?
                    </Typography>
                    <Grid item xs={12} sm={12} style={{ height: '100px' }}>
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
                    </Grid >
                </Box>
            </Modal>
        </>
    )
}

export default EliminarInsumo