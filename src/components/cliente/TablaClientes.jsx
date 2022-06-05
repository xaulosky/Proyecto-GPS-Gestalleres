import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component'
import { Filter } from '@mui/icons-material';
import { TextField } from '@mui/material';
import CrearCliente from './CrearCliente';

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
            placeholder="Filter by name"
            aria-label="Search input"
            value={filterText}
            onChange={onFilter}
        />
        <button onClick={onClear}>Clear</button>
    </div>
);

const TablaClientes = () => {

    const columns = [
        {
            name: 'Id',
            selector: row => row.cCliente,
            sortable: true,
            width: '10%',
            right: true,
            center: true,

        },
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
        }, {
            name: 'Estado',
            selector: row => row.estadoC,
            sortable: true
        },
        {
            name: 'Comuna',
            selector: row => row.cComuna,
            sortable: true
        },
    ];
<<<<<<< HEAD
    
    const [clientes, setClientes] = useState([])

    const getClientes = async() => {
        await axios.get('http://localhost:8080/apigps/api/cliente.php')
=======

    const [clientes, setClientes] = useState([])

    const getClientes = async () => {
        await axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'cliente.php')
>>>>>>> ddd8ba651db3ac3610733b7198f4cd77dcf370a6
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
<<<<<<< HEAD
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText}/>
=======
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
>>>>>>> ddd8ba651db3ac3610733b7198f4cd77dcf370a6
        );
    }, [filterText, resetPaginationToggle]);

    useEffect(() => {
        getClientes()
    }, [])

    return (
        <>
<<<<<<< HEAD
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
        <CrearCliente getClientes={getClientes}/>
    </>
    )
}

export default TablaClientes
=======
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
>>>>>>> ddd8ba651db3ac3610733b7198f4cd77dcf370a6
