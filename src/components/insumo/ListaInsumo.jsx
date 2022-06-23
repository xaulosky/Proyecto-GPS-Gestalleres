import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Button, Grid, Stack } from '@mui/material';
import CrearInsumo from './CrearInsumo';
import EditarInsumo from './EditarInsumo';
import EliminarInsumo from './EliminarInsumo';
import AuthContext from '../../context/AuthContext'
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';


const paginationComponentOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

function formatoNumeros(numero) {

  return new Intl.NumberFormat({
    style: 'numeric',
    minimumFractionDigits: 0
  }).format(numero);
}

const ListaInsumo = () => {

  function exportXLSX(insumos) {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = 'Lista de insumos';
    const ws = XLSX.utils.json_to_sheet(insumos
      .map(insumo => ({
        cInsumo: insumo.cInsumo,
        nombreInsumo: insumo.nombreInsumo,
        cantidad: insumo.cantidad,
        costo: insumo.costo,
      })));
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }

  const [insumos, setInsumos] = useState([]);

  const { auth } = useContext(AuthContext)

  const obtenerInsumos = () => {
    axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'insumo.php?cTaller=' + auth.cTaller)
      .then(respuesta => {
        console.log(respuesta.data);
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
      selector: row => formatoNumeros(row.cantidad),
      width: '200px',
    },
    {
      name: 'Valor',
      selector: row => formatoNumeros(row.costo),
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
      <Button title='Exportar Excel' onClick={(e) => exportXLSX(insumos)}> <i className="mdi mdi-table-arrow-down" style={{ fontSize: '25px' }} aria-hidden="true"></i>Exportar</Button>
    </>

  )
}

export default ListaInsumo
/* "$"+ */
{/* <CSVLink data={insumos}>Download me</CSVLink>; */ }