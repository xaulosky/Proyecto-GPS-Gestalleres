import { Button } from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { DeleteIcon } from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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
  pt: 2,
  px: 4,
  pb: 3
};

rafce

const EliminarRepuesto = ({row, obtenerRepuestos}) => {
  const { auth } = useContext(AuthContext)

  const [res, setRes] = useState({

    msg: ''
  });

  function eliminarFila(row) {

    swal({

      title: "¿Está seguro de eliminar el repuesto " + row.nombreRepuesto + "?",
      text: "Esta acción no puede deshacerse",
      icon: "warning",
      buttons: true,
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true
    })
      .then((willDelete) => {

        if (willDelete) {

          axios.delete(import.meta.env.VITE_APP_BACKEND_URL + '/repuesto.php?cRepuesto=' + row.cRepuesto)
            .then(respuesta => {

              obtenerRepuestos();
              setRes(respuesta.data)
              if (respuesta.data.msg === 'Repuesto Eliminado') {

                swal("El repuesto ha sido eliminado", {

                  icon: "success",
                });
              } else {

                swal({

                  title: "Error",
                  text: "Se ha producido un error al eliminar el repuesto",
                  icon: "error",
                  button: "Cerrar"
                });
              }
            })
        }
      });
  }

  useEffect(() => {

    obtenerRepuestos()
  }, [])

  function eliminar(row) {

    obtenerRepuestos();
    eliminarFila(row);
  }

  const restringirBoton = () => {
    if (auth.cRolU != 3) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <Button
        onClick={() => eliminar(row)}
        color='error'
        name={'eliminar'}
        title={'Eliminar'}
        endIcon={<DeleteOutlineIcon/>}
        disabled={restringirBoton()}
      >
      </Button>
    </>
  )
}

export default EliminarRepuesto