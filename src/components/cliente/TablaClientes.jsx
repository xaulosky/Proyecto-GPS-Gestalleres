import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component'
import { Filter } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import CrearCliente from './CrearCliente';
import CloseIcon from '@mui/icons-material/Close';
import EditarCliente from './EditarCliente';

const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};
const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <div>
        <TextField
            id="search"
            type="text"
            placeholder="Filtrar por nombre"
            aria-label="Search input"
            value={filterText}
            onChange={onFilter}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={onClear}>
                            <CloseIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    </div>
);

const TablaClientes = () => {

    const columns = [
        {
            name: 'Rut',
            selector: row => row.rutC,
            sortable: true
        },
        {
            name: 'Email',
            selector: row => row.emailC,
            sortable: true
        }, {
            name: 'Nombre',
            selector: row => row.nombreC,
            sortable: true
        }, {
            name: 'Apellido',
            selector: row => row.apellidoC,
            sortable: true
        }, {
            name: 'Dirección',
            selector: row => row.direccionC,
            sortable: true
        }, 
        {
            name: 'Comuna',
            selector: row => row.nombreCo,
            sortable: true
        },
        /* columna boton */
        {
            name: 'Acciones',
            cell: row => <EditarCliente getClientes={getClientes} row={row.cCliente} />,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '10%',
            center: true,
            right: true,
            sortable: true,
        }
    ];

    const [clientes, setClientes] = useState([])

    const getClientes = async () => {
        await axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'cliente.php')
            .then(res => {
                setClientes(res.data)
            })
    }

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = clientes.filter(
        item => item.nombreC && item.nombreC.toLowerCase().includes(filterText.toLowerCase())
    );
    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };
        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);

    useEffect(() => {
        getClientes()
    }, [])

    return (
        <>
            <DataTable
                title="Lista de clientes"
                columns={columns}
                data={filteredItems}
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
                paginationComponentOptions={paginationComponentOptions}
                paginationResetDefaultPage={resetPaginationToggle}
                subHeaderComponent={subHeaderComponentMemo}
            />
            <CrearCliente getClientes={getClientes} />
        </>
    )
}

export default TablaClientes
