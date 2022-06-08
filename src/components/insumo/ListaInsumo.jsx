//RAFCE
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

/* const paginationComponentOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
}; */

const columna = [
  {
    name: 'Codigo insumo',
    selector: row => row.cInsumo,
  },
  {
    name: 'Nombre de insumo',
    selector: row => row.nombreInsumo,
  },
  {
    name: 'Cantidad',
    selector: row => row.cantidad,
  },
  {
    name: 'Valor',
    selector: row => row.costo,
  }
];

const ListaInsumo = () => {

  const [insumos, setInsumos] = useState([]);

  const obtenerInsumos = () => {
    axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'insumo.php')
      .then(respuesta => {
        console.log(respuesta.data);
        setInsumos(respuesta.data);
      })
  }

  useEffect(() => {
    obtenerInsumos();
  }, [])

  return (
    <DataTable
      title="Lista Insumos"
      columns={columna}
      data={insumos}
      direction="auto"
      fixedHeader
      fixedHeaderScrollHeight="900px"
      highlightOnHover
      noContextMenu
      pagination
      persistTableHead
      pointerOnHover
      responsive
      subHeaderAlign="right"
      subHeaderWrap
    //paginationComponentOptions={paginationComponentOptions}
    />
  )
}

export default ListaInsumo
/* "$"+ */
