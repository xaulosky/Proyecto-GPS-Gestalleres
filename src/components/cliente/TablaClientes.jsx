import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component'
<<<<<<< HEAD
import { Filter } from '@mui/icons-material';
=======
>>>>>>> 87222311b0d8406cc7c0110227d77e8100c6cd30
import { TextField } from '@mui/material';

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
    
    const [clientes, setClientes] = useState([])

    const getClientes = async() => {
        await axios.get('http://localhost:8080/apigps/api/cliente.php')
            .then(res => {
                setClientes(res.data)
            })
    }

<<<<<<< HEAD
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
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText}/>
        );
    }, [filterText, resetPaginationToggle]);
=======
    /* filtrar clientes por rut */
    const [rut, setRut] = useState('')
    const [filtrarClientes, setFiltrarClientes] = useState([])

    const onChangeRut = (e) => {
        setRut(e.target.value)
        const clientesFiltrados = clientes.filter(cliente => cliente.rutC.includes(e.target.value))
        setFiltrarClientes(clientesFiltrados)
    }
>>>>>>> 87222311b0d8406cc7c0110227d77e8100c6cd30

    useEffect(() => {
        getClientes()
    }, [])

    return (
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
=======
        <>
            <TextField
                label="Buscar por Rut"
                margin="normal"
                variant="outlined"
                fullWidth
                name="search"
                value={rut}
                onChange={onChangeRut}
            />

            <DataTable
                title="Lista de clientes"
                columns={columns}
                data={
                    filtrarClientes.length > 0 ? filtrarClientes : clientes
                }
                direction="auto"
                fixedHeader
                fixedHeaderScrollHeight="300px"
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

>>>>>>> 87222311b0d8406cc7c0110227d77e8100c6cd30

    )
}

export default TablaClientes