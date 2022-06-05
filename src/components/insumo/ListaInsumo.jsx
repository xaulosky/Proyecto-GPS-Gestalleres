//RAFCE
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CrearInsumo from './CrearInsumo';

const paginationComponentOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

const columna = [
  {
    name: 'ID',
    selector: row => row.cInsumo,
    width: '100px',
  },
  {
    name: 'Nombre de insumo',
    selector: row => row.nombreInsumo,
    width: '500px',
  },
  {
    name: 'Cantidad',
    selector: row => row.cantidad,
    width: '150px',
  },
  {
    name: 'Valor',
    selector: row => row.costo,
    width: '150px',
  },
  {
    name: 'EDITAR',
    cell: (row) => <Button variant="contained" color="primary" endIcon={<EditIcon />} raised primary onClick={() => { console.log(row) }} >Editar</Button>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    width: '150px',
  },
  {
    name: 'ELIMINAR',
    cell: (row) => <Button variant="contained" endIcon={<DeleteIcon />} color="primary" raised primary onClick={() => { console.log(row) }} >Eliminar</Button>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    width: '150px',
  }
];

const ListaInsumo = () => {

  const [insumos, setInsumos] = useState([]);

  const obtenerInsumos = () => {
    axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'insumo.php')
      .then(respuesta => {
        setInsumos(respuesta.data);
      })
  }

  useEffect(() => {
    obtenerInsumos();
  }, [])

  return (
    <>
      <Grid align='right' xs={12} >
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
