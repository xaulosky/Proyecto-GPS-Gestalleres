import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component'
import { Button, Stack } from '@mui/material';
import CrearEmpleado from './CrearEmpleado';
import EditarEmpleados from './EditarEmpleados';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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
            name: 'Acciones',
            cell: (row) => {
                return (
                    <Stack direction={row} textAlign="center" >
                        <EditarEmpleados
                            row={row}
                            obtenerEmpleados={obtenerEmpleados}
                        />
                        <Button size="large" endIcon={<DeleteOutlineIcon/>} onClick={() => eliminarEmpleado(row)}></Button>
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
    const eliminarEmpleado = (row) => {
        console.log(row)
        axios.delete(import.meta.env.VITE_APP_BACKEND_URL+'empleado.php?cEmpleado='+row.cEmpleado)
            .then(respuesta => {
                console.log(respuesta.data)
                obtenerEmpleados();
                if (respuesta.data.msg === 'Eliminado Correctamente') {
                
                    swal("EXITO!", "Empleado eliminado correctamente", "success");
                } else {
                    swal("ERROR", "Error al eliminar el empleado", "error");
                    console.log(respuesta.data.msg);
                }
                setTimeout(() => {
                    swal.close()
                }, 3000);
            }
            )


    }

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
        <>
        <DataTable
            title="Lista de Empleados"
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
         <CrearEmpleado
        obtenerEmpleados={obtenerEmpleados}   
        />
        
        </>
        
        
        

       

    )
}

export default TablaEmpleados