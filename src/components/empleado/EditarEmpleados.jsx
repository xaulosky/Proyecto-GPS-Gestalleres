import React, { useContext, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, DialogActions, Grid, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';



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


const EditarEmpleados = ({ row, obtenerEmpleados }) => {

    const { auth } = useContext(AuthContext)
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [data, setData] = useState({
        rutEmpleado: row.rutEmpleado,
        nombreEmpleado: row.nombreEmpleado,
        apellidoEmpleado: row.apellidoEmpleado,
        emailEmpleado: row.emailEmpleado,
        numeroTelefonoEmpleado: row.numeroTelefonoEmpleado,
        cRolE: row.cRolE,
        cTaller: row.cTaller,
    });
    console.log("FFFFFFFFFFFF")

    console.log(data.cEmpleado)
    const submit = (e) => {
        e.preventDefault();

        axios.put(import.meta.env.VITE_APP_BACKEND_URL + 'empleado.php', {
            rutEmpleado: data.rutEmpleado,
            nombreEmpleado: data.nombreEmpleado,
            apellidoEmpleado: data.apellidoEmpleado,
            emailEmpleado: data.emailEmpleado,
            numeroTelefonoEmpleado: data.numeroTelefonoEmpleado,
            cRolE: data.cRolE,
            cTaller: data.cTaller,
            cEmpleado: row.cEmpleado
        })
            .then(respuesta => {
                cerrar()
                console.log(respuesta.data)
                if (respuesta.data.msg === 'Actualizado Correctamente') {

                    swal("EXITO!", "Cambios efectuados correctamente", "success");
                } else {
                    swal("ERROR", "Error al editar el empleado", "error");
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
        obtenerEmpleados();
        setData({
            rutEmpleado: data.rutEmpleado,
            nombreEmpleado: data.nombreEmpleado,
            apellidoEmpleado: data.apellidoEmpleado,
            emailEmpleado: data.emailEmpleado,
            numeroTelefonoEmpleado: data.numeroTelefonoEmpleado,
            cRolE: data.cRolE,
            cTaller: data.cTaller
        });
        handleOpen();
    }

    function cerrar() {
        obtenerEmpleados();
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
                        EDITAR EMPLEADOS
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'div'}>
                        <TextField
                            fullWidth
                            //autoFocus
                            margin="dense"
                            label="Rut del Empleado"
                            type="text"
                            id="standard-basic"
                            variant="outlined"
                            name={'rutEmpleado'}
                            InputLabelProps={{ shrink: true }}
                            value={data.rutEmpleado}
                            onChange={(e) => handle(e)}
                        />
                        <TextField
                            fullWidth
                            //autoFocus
                            margin="dense"
                            label="Nombre del Empleado"
                            type="text"
                            id="standard-basic"
                            variant="outlined"
                            name={'nombreEmpleado'}
                            InputLabelProps={{ shrink: true }}
                            value={data.nombreEmpleado}
                            onChange={(e) => handle(e)}
                        />
                        <TextField
                            fullWidth
                            //autoFocus
                            margin="dense"
                            label="Apellido del Empleado"
                            type="text"
                            id="standard-basic"
                            variant="outlined"
                            name={'apellidoEmpleado'}
                            InputLabelProps={{ shrink: true }}
                            value={data.apellidoEmpleado}
                            onChange={(e) => handle(e)}
                        />
                        <TextField
                            fullWidth
                            //autoFocus
                            margin="dense"
                            label="Email del Empleado"
                            type="text"
                            id="standard-basic"
                            variant="outlined"
                            name={'emailEmpleado'}
                            InputLabelProps={{ shrink: true }}
                            value={data.emailEmpleado}
                            onChange={(e) => handle(e)}
                        />
                        <TextField
                            fullWidth
                            //autoFocus
                            margin="dense"
                            label="Número del Empleado"
                            type="number"
                            id="standard-basic"
                            variant="outlined"
                            name={'numeroTelefonoEmpleado'}
                            InputLabelProps={{ shrink: true }}
                            value={data.numeroTelefonoEmpleado}
                            onChange={(e) => handle(e)}

                        />
                        <TextField
                            fullWidth
                            autoFocus
                            name="cRolE"
                            id="cRolE"
                            margin="dense"
                            type="number"
                            label="Rol del Empleado"
                            defaultValue="0"
                            value={data.cRolE}
                            onChange={(e) => handle(e)}
                        />

                        <TextField
                            fullWidth
                            autoFocus
                            name="cTaller"
                            id="cTaller"
                            margin="dense"
                            type="number"
                            label="Número de Taller"
                            defaultValue="0"
                            value={data.cTaller}
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

export default EditarEmpleados