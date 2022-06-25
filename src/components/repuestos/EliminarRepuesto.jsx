import { Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { DeleteIcon } from '@mui/icons-material/Delete';
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
  pt: 2,
  px: 4,
  pb: 3
};

const EliminarRepuesto = ({row, obtenerRepuestos}) => {
  console.log(row);

  const [res, setRes] = useState({

    msg: ''
  });

  function eliminarFila(row) {

    swal({

      title: "¿Está seguro de eliminar el repuesto" + row.nombre + "?",
      text: "Esta acción no puede deshacerse",
      icon: "warning",
      /* buttons: true, */
      buttons: ["Eliminar", "Cancelar"],
      dangerMode: true
    })
      .then((willDelete) => {

        if (willDelete) {

          axios.delete(import.meta.env.VITE_APP_BACKEND_URL + '/repuesto.php?cRepuesto=' + row.cRepuesto)
            .then(respuesta => {

              console.log('cRepuesto: ', row.cRepuesto)
              obtenerRepuestos();
              setRes(respuesta.data)
              if (respuesta.data.msg === 'ok') {
                
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

  function eliminarRepuesto(row) {

    obtenerRepuestos()
    eliminarFila(row)
  }

  return (
    <>
      <Button
        onClick={() => eliminarRepuesto(row)}
        color='error'
        name={'eliminar'}
        title={'Eliminar'}
        endIcon={<DeleteIcon />}
      >
      </Button>
    </>
  )
}

export default EliminarRepuesto