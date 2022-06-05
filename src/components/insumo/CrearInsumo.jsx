import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material'
import React from 'react'
import InventoryIcon from '@mui/icons-material/Inventory';
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

const CrearInsumo = ({obtenerInsumos}) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [data, setData] = React.useState({
        nombreInsumo: '',
        cantidad: '',
        costo: ''
    });

    const submit = (e) => {
        axios.post(import.meta.env.VITE_APP_BACKEND_URL + 'insumo.php',{
            nombreInsumo: data.nombreInsumo,
            cantidad: data.cantidad,
            costo: data.costo
        })
            .then(respuesta => {
                obtenerInsumos()
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
        <div>

            <Button onClick={handleOpen}
                variant="contained"
                color="primary"
                type={'submit'}
                name={'crear'}
                endIcon={<InventoryIcon />}
            >
                Añadir Insumo
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
                        AGREGAR INSUMO
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextField fullWidth
                            id="standard-basic"
                            label="Nombre insumo"
                            margin="normal"
                            variant="outlined"
                            type={'text'}
                            name={'nombreInsumo'}
                            onChange={(e) => handle(e)}
                        />
                        <TextField fullWidth
                            id="standard-basic"
                            label="Cantidad"
                            margin="normal"
                            variant="outlined"
                            type={'text'}
                            name={'cantidad'}
                            onChange={(e) => handle(e)}
                        />
                        <TextField fullWidth
                            id="standard-basic"
                            label="Valor"
                            margin="normal"
                            variant="outlined"
                            type={'text'}
                            name={'costo'}
                            onChange={(e) => handle(e)}
                        />
                        <Grid item xs={12} sm={12} style={{ height: '100px' }}>
                            <Button
                                onClick={submit}
                                variant="contained"
                                color="primary"
                                name={'crear'}

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
        </div>
    );
}

export default CrearInsumo