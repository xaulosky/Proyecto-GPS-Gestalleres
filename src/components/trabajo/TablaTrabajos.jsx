import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component'
import { Button, Stack } from '@mui/material';
import CrearTrabajo from './CrearTrabajo';
import EditarTrabajos from './EditarTrabajos';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';



const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};

const TablaTrabajos = () => {

    const columns = [
        {
            name: 'Id',
            selector: row => row.cTrabajo,
            sortable: true,
            width: '10%',
            right: true,
            center: true,

        },
        {
            name: 'Nombre',
            selector: row => row.nombreTrabajo,
            sortable: true
        },
        {
            name: 'Descripción',
            selector: row => row.descripcionTrabajo,
            sortable: true
        },
        {
            name: 'Fecha Estimada',
            selector: row => row.fechaEstimadaT,
            sortable: true
        },
        {
            name: 'Fecha Real',
            selector: row => row.fechaRealT,
            sortable: true
        },
        {
            name: 'Estado',
            selector: row => row.estadoT,
            sortable: true
        },
        {
            name: 'Costo',
            selector: row => row.costoT,
            sortable: true
        },

        {
            name: 'Acciones',
            cell: (row) => {
                return (
                    <Stack direction={row} textAlign="center" >
                        <EditarTrabajos
                            row={row}
                            obtenerTrabajos={obtenerTrabajos}
                        />
                        <Button size="large" endIcon={<DeleteOutlineIcon/>} onClick={() => eliminarTrabajo(row)}></Button>
                    </Stack>
                )
            },
            /* <Stack direction={"row"}>
                <Button size="small" variant="contained" endIcon={<BorderColor />} onClick={() => EditarTrabajo(row)} >Editar</Button>
                <Button size="small" variant="contained" endIcon={<Delete />} onClick={() => eliminarTrabajo(row)}>Eliminar</Button>
            </Stack> */
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "30%",
            center: true,
            right: true,
        }
    ];
    const eliminarTrabajo = (row) => {
        console.log(row)
        axios.delete(import.meta.env.VITE_APP_BACKEND_URL + 'trabajo.php?cTrabajo=' + row.cTrabajo)
            .then(respuesta => {
                console.log(respuesta.data)
                obtenerTrabajos();
            }
            )


    }


    const [trabajos, setTrabajos] = useState([]);

    const obtenerTrabajos = () => {
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'trabajo.php')
            .then(respuesta => {
                setTrabajos(respuesta.data);
                console.log(respuesta.data);
            })
            .catch(error => {
                console.log(error);
            }
            );
    }
    useEffect(() => {
        obtenerTrabajos();
    }, [])

    return (
        <>
            <DataTable
                title="Lista de Trabajos"
                columns={columns}
                data={trabajos}
                direction="auto"
                fixedHeader
                fixedHeaderScrollHeight="300px"
                highlightOnHover
                noContextMenu
                pagination
                persistTableHead
                pointerOnHover
                responsive
                subHeaderAlign="right"
                subHeaderWrap
                paginationComponentOptions={paginationComponentOptions}

            />
            <CrearTrabajo
                obtenerTrabajos={obtenerTrabajos}
            />
        </>





    )
}

export default TablaTrabajos