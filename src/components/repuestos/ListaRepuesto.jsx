import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Button, Stack } from '@mui/material';
import AuthContext from '../../context/AuthContext'
import AgregarRepuesto from './AgregarRepuesto';
import EliminarRepuesto from './EliminarRepuesto';
import EditarRepuesto from './EditarRepuesto';


const ListaRepuesto = () => {

  const { auth } = useContext(AuthContext)

  const [repuestos, setRepuestos] = useState([])

  const obtenerRepuestos = () => {

    axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'repuesto.php?cTaller=' + auth.cTaller)
      .then(respuesta => {

        setRepuestos(respuesta.data)
      })
  }

  const columns = [
    {
      name: 'Nombre',
      selector: row => row.nombreRepuesto,
      sortable: true,
    },
    {
      name: 'Cantidad',
      selector: row => row.cantidad
    },
    {
      name: 'Fecha Solicitud',
      selector: row => row.fechaSolicitud,
    },
    {
      name: 'Fecha Llegada',
      selector: row => row.fechaLlegada,
    },
    {
      name: 'Estado Repuesto',
      selector: row => row.estadoRepuesto,
    },
    {
      name: 'Acciones',
      cell: (row) => {

        return (
          <Stack
            direction={row}
            textAlign='center'
          >
            <EditarRepuesto
              row={row}
              obtenerRepuestos={obtenerRepuestos}
            />
            <EliminarRepuesto
              codRepuesto={row.cRepuesto}
              obtenerRepuestos={obtenerRepuestos}
            />
          </Stack>

        )
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '150px',
    }
  ]

  useEffect(() => {

    obtenerRepuestos()
  }, [])
  return (
    <>
      <DataTable
        title="Repuestos"
        columns={columns}
        data={repuestos}
        direction="auto"
        fixedHeader
        fixedHeaderScrollHeight="300px"
        highlightOnHover
        noContextMenu
        pagination
        persistTableHead
        pointerOnHover
        responsive
        subHeader
        subHeaderComponent={<AgregarRepuesto obtenerRepuestos={obtenerRepuestos} />}
      />
    </>
  )
}

export default ListaRepuesto