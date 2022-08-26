import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Button, Stack } from '@mui/material';
import CrearInsumo from './CrearInsumo';
import EditarInsumo from './EditarInsumo';
import EliminarInsumo from './EliminarInsumo';
import AuthContext from '../../context/AuthContext'
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import HistorialInsumo from './HistorialInsumo';
import RestaurarInsumoEliminado from './RestaurarInsumoEliminado';

const paginationComponentOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

function formatoNumeros(numero) {
  return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const ListaInsumo = () => {

  function exportXLSX(insumos) {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = 'Lista de insumos';
    const ws = XLSX.utils.json_to_sheet(insumos
      .map(insumo => ({
        "Nombre Insumo": insumo.nombreInsumo,
        "Cantidad": insumo.cantidad,
        "Valor": insumo.costo,
        "Valor Total": insumo.costo * insumo.cantidad,
      })));
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }

  const [insumos, setInsumos] = useState([]);

  const { auth } = useContext(AuthContext)

  const idAuth = auth.cRolU;

  const obtenerInsumos = () => {
    axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'insumo.php?cTaller=' + auth.cTaller)
      .then(respuesta => {
        setInsumos(respuesta.data);
      })
  }
  const columna = [
    {
      name: 'Nombre del insumo',
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
            <HistorialInsumo
              codigoInsumo={row.cInsumo}
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
      <DataTable
        title="Lista Insumos"
        actions={<>
          <CrearInsumo obtenerInsumos={obtenerInsumos} />
          <Button
            align='right'
            size='small'
            variant="contained"
            sx={{ ml: 3, p: '4px 15px' }}
            title='Exportar Excel'
            onClick={(e) => exportXLSX(insumos)}

          >
            Exportar <i
              className="mdi mdi-table-arrow-down" style={{ fontSize: '20px', marginLeft: '5px' }} aria-hidden="true">

            </i>
          </Button>
        </>}
        columns={columna}
        data={insumos}
        direction="auto"
        fixedHeader
        fixedHeaderScrollHeight="600px"
        highlightOnHover
        noContextMenu
        pagination
        persistTableHead
        pointerOnHover
        responsive
        subHeaderAlign="right"
        subHeaderWrap
        noDataComponent="No hay insumos registrados."
        paginationComponentOptions={paginationComponentOptions}
      />

      <>
        <RestaurarInsumoEliminado
          obtenerInsumos={obtenerInsumos}
        />
      </>
    </>
  )
}
export default ListaInsumo