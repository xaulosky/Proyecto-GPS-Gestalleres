import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Button, Stack } from '@mui/material';
import AuthContext from '../../context/AuthContext'
import swal from 'sweetalert';

const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};
function formatoNumeros(numero) {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
const MostrarInsumosEliminados = ({obtenerInsumos}) => {

    const [insumosEliminado, setInsumosEliminados] = useState([]);

    const { auth } = useContext(AuthContext)

    const idAuth = auth.cRolU;

    const obtenerInsumosEliminados = () => {
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'insumoEliminado.php?cTaller=' + auth.cTaller)
            .then(respuesta => {
                setInsumosEliminados(respuesta.data);
            })
    }
  return (
    insumosEliminado
  )
}

export default MostrarInsumosEliminados