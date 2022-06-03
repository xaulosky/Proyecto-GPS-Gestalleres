import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component'

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
            name: 'Orden de Trabajo',
            selector: row => row.cOrdenTrabajo,
            sortable: true
        },
        {
            name: 'Tipo de Trabajo',
            selector: row => row.cTipoT,
            sortable: true
        },
        {
            name: 'Empleado',
            selector: row => row.cEmpleado,
            sortable: true
        },
        {
            name: 'Tipo de Estado',
            selector: row => row.cTipoE,
            sortable: true
        }
    ];

    const [trabajos, setTrabajos] = useState([])

    const getTrabajos = () => {
        axios.get('http://localhost/apigps/apigps/api/trabajo.php')
            .then(res => {
                setTrabajos(res.data)
            })
    }

    useEffect(() => {
        getTrabajos()
    }, [])


    return (
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
        

       

    )
}

export default TablaTrabajos