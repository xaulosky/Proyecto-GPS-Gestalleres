import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component'
import { Button } from '@mui/material';
import CrearTrabajo from './CrearTrabajo';

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
            name: 'Costo',
            selector: row => row.costoT,
            sortable: true
        },
        {
            name: 'Horas',
            selector: row => row.horasT,
            sortable: true
        },
        {
            name: 'Acciones',
            cell: row => <div>
                <Button onClick={() => console.log(row)} >Editar</Button>
                <Button onClick={() => eliminarTrabajo(row)}>Eliminar</Button>
            </div>

        }
    ];
    const eliminarTrabajo = (row) => {
        console.log(row)
        axios.delete(import.meta.env.VITE_APP_BACKEND_URL+'trabajo.php?cTrabajo='+row.cTrabajo)
            .then(respuesta => {
                console.log(respuesta.data)
                obtenerTrabajos();
            }
            )


    }


  const [trabajos, setTrabajos] = useState([]);

    const obtenerTrabajos = () => {
        axios.get(import.meta.env.VITE_APP_BACKEND_URL+'trabajo.php')
            .then(respuesta => {
                setTrabajos(respuesta.data);
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
            title="Lista de trabajos"
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