import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Button, Stack } from '@mui/material';
import AuthContext from '../../context/AuthContext'
import AgregarRepuesto2 from './AgregarRepuesto2';

const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

const RepuestosLista = () => {

const { auth } = useContext(AuthContext)

  const [repuestos, setRepuestos] = useState([])

  const obtenerRepuestos = () => {

    axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'repuesto2.php?cTaller=' + auth.cTaller)
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
        name: 'Marca Vehiculo',
        selector: row => row.marcaV,
        sortable: true,
      },
      {
        name: 'Modelo',
        selector: row => row.modeloV,
        sortable: true,
      },
      {
        name: 'Cantidad',
        selector: row => row.cantidad,
        sortable: true,
      }
    ]
      useEffect(()=>{
        obtenerRepuestos()
      }, [])
  return (
    <>
      <DataTable
        title="Repuestos"
        //actions={<>
          //<AgregarRepuesto2 obtenerRepuestos={obtenerRepuestos} />
        //</>}
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
        noDataComponent='No hay repuestos registrados'
        paginationComponentOptions={paginationComponentOptions}
      />
    </>
  )
}

export default RepuestosLista