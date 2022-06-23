import { Box, Button, DialogActions, Grid, Modal, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import InventoryIcon from '@mui/icons-material/Inventory';
import axios from 'axios';
import AuthContext from '../../context/AuthContext'
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
    p: 4,
};

const CrearInsumo = ({ obtenerInsumos }) => {

    const { auth } = useContext(AuthContext)
    const validaNombre = '[0-9a-zA-Zá-úÁ-Ú- ]*';
    const validaCantidad = '[0-9]*';
    const contador = 0;

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [data, setData] = React.useState({
        nombreInsumo: '',
        cantidad: '',
        costo: '',
    });

    const [res, setRes] = React.useState({
        msg: '',
    });

    const [error, setError] = React.useState({
        msg1: '',
        msg2: '',
        msg3: '',
        msg4: '',
        msg5: '',
        msg6: '',
        msg7: '',
        msg8: '',
        msg9: '',
        msg10: '',
        msg11: '',
        msg12: '',
        msg13: '',
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
                setRes(respuesta.data);
                if (respuesta.data.msg === 'ok') {
                    swal("CREADO", "Insumo creado correctamente", "success");
                } else {
                    swal("ERROR", "Error al crear el insumo", "error");
                }
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
                sx={{ ml: 3, p: '10px 15px' }}
                title="Agregar Insumo"
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

                    <Typography id="modal-modal-title" variant="h6" component={'div'} align='center'>
                        AGREGAR INSUMO
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'div'}>
                        <TextField fullWidth
                            id="standard-basic"
                            label="Nombre del insumo"
                            margin="normal"
                            variant="outlined"
                            type={'text'}
                            name={'nombreInsumo'}
                            inputProps={{ maxLength: 256, pattern: '[0-9a-zA-Zá-úÁ-Ú- ]*' }}
                            InputLabelProps={{ shrink: true }}

                            onChange={(e) => handle(e)}
                        />
                        <TextField fullWidth
                            id="standard-basic"
                            label="Cantidad"
                            margin="normal"
                            variant="outlined"
                            type={'number'}
                            name={'cantidad'}
                            inputProps={{ pattern: '[0-9]*', min: 0, max: 999999999 }}
                            InputLabelProps={{ shrink: true }}
                            required={true}
                            onChange={(e) => handle(e)}
                        />
                        <TextField fullWidth
                            id="standard-basic"
                            label="Precio"
                            margin="normal"
                            variant="outlined"
                            type={'number'}
                            name={'costo'}
                            required={true}
                            inputProps={{ pattern: '[0-9]*', min: 0, max: 999999999 }}

                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => handle(e)}
                        />
                        <Grid item xs={12} sm={12} style={{ height: '70px' }}>
                            <DialogActions >
                                <Button
                                    sx={{ ml: 10, p: '5px 20px', mt: '20px' }}
                                    variant="contained"
                                    color="primary"
                                    name={'crear'}
                                    type={'submit'}
                                >
                                    Aceptar
                                </Button>
                                <Button
                                    onClick={handleClose}
                                    sx={{ ml: 10, p: '5px 20px', mt: '20px' }}
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
