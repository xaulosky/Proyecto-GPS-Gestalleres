import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { Button, Grid, Stack, Typography} from '@mui/material';
import DataTable from 'react-data-table-component';
import EditarVehiculo from './EditarVehiculo';
import EliminarVehiculo from './EliminarVehiculo';
import AgregarVehiculo from './AgregarVehiculo';
import AuthContext from '../../context/AuthContext';


import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

function formatoNumeros(numero) {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const formatoDinero = (numero) => {
    return ' $ ' + formatoNumeros(numero);
}

const ListaVehiculos = () => {

    const { auth } = useContext(AuthContext)

    const columns = [
        {
            name: 'Rut cliente',
            selector: row => row.rutC,
        },
        {
            name: 'Patente',
            selector: row => row.patenteV,
        },
        {
            name: 'Modelo',
            selector: row => row.modeloV,
        },
        {
            name: 'Color',
            selector: row => row.colorV,
        },
        {
            name: 'Estado',
            selector: row => row.estadoV,
        },
        {
            name: 'Estado Revision Tecnica',
            selector: row => row.estadoRevisionTecnicaV,
        },
        {
            name: 'Monto Aseguradora',
            selector: row => formatoDinero(formatoNumeros(row.montoAseguradora)),
        },
        {
            name: 'Tipo Carroceria',
            selector: row => row.tipoCarroceria,
        },
        {
            name: 'Acciones',
            cell: (row) => {
                return (
                    <Stack direction={row} textAlign="center" >
                        <EditarVehiculo
                            row={row}
                            obtenerVehiculos={obtenerVehiculos}
                        />
                        <EliminarVehiculo
                            row={row}
                            obtenerVehiculos={obtenerVehiculos}
                        />
                    </Stack>
                )
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '150px',
            align: 'center',
        }
    ];

    const [tipoCarrocerias, setTipoCarrocerias] = useState();
    const [tipoCarroceriaSeleccionada, setTipoCarroceriaSeleccionada] = useState();


    const [vehiculos, setVehiculos] = useState([]);

    const obtenerVehiculos = () => {
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'vehiculo.php?cTaller=' + auth.cTaller)
            .then(respuesta => {
                setVehiculos(respuesta.data);
            })
    }
    console.log(auth)
    const obtenerTipoCarrocerias = () => {
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'tipoCarroceria.php')
            .then(respuesta => {
                setTipoCarrocerias(respuesta.data);
            })
    }

    useEffect(() => {
        obtenerVehiculos();
        obtenerTipoCarrocerias();
    }, [])

    //Pie de pagina 
    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    const exportXLSX = (vehiculos) => {

        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const fileName = 'Lista de Vehículos';
        const ws = XLSX.utils.json_to_sheet(vehiculos
          .map(vehiculos => ({
            "Rut Cliente": vehiculos.rutC,
            "Patente": vehiculos.patenteV,
            "Modelo": vehiculos.modeloV,
            "Tipo Carroceria": vehiculos.tipoCarroceria,
            "Aseguradora": vehiculos.montoAseguradora,
          })));
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
      }

    return (
        <>
            <Grid item align='right' xs={12} >
                <AgregarVehiculo obtenerVehiculos={obtenerVehiculos} />
                <Button
                align='right'
                size='small'
                variant="contained"
                sx={{ ml: 3, p: '1px 12px' }}
                title='Exportar Excel'
                onClick={(e) => exportXLSX(vehiculos)}
            >
                Exportar <i
                className="mdi mdi-table-arrow-down" style={{ fontSize: '20px', marginLeft: '5px' }} aria-hidden="true">
                </i>
                </Button>
            </Grid>
            
            <DataTable
                title=""
                columns={columns}
                data={vehiculos}
                dense
                direction="auto"
                fixedHeaderScrollHeight="300px"
                pagination
                responsive
                subHeaderAlign="center"
                noDataComponent = {<Typography variant="h5" component="h2"s>
                                No existen datos disponibles
                            </Typography>
                            }
                paginationComponentOptions={paginationComponentOptions}
                subHeaderWrap
            />
        </>
    )
}

export default ListaVehiculos