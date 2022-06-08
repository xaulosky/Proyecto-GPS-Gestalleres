import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from '@mui/material';

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
    name: 'Código Taller',
    selector: row => row.cTaller,
  },
  {
    name: 'Código Taller',
    selector: row => row.cTaller,
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
  const [repuestos, setRepuestos] = useState([])

  const obtenerRepuestos = () => {
    axios.get('http://localhost:8080/apigps/api/repuesto.php')
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
        subHeaderAlign="right"
        subHeaderWrap
      />
    </>
  )
}

export default ListaRepuesto