import { Box, Button, DialogActions, Grid, Modal, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import InventoryIcon from '@mui/icons-material/Inventory';
import axios from 'axios';
import AuthContext from '../../context/AuthContext'

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

const CrearInsumo = ({ obtenerInsumos }) => {

    const { auth } = useContext(AuthContext)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [data, setData] = React.useState({
        nombreInsumo: '',
        cantidad: '',
        costo: '',
    });

    const submit = (e) => {
        e.preventDefault();
        axios.post(import.meta.env.VITE_APP_BACKEND_URL + 'insumo.php', {
            nombreInsumo: data.nombreInsumo,
            cantidad: data.cantidad,
            costo: data.costo,
            cTaller: auth.cTaller,
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
        <>
            <Button onClick={handleOpen}
                variant="contained"
                color="primary"
                type={'submit'}
                name={'crear'}
                endIcon={<InventoryIcon />}
            >
                Agregar Insumo
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component='form' sx={style} onSubmit={submit} >

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
                            type={'number'}
                            name={'cantidad'}
                            required
                            onChange={(e) => handle(e)}
                        />
                        <TextField fullWidth
                            id="standard-basic"
                            label="Valor"
                            margin="normal"
                            variant="outlined"
                            type={'number'}
                            name={'costo'}
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

export default CrearInsumo
