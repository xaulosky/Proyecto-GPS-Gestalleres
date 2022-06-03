import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

const columns = [
  {
    name: 'Nombre',
    selector: row => row.nombreRepuesto,
    sortable: true,
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