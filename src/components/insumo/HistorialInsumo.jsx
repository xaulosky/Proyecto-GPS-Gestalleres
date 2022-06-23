import { Button, DialogActions, Grid, Typography } from '@mui/material'
import React from 'react'
import RestoreIcon from '@mui/icons-material/Restore';
import DataTable from 'react-data-table-component';
import { Modal } from '@mui/material';
import axios from 'axios';
import { Box } from '@mui/system';
import RestaurarHistorial from './RestaurarHistorial';

const style = {

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    backgroundColor: '#FFFFFF',
};
function formatoNumeros(numero) {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  
const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};

const HistorialInsumo = ({ codigoInsumo, obtenerInsumos }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [datosHistorial, setHistorial] = React.useState([]);

    const columna = [
        {
            name: 'Fecha de modificacion',
            selector: row => row.fechaCambio,
        },
        {
            name: 'Nombre del insumo',
            selector: row => row.nombreInsumo,
        },
        {
            name: 'Cantidad',
            selector: row => formatoNumeros(row.cantidad),
        },
        {
            name: 'Costo',
            selector: row => formatoNumeros(row.costo),
        },
        {
            name: 'Restaurar',
            cell: (row) => {
                return (
                    <RestaurarHistorial
                        row ={row }
                        obtenerInsumos = {obtenerInsumos}
                        obtenerHistorial = {obtenerHistorial}
                    />
                )
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '150px',
        }
    ];

    const obtenerHistorial = (e) => {
        e.preventDefault();
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'insumoHistorial.php?cInsumo=' + codigoInsumo)
            .then(respuesta => {
                setHistorial(respuesta.data);
                handleOpen();
            })
    }

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.name] = e.target.value;
        setData(newdata);
    }

    return (
        <>
            <Button
                onClick={obtenerHistorial}
                color="primary"
                //type={'submit'}
                name={'historial'}
                title={'Historial'}
            >
                <RestoreIcon />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component='form' sx={style} >
                    <Typography id="modal-modal-title" variant="h6" component={'div'} align='center'>
                        HISTORIAL INSUMO
                    </Typography>
                    <DataTable
                        title="Lista Insumos"
                        columns={columna}
                        data={datosHistorial}
                        direction="auto"
                        fixedHeader
                        fixedHeaderScrollHeight="500px"
                        highlightOnHover
                        noContextMenu
                        persistTableHead
                        pointerOnHover
                        responsive
                        subHeaderAlign="right"
                        subHeaderWrap
                    />
                    <DialogActions >
                        <Button
                            onClick={handleClose}
                            color="primary">
                            Cerrar
                        </Button>
                    </DialogActions>
                </Box>
            </Modal>
        </>

    )
}

export default HistorialInsumo

/* <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
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

            </Modal> */