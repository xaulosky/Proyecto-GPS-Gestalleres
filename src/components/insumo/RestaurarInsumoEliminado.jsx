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
const RestaurarInsumoEliminado = ({ obtenerInsumos }) => {

    const [insumosEliminado, setInsumosEliminados] = useState([]);

    const { auth } = useContext(AuthContext)

    const idAuth = auth.cRolU;

    const obtenerInsumosEliminados = () => {
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'insumoEliminado.php?cTaller=' + auth.cTaller)
            .then(respuesta => {
                setInsumosEliminados(respuesta.data);
            })
    }

    const columna = [
        {
            name: 'Nombre del insumo',
            selector: row => row.nombreInsumo,
            width: '600px',
        },
        {
            name: 'Cantidad',
            selector: row => formatoNumeros(row.cantidad),
            width: '200px',
        },
        {
            name: 'Valor',
            selector: row => formatoNumeros(row.costo),
            width: '200px',
        },
        {
            name: 'Restaurar',
            cell: (row) => {
                return (
                    <Button onClick={() => hola(row)}
                        name={'restaurar'}
                        disabled={deshabilitarBoton()}
                        title={'Restaurar'}
                    >Restaurar

                    </Button>
                )
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '150px',
        }
    ];

    function hola(row) {
        console.log(row.cInsumo)
        restaurarInsumo(row.cInsumo)
    }


    useEffect(() => {
        obtenerInsumosEliminados();
    }, [])

    function deshabilitarBoton() {

        if (auth.cRolU != 3) {
            return false;
        } else {
            return true;
        }
    }

    const restaurarInsumo = (cInsumo) => {
        swal({
            title: "¿Estas seguro de restaurar el insumo ?",
            icon: "warning",
            //buttons: true,
            buttons: ["Cancelar", "Restaurar"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.put(import.meta.env.VITE_APP_BACKEND_URL + 'insumoEliminado.php', {
                        cInsumo: cInsumo,
                    })
                        .then(respuesta => {
                            prevenir();
                        })
                }
            });
    }

    function prevenir() {
        obtenerInsumosEliminados()
        obtenerInsumos();
    }

    return (
        <>
            <DataTable
                title="Insumos Eliminados"
                columns={columna}
                data={insumosEliminado}
                direction="auto"
                fixedHeader
                fixedHeaderScrollHeight="600px"
                highlightOnHover
                noContextMenu
                pagination
                persistTableHead
                pointerOnHover
                responsive
                subHeaderAlign="right"
                subHeaderWrap
                noDataComponent="No hay insumos Eliminados."
                paginationComponentOptions={paginationComponentOptions}
            />
        </>

    )
}

export default RestaurarInsumoEliminado