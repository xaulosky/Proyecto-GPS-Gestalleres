//RAFCE
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from '@mui/material/Button'
import { Grid, Stack } from '@mui/material';
import CrearInsumo from './CrearInsumo';
import EditarInsumo from './EditarInsumo';
import EliminarInsumo from './EliminarInsumo';
import HistorialInsumo from './HistorialInsumo';

const paginationComponentOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

const ListaInsumo = () => {

  const [insumos, setInsumos] = useState([]);

  const obtenerInsumos = () => {
    axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'insumo.php')
      .then(respuesta => {
        setInsumos(respuesta.data);
      })
  }

  const columna = [
    {
      name: 'Nombre de insumo',
      selector: row => row.nombreInsumo,
      width: '600px',
    },
    {
      name: 'Cantidad',
      selector: row => row.cantidad,
      width: '200px',
    },
    {
      name: 'Valor',
      selector: row => row.costo,
      width: '200px',
    },
    {
      name: 'Acciones',
      cell: (row) => {
        return (
          <Stack direction={row} textAlign="center" >
            <EditarInsumo 
              row={row} 
              obtenerInsumos={obtenerInsumos}
            />
            <HistorialInsumo row= {row}/>
            <EliminarInsumo
              row={row}
              obtenerInsumos={obtenerInsumos}
            />
          </Stack>
        )
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '150px',
    }
  ];

  useEffect(() => {
    obtenerInsumos();
  }, [])

  

  return (
    <>
      <Grid item align='right' xs={12} >
        <CrearInsumo obtenerInsumos={obtenerInsumos} />
      </Grid>
      <DataTable
        title="Lista Insumos"
        columns={columna}
        data={insumos}
        direction="auto"
        fixedHeader
        fixedHeaderScrollHeight="500px"
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
    </>

  )
}

export default ListaInsumo
/* "$"+ */
