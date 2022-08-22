import { Button, Dialog, DialogActions, DialogContentText, DialogTitle, DialogContent } from '@mui/material'
import React, {useState, useContext } from 'react'
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import axios from 'axios';
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

const RestaurarHistorial = ({ row, obtenerInsumos, obtenerHistorial, setOpen }) => {

    const [res, setRes] = useState({
        resp: '',
    });
    const { auth } = useContext(AuthContext)

    const restaurar = (e) => {
        e.preventDefault();

        swal({
            title: "¿Estas seguro que desea restaurar los datos del insumo?",
            text: "Nombre: " + row.nombreInsumo+"\n\n"+"Cantidad: " + row.cantidad+"\n\n"+"Valor: " + row.costo,
            icon: "warning",
            buttons: true,
            buttons: ["Cancelar", "Restaurar"],
            //dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.put(import.meta.env.VITE_APP_BACKEND_URL + 'insumoHistorial.php', {

                            nombreInsumo: row.nombreInsumo,
                            cantidad: row.cantidad,
                            costo: row.costo,
                            cInsumo: row.cInsumo
                    })
                        .then(respuesta => {
                            
                            obtenerInsumos();
                            cerrarModal(respuesta.data.msg);

                        })
                }
            })

    }

    function cerrarModal(res) {
        console.log(res);
        if (res === 'ok') {
            swal("Restaurado", "Insumo restaurado correctamente", "success");
        } else {
            swal("ERROR", "Error al restaurar el insumo", "error");
        }
        setOpen(false);
    }

    function deshabilitarBoton(){

        if(auth.cRolU!=3){
            return false;
        }else{
            return true;
        }
    }

    return (
        <><Button onClick={restaurar}
            color="primary"
            type={'submit'}
            disabled={deshabilitarBoton()}
            name={'restaurar'}
            title={'Restaurar'}
        >
            <SettingsBackupRestoreIcon />
        </Button>
        </>
    )
}

export default RestaurarHistorial