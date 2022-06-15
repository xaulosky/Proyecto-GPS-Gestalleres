import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

const ListaFichas = () => {

    const columns = [
        {
            name: 'Fecha',
            selector: 'fechaIngresoFicha',
            sortable: true
        }
    ]

    const [fichas, setFichas] = useState([])


    useEffect(() => {
       axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'ficha.php')
            .then(res => {
                setFichas(res.data)
            })
    }, [])

    return (
        <>
            <DataTable
                title="Lista de Fichas"
                data={fichas}
                columns={columns}
                pagination={true}
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 15]}
                paginationComponentOptions={{
                    rowsPerPageText: 'Filas por página:',
                    rangeSeparatorText: 'de',
                    selectAllRowsItem: true,
                    selectAllRowsItemText: 'Todas',
                    selectAllRowsItemTooltip: 'Todas',
                    firstPageTooltip: 'Primera página',
                    previousPageTooltip: 'Página anterior',
                    nextPageTooltip: 'Página siguiente',
                    lastPageTooltip: 'Última página',
                    labelDisplayedRows: '{from}-{to} de {count}',
                    labelRowsPerPage: 'Filas por página'
                }}
            />


        </>
    )
}

export default ListaFichas