import React, { useContext, useEffect, resetState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, DialogActions, Grid, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import swal from 'sweetalert';

const style = {

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 350,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};


const EditarInsumo = ({ row, obtenerInsumos }) => {

    const { auth } = useContext(AuthContext)
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [data, setData] = React.useState({
        nombreInsumo: row.nombreInsumo,
        cantidad: row.cantidad,
        costo: row.costo,
        cInsumo: row.cInsumo,
        cTaller: auth.cTaller,
    });

    const [res, setRes] = React.useState({
        msg: '',
    });

    const submit = (e) => {
        e.preventDefault();
        axios.put(import.meta.env.VITE_APP_BACKEND_URL + 'insumo.php', {
            nombreInsumo: data.nombreInsumo,
            cantidad: data.cantidad,
            costo: data.costo,
            cInsumo: data.cInsumo,
            cTaller: auth.cTaller,
        })
            .then(respuesta => {
                obtenerInsumos();
                handleClose();
                setRes(respuesta.data);
                if (respuesta.data.msg === 'ok') {
                    swal({
                        title: "ACTUALIZADO",
                        text: "Insumo actualizado correctamente",
                        icon: "success",
                        button: "OK",
                    });
                } else {
                    swal({
                        title: "ERROR",
                        text: "Error al editar insumo",
                        icon: "error",
                        button: "Cerrar",
                    });
                }
            })
    }

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.name] = e.target.value;
        setData(newdata);
    }

    function abrir() {
        obtenerInsumos();
        setData({
            nombreInsumo: row.nombreInsumo,
            cantidad: row.cantidad,
            costo: row.costo,
            cInsumo: row.cInsumo,
            cTaller: auth.cTaller,
        });
        handleOpen();
    }

    function cerrar() {
        obtenerInsumos();
        setData({
            nombreInsumo: row.nombreInsumo,
            cantidad: row.cantidad,
            costo: row.costo,
            cInsumo: row.cInsumo,
            cTaller: auth.cTaller,
        });
        handleClose();
    }

    return (
        <>
            <Button onClick={abrir}
                color="primary"
                type={'submit'}
                name={'editar'}
                title={'Editar'}
                endIcon={<EditIcon />}
            >
            </Button>
            <Modal
                open={open}
                onClose={cerrar}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component='form' sx={style} onSubmit={submit}>
                    <Typography id="modal-modal-title" variant="h6" component={'div'} align='center'>
                        EDITAR INSUMO
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
                            value={data.nombreInsumo}
                            required
                            onChange={(e) => handle(e)}

                        />
                        <TextField fullWidth
                            id="standard-basic"
                            label="Cantidad"
                            margin="normal"
                            variant="outlined"
                            type={'number'}
                            name={'cantidad'}
                            Shrink ={true}
                            value={data.cantidad}
                            inputProps={{ pattern: '[0-9]*', min: 0 , max: 999999999 }}
                            title= 'Solo números entre 0 y 999999999'
                            InputLabelProps={{ shrink: true }}
                            required
                            onChange={(e) => handle(e)}
                        />
                        <TextField fullWidth
                            id="standard-basic"
                            label="Precio"
                            margin="normal"
                            variant="outlined"
                            type={'number'}
                            name={'costo'}
                            inputProps={{ pattern: '[0-9]*', min: 0, max: 999999999 }}
                            InputLabelProps={{ shrink: true }}
                            value={data.costo}
                            required
                            onChange={(e) => handle(e)}
                        />
                        <Grid item xs={12} sm={12} style={{ height: '100px' }}>
                            <DialogActions>
                                <Button
                                    sx={{ ml: 10, p: '5px 20px' , mt: '20px'}}
                                    variant="contained"
                                    color="primary"
                                    name={'crear'}
                                    type={'submit'}
                                >
                                    Aceptar
                                </Button>
                                <Button
                                    sx={{ ml: 10, p: '5px 20px' , mt: '20px'}}
                                    onClick={cerrar}
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
    )
}

export default EditarInsumo