import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Button, Stack } from '@mui/material';
import AuthContext from '../../context/AuthContext'
import AgregarRepuesto from './AgregarRepuesto';
import EliminarRepuesto from './EliminarRepuesto';
import EditarRepuesto from './EditarRepuesto';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const ListaRepuesto = () => {

  const { auth } = useContext(AuthContext)

  const [repuestos, setRepuestos] = useState([])

  function exportXLSX(repuestos) {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = 'Lista de repuestos';
    const ws = XLSX.utils.json_to_sheet(repuestos
      .map(repuestos => ({
        "Nombre Repuesto": repuestos.nombreRepuesto,
        "Cantidad": repuestos.cantidad,
        "Fecha Solicitud": repuestos.fechaSolicitud,
        "Fecha Llegada": repuestos.fechaLlegada,
        "Estado Repuesto": repuestos.estadoRepuesto
      })));
    const wb = { Sheets: { 'Hoja 1': ws }, SheetNames: ['Hoja 1'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }

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
              row={row}
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
        actions={<>
          <AgregarRepuesto obtenerRepuestos={obtenerRepuestos} />
          <Button
            align='right'
            size='small'
            variant="contained"
            sx={{ ml: 3, p: '4px 15px' }}
            title='Exportar Excel'
            onClick={(e) => exportXLSX(repuestos)}
          >
            Exportar <i
              className="mdi mdi-table-arrow-down" style={{ fontSize: '20px', marginLeft: '5px' }} aria-hidden="true">

            </i>
          </Button>
        </>}
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
      />
    </>
  )
}

export default ListaRepuesto