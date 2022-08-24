import React, { useContext, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, DialogActions, Grid, Modal, TextField, Typography, Autocomplete, InputAdornment } from '@mui/material';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const opciones = [
    {
        value: 1,
        label: 'Activo',
    },
    {
        value: 2,
        label: 'Inactivo',
    },
    {
        value: 3,
        label: 'Finalizado'
    },
];

const style = {

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 800,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};


const EditarTrabajos = ({ row, obtenerTrabajos }) => {

    const { auth } = useContext(AuthContext)
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [data, setData] = useState({
        cTrabajo: row.cTrabajo,
        nombreTrabajo: row.nombreTrabajo,
        descripcionTrabajo: row.descripcionTrabajo,
        fechaEstimadaT: row.fechaEstimadaT,
        fechaRealT: row.fechaRealT,
        estadoT: row.estadoT,
        costoT: row.costoT,
        horasT: row.horasT,
        cOrdenTrabajo: row.cOrdenTrabajo,
        cTipoT: row.cTipoT,
        cEmpleado: row.cEmpleado

    });

    
    const submit = (e) => {
        e.preventDefault();

        console.log("FFFFFFFFFFFF")
        console.log(data.cTrabajo)
        axios.put(import.meta.env.VITE_APP_BACKEND_URL + 'trabajo.php', {
            cTrabajo : data.cTrabajo,
            nombreTrabajo: data.nombreTrabajo,
            descripcionTrabajo: data.descripcionTrabajo,
            fechaEstimadaT: data.fechaEstimadaT,
            fechaRealT: data.fechaRealT,
            estadoT: data.estadoT,
            costoT: data.costoT,
            horasT: data.horasT,
            cOrdenTrabajo: data.cOrdenTrabajo,
            cTipoT: data.cTipoT,
            cEmpleado: data.cEmpleado
        })
            .then(respuesta => {
                cerrar()
                console.log(respuesta.data)
                if (respuesta.data.msg === 'Actualizado Correctamente') {

                    swal("EXITO!", "Cambios efectuados correctamente", "success");
                } else {
                    swal("ERROR", "Error al editar el trabajo", "error");
                    console.log(respuesta.data.msg);
                }
                setTimeout(() => {
                    swal.close()
                }, 3000);
            })
    }

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.name] = e.target.value;
        setData(newdata);
    }

    function abrir() {
        obtenerTrabajos();
        setData({
            cTrabajo: row.cTrabajo,
            nombreTrabajo: row.nombreTrabajo,
            descripcionTrabajo: row.descripcionTrabajo,
            fechaEstimadaT: row.fechaEstimadaT,
            fechaRealT: row.fechaRealT,
            estadoT: row.estadoT,
            costoT: row.costoT,
            horasT: row.horasT,
            cOrdenTrabajo: row.cOrdenTrabajo,   
            cTipoT: row.cTipoT,
            cEmpleado: row.cEmpleado
        });
        handleOpen();
    }

    function cerrar() {
        obtenerTrabajos();
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
                        EDITAR TRABAJO
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'div'}>
                        <TextField
                            fullWidth
                            //autoFocus
                            margin="dense"
                            label="Nombre del Trabajo"
                            type="text"
                            id="standard-basic"
                            variant="outlined"
                            name={'nombreTrabajo'}
                            InputLabelProps={{ shrink: true }}
                            value={data.nombreTrabajo}
                            onChange={(e) => handle(e)}
                        />
                        <TextField
                            name="descripcionTrabajo"
                            fullWidth
                            autoFocus
                            id="standard-basic"
                            margin="dense"
                            type="Multiline"
                            multiline
                            rows={4}
                            label="Descripción"
                            variant="outlined"
                            value={data.descripcionTrabajo}
                            onChange={(e) => handle(e)}
                        />
                        <TextField
                            fullWidth
                            autoFocus
                            name="fechaEstimadaT"
                            id="fechaEstimadaT"
                            type="date"
                            defaultValue="2022-05-31"
                            value={data.fechaEstimadaT}
                            onChange={(e) => handle(e)}
                        />
                        <TextField
                            fullWidth
                            autoFocus
                            name="fechaRealT"
                            id="fechaRealT"
                            margin="dense"
                            type="date"
                            defaultValue="2022-05-31"
                            value={data.fechaRealT}
                            onChange={(e) => handle(e)}
                        />
                        <Autocomplete
                            id="estadoT"
                            name="estadoT"
                            options={opciones}
                            getOptionLabel={(option) => option.label}

                            onChange={(e, value) => {
                                setData({ ...data, estadoT: value.label })
                            }}
                            renderInput={(params) => <TextField {...params} label="Estado"
                            />}

                        />
                        <TextField
                            fullWidth
                            autoFocus
                            name="costoT"
                            id="costoT"
                            margin="dense"
                            type="number"
                            label="Costo"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                            }}
                            value={data.costoT}
                            onChange={(e) => handle(e)}
                        />

                        <TextField
                            fullWidth
                            autoFocus
                            name="horasT"
                            id="horasT"
                            margin="dense"
                            type="number"
                            label="Horas"
                            defaultValue="0"
                            value={data.horasT}
                            onChange={(e) => handle(e)}
                        />
                        <TextField
                            fullWidth
                            autoFocus
                            id="cOrdenTrabajo"
                            name="cOrdenTrabajo"
                            margin="dense"
                            type="number"
                            label="Orden de Trabajo"
                            defaultValue="0"
                            value={data.cOrdenTrabajo}
                            onChange={(e) => handle(e)}
                        />
                        <TextField
                            fullWidth
                            autoFocus
                            name="cTipoT"
                            id="cTipoT"
                            margin="dense"
                            type="number"
                            label="Tipo de Trabajo"
                            defaultValue="0"
                            value={data.cTipoT}
                            onChange={(e) => handle(e)}
                        />
                        <TextField
                            fullWidth
                            autoFocus
                            name="cEmpleado"
                            id="cEmpleado"
                            margin="dense"
                            type="number"
                            label="Empleado"
                            defaultValue="0"
                            value={data.cEmpleado}
                            onChange={(e) => handle(e)}
                        />
                        <Grid>
                            <Grid item xs={12} sm={12} style={{ height: '100px' }}>
                                <DialogActions>
                                    <Button
                                        sx={{ ml: 10, p: '5px 20px', mt: '20px' }}
                                        variant="contained"
                                        color="primary"
                                        name={'editar'}
                                        type={'submit'}
                                    >
                                        Aceptar
                                    </Button>
                                    <Button
                                        sx={{ ml: 10, p: '5px 20px', mt: '20px' }}
                                        onClick={cerrar}
                                        variant="contained"
                                        color="error"
                                        name={'cancelar'}
                                    >
                                        Cancelar
                                    </Button>
                                </DialogActions>
                            </Grid>
                        </Grid>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default EditarTrabajos