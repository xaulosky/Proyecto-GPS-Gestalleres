import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Filter } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AuthContext from "../../context/AuthContext";
import RestaurarCliente from "./RestaurarCliente";

const paginationComponentOptions = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos",
};
const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <div>
    <TextField
      id="search"
      type="text"
      placeholder="Filtrar por rut"
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

const TablaClientesdes = ({getClientesd}) => {
  const columns = [
    {
      name: "Rut",
      selector: (row) => row.rutC,
    },
    {
      name: "Email",
      selector: (row) => row.emailC,
    },
    {
      name: "Nombre",
      selector: (row) => row.nombreC,
    },
    {
      name: "Apellido",
      selector: (row) => row.apellidoC,
    },
    {
      name: "Dirección",
      selector: (row) => row.direccionC,
    },
    {
      name: "Comuna",
      selector: (row) => row.nombreCo,
      sortable: false,
    },
    /* columna boton */
    {
      name: "Acciones",
      cell: (row) => (
        <Stack direction={"row"}>
          <RestaurarCliente getClientes={getClientes} row={row} />
        </Stack>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "10%",
      center: true,
      right: true,
    },
  ];

  const [clientes, setClientes] = useState([]);
  const { auth } = useContext(AuthContext);

  const getClientes = async () => {
    await axios
      .get(import.meta.env.VITE_APP_BACKEND_URL + "cliente_eliminado.php?cTaller=" + auth.cTaller)
      .then((res) => {
        setClientes(res.data);
        getClientesd();
        getClientes();
      });
  };

  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = clientes.filter(
    (item) =>
      item.rutC &&
      item.rutC.toLowerCase().includes(filterText.toLowerCase())
  );
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
        getClientes();
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  useEffect(() => {
    getClientes();
  }, []);

  return (
    <>
      <DataTable
        title="Lista de clientes eliminados"
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
        noDataComponent="No hay clientes registrados"
      />
    </>
  );
};

export default TablaClientesdes;