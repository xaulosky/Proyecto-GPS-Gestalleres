import React, { useState, useEffect } from 'react'
import { obtenerRegiones } from '../funciones/obtenerRegiones'
import BuscarCliente from './BuscarCliente'
import CrearCliente from './CrearCliente'
import ListaCliente from './ListaCliente'
const ClienteScreen = () => {

    return (
      <div>
        <ListaCliente />
      </div>
    )

}

export default ClienteScreen