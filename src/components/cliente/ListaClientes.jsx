import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ListaClientes = () => {
    const [lista, setLista] = useState([])
    const obtenerPkmn = () => {
        const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
        axios.get(url).then(
            resultado => {
                setLista(resultado.data.results)
            }
        )
    }
    useEffect(() => {
      obtenerPkmn()
    }, [lista])
    
  return (
    <>ListaClientes</>
  )
}

export default ListaClientes