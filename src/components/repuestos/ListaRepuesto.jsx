import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from '@mui/material';
import AuthContext from '../../context/AuthContext'
import AgregarRepuesto from './AgregarRepuesto';


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
    cell: (row) => (<div>
      <Button color="primary" raised primary onClick={() => { console.log(row) }} title='Editar'><EditIcon /></Button>
      <Button color="error" raised primary onClick={() => { console.log(row) }} title='Eliminar'><DeleteIcon /></Button>
    </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    width: '150px',
  }
]
const ListaRepuesto = () => {
  const { auth } = useContext(AuthContext)

  const [repuestos, setRepuestos] = useState([])

  const obtenerRepuestos = () => {
    axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'Repuesto.php?cTaller=' + auth.cTaller)
      .then(respuesta => {
        setRepuestos(respuesta.data)
      })
  }
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
        subHeaderComponent={<AgregarRepuesto/>}
      />
    </>
  )
}

export default ListaRepuesto