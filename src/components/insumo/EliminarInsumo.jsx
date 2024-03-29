import React, { useEffect, useContext } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import Button from '@mui/material/Button';
import swal from 'sweetalert';
import AuthContext from '../../context/AuthContext';

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

const EliminarInsumo = ({ row, obtenerInsumos, idAuth }) => {
    const [res, setRes] = React.useState({
        msg: '',
    });

    const { auth } = useContext(AuthContext)

    function eliminar(row) {
        swal({
            title: "¿Estas seguro de eliminar el insumo " + row.nombreInsumo + "?",
            icon: "warning",
            //buttons: true,
            buttons: ["Cancelar", "Eliminar"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(import.meta.env.VITE_APP_BACKEND_URL + '/insumo.php?cInsumo=' + row.cInsumo
                    ).then(respuesta => {
                        console.log('cInsumo: ', row.cInsumo);
                        obtenerInsumos();
                        setRes(respuesta.data);
                        if (respuesta.data.msg === 'ok') {
                            swal("Insumo eliminado correctamente", {
                                icon: "success",
                            });
                        } else {
                            swal({
                                title: "ERROR",
                                text: "Error al eliminar insumo",
                                icon: "error",
                                button: "Cerrar",
                            });
                        }
                    })
                }
            });
    }

    useEffect(() => {
        obtenerInsumos();
    }, [])

    function eliminarInsumo(row) {
        obtenerInsumos();
        eliminar(row);
    }

    function deshabilitarBoton() {

        if (auth.cRolU != 3) {
            return false;
        } else {
            return true;
        }
    }

    return (
        <>
            <Button
                onClick={() => eliminarInsumo(row)}
                color="error"
                name={'eliminar'}
                disabled={deshabilitarBoton()}
                title={'Eliminar'}
                endIcon={<DeleteOutlineIcon />}
            >
            </Button>
        </>
    )
}

export default EliminarInsumo;