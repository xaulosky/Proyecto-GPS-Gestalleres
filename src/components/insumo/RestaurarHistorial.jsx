import { Button, Dialog, DialogActions, DialogContentText, DialogTitle, DialogContent } from '@mui/material'
import React, {useState} from 'react'
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import axios from 'axios';
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
    backgroundColor: '#FFFFFF',
    pt: 2,
    px: 4,
    pb: 3,
};

const RestaurarHistorial = ({ row, obtenerInsumos, obtenerHistorial, setOpen }) => {

    const [res, setRes] = useState({
        resp: '',
    });
    const restaurar = (e) => {
        e.preventDefault();

        swal({
            title: "¿Estas seguro que desea restaurar los datos del insumo?",
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

    return (
        <><Button onClick={restaurar}
            color="primary"
            type={'submit'}
            name={'restaurar'}
            title={'Restaurar'}
        >
            <SettingsBackupRestoreIcon />
        </Button>
        </>
    )
}

export default RestaurarHistorial