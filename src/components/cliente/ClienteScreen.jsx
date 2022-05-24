import React, { useState, useEffect } from 'react'
import { obtenerRegiones } from '../funciones/obtenerRegiones'
import BuscarCliente from './BuscarCliente'
import CrearCliente from './CrearCliente'
import ListaCliente from './ListaCliente'
const ClienteScreen = () => {

  const [regiones, setRegiones] = useState([])

  useEffect(() => {
    obtenerRegiones().then(data => {
      setRegiones(data)
    })
  }, [])


  return (
    <div>
      ClienteScreen
      <BuscarCliente />
      <ListaCliente />
      {
        regiones.map(region => {
          return <div>{region.nombre}</div>
        }
        )
      }

      <div>
        <CrearCliente />
      </div>
    </div>
  )
}

export default ClienteScreen