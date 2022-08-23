import React from 'react'
import { useEffect, useState, useContext} from 'react'
import { Box, Button, DialogActions, Grid, Modal, TextField, Typography, Autocomplete } from '@mui/material';
import DataTable from 'react-data-table-component';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
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

const opciones = [
    {
        value: 1,
        label: 'En revisión',
    },
    {
        value: 2,
        label: 'En reparación',
    },
    {
        value: 3,
        label: 'Pintura'
    },
    {
        value: 4,
        label: 'Reparado',
    },
    {
        value: 5,
        label: 'Entregado',
    },
    {
        value: 6,
        label: 'Cancelado',
    },
    {
        value: 7,
        label: 'En espera',
    },
];

const EditarVehiculo = ({ row, obtenerVehiculos }) => {

    const { auth } = useContext(AuthContext)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [data, setData] = useState({
        patenteV: row.patenteV,
        modeloV: row.modeloV,
        colorV: row.colorV,
        estadoV: row.estadoV,
        estadoRevisionTecnicaV: row.estadoRevisionTecnicaV,
        montoAseguradora: row.montoAseguradora,
        tipoAseguradora: row.tipoAseguradora,
        cVehiculo: row.cVehiculo,
        cTaller: row.cTaller,
    });

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.name] = e.target.value;
        setData(newdata);
        console.log(newdata);
    }


    const submit = (e) => {
        e.preventDefault();
        axios.put(import.meta.env.VITE_APP_BACKEND_URL + 'vehiculo.php', {

            patenteV: data.patenteV,
            modeloV: data.modeloV,
            colorV: data.colorV,
            estadoV: data.estadoV,
            estadoRevisionTecnicaV: data.estadoRevisionTecnicaV,
            montoAseguradora: data.montoAseguradora,
            cVehiculo: data.cVehiculo,
            cTaller: data.cTaller,
        })
            .then(respuesta => {
                handleClose(e);
                obtenerVehiculos();
                if (respuesta.data.msg === 'Actualizado correctamente') {

                    swal("EXITO!", "Cambios efectuados correctamente", "success");
                } else {
                    swal("ERROR", "Error al editar el vehiculo", "error");
                    console.log(respuesta.data.msg);
                }
                setTimeout(() => {
                    swal.close()
                }, 3000);
            })
    }

    const abrirModal = () => {
        obtenerVehiculos();
        setData({
            patenteV: row.patenteV,
            modeloV: row.modeloV,
            colorV: row.colorV,
            estadoV: row.estadoV,
            estadoRevisionTecnicaV: row.estadoRevisionTecnicaV,
            montoAseguradora: row.montoAseguradora,
            tipoAseguradora: row.tipoAseguradora,
            cVehiculo: row.cVehiculo,
            cTaller: row.cTaller,
        });
        handleOpen();
    }

    const cerrarModal = () => {
        obtenerVehiculos();
        setData({
            patenteV: '',
            modeloV: '',
            colorV: '',
            estadoV: '',
            estadoRevisionTecnicaV: '',
            montoAseguradora: '',
            tipoAseguradora: '',
            cVehiculo: '',
            cTaller: '',
        });
        handleClose();
    }

    const [talleres, setTalleres] = useState();
    const [tallerSeleccionado, setTallerSeleccionado] = useState();

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'taller.php')
            .then(respuesta => {
                setTalleres(respuesta.data);
            })
    }, []);

    const deshabilitarBoton = () =>{

        if(auth.cRolU!=3){
            return false;
        }else{
            return true;
        }
    }

    return (
        <>
            <Button onClick={abrirModal}
                type={'submit'}
                name={'editar'}
                color="primary"
                endIcon={<EditIcon />}
            >
            </Button>
            <Modal
                open={open}
                onClose={cerrarModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component='form' sx={style} onSubmit={submit} >
                    <Typography id="modal-modal-title" variant="h6" component={'div'} align='center'>
                        Editar Vehiculo
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 1 }} component={'div'}>
                        <TextField fullWidth
                            id='patenteV'
                            name={'patenteV'}
                            label="Patente"
                            margin="normal"
                            variant="outlined"
                            type={'text'}
                            value={data.patenteV}
                            required
                            onChange={(e) => handle(e)}
                            disabled={deshabilitarBoton()}
                        />
                        <TextField fullWidth
                            id='modeloV'
                            name={'modeloV'}
                            label="Modelo"
                            margin="normal"
                            variant="outlined"
                            type={'text'}
                            value={data.modeloV}
                            required
                            onChange={(e) => handle(e)}
                            disabled={deshabilitarBoton()}
                        />
                        <TextField fullWidth
                            id='colorV'
                            name={'colorV'}
                            label="Color"
                            margin="normal"
                            variant="outlined"
                            type={'text'}
                            value={data.colorV}
                            required
                            onChange={(e) => handle(e)}
                            disabled={deshabilitarBoton()}
                        />
                        <TextField fullWidth
                            id='estadoV'
                            name={'estadoV'}
                            label="Estado"
                            margin="normal"
                            variant="outlined"
                            type={'text'}
                            value={data.estadoV}
                            required
                            onChange={(e) => handle(e)}
                            disabled={deshabilitarBoton()}
                        />
                        <Autocomplete
                            options={opciones}
                            getOptionLabel={(option) => option.label}

                            onChange={(e, value) => {
                                setData({
                                    ...data,
                                    estadoRevisionTecnicaV: value.label
                                })
                            }}
                            renderInput={(params) => <TextField {...params} value={data.estadoRevisionTecnicaV} label="Estado de revision tecnica" id="estadoRevisionTecnicaV"
                                name={'estadoRevisionTecnicaV'}
                                required />}
                        />
                        <TextField fullWidth
                            id='montoAseguradora'
                            name={'montoAseguradora'}
                            label="Monto Aseguradora"
                            margin="normal"
                            variant="outlined"
                            type={'number'}
                            value={data.montoAseguradora}
                            InputProps={{ inputProps: { min: 0 } }}
                            required
                            onChange={(e) => handle(e)}
                            disabled={deshabilitarBoton()}
                        />
                        <Grid item xs={12} sm={12} style={{ height: '100px', Textalign: 'center' }}>
                            <DialogActions>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    name={'Aceptar'}
                                    type={'submit'}
                                >
                                    Aceptar
                                </Button>
                                <Button
                                    onClick={cerrarModal}
                                    variant="contained"
                                    color="error"
                                    name={'Cancelar'}
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
export default EditarVehiculo