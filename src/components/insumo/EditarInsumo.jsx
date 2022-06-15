import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
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
    p: 4,
};

const EditarInsumo = ({ row, obtenerInsumos }) => {

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
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'insumoEliminado.php', {
            nombreInsumo: data.nombreInsumo,
            cantidad: data.cantidad,
            costo: data.costo,
            cInsumo: data.cInsumo,
        })
            .then(respuesta => {
                obtenerInsumos();
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
                color="primary"
                type={'submit'}
                name={'editar'}
                title = {'Editar'}
                endIcon={<EditIcon />}
            >
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
                        EDITAR INSUMO
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextField fullWidth
                            id="standard-basic"
                            label="Nombre insumo"
                            margin="normal"
                            variant="outlined"
                            type={'text'}
                            name={'nombreInsumo'}
                            value={data.nombreInsumo}
                            onChange={(e) => handle(e)}
                        />
                        <TextField fullWidth
                            id="standard-basic"
                            label="Cantidad"
                            margin="normal"
                            variant="outlined"
                            type={'text'}
                            name={'cantidad'}
                            value={data.cantidad}
                            onChange={(e) => handle(e)}
                        />
                        <TextField fullWidth
                            id="standard-basic"
                            label="Valor"
                            margin="normal"
                            variant="outlined"
                            type={'text'}
                            name={'costo'}
                            value={data.costo}
                            onChange={(e) => handle(e)}
                        />
                        <Grid item xs={12} sm={12} style={{ height: '100px' }}>
                            <Button
                                onClick={submit}
                                variant="contained"
                                color="primary"
                                name={'editar'}

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
                        </Grid>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default EditarInsumo