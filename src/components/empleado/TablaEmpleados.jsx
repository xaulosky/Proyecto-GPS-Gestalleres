import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component'

const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};

const TablaEmpleados = () => {

    const columns = [
        {
            name: 'Id',
            selector: row => row.cEmpleado,
            sortable: true,
            width: '10%',
            right: true,
            center: true,

        },
        {
            name: 'Rut',
            selector: row => row.rutEmpleado,
            sortable: true
        },
        {
            name: 'Nombre',
            selector: row => row.nombreEmpleado,
            sortable: true
        }, 
        {
            name: 'Apellido',
            selector: row => row.apellidoEmpleado,
            sortable: true
        }, 
        {
            name: 'Email',
            selector: row => row.emailEmpleado,
            sortable: true
        }, 
        {
            name: 'Número',
            selector: row => row.numeroTelefonoEmpleado,
            sortable: true
        },
        {
            name: 'Rol',
            selector: row => row.cRolE,
            sortable: true
        },
        {
            name: 'Taller',
            selector: row => row.cTaller,
            sortable: true
        }
    ];

  const [empleados, setEmpleados] = useState([]);

    const obtenerEmpleados = () => {
        axios.get(import.meta.env.VITE_APP_BACKEND_URL+'empleado.php')
            .then(respuesta => {
                setEmpleados(respuesta.data);
            })
            .catch(error => {
                console.log(error);
            }
            );
    }
    useEffect(() => {
        obtenerEmpleados();
    }, [])

    return (
        <DataTable
            title="Lista de empleados"
            columns={columns}
            data={empleados}
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

export default TablaEmpleados