import { Button, IconButton } from '@mui/material'
import React from 'react'
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteFicha, getFichas } from '../../services/apiFicha';
import useAuth from '../../hooks/useAuth';

const EliminarFicha = ({ cFicha, setFichas }) => {

    const { auth } = useAuth()
    const preguntarBorrar = () => {
        swal({
            title: "Estas seguro?",
            text: "Al eliminar esta ficha no podras recuperarla",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteFicha(cFicha).then(() => {
                        swal("Ficha Eliminada", {
                            icon: "success",
                            button: false,
                            timer: 1000
                        });
                        getFichas(auth.cTaller).then((res) => setFichas(res))
                    })

                } else {
                    swal("La ficha no ha sido eliminada", {
                        button: false,
                        timer: 2000,
                        icon: "error"
                    });
                }
            });


    }

    return (
        <IconButton onClick={preguntarBorrar} title="Eliminar Ficha">
            <DeleteIcon />
        </IconButton>
    )
}

export default EliminarFicha