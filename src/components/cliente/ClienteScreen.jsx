import React from 'react'
import BuscarCliente from './BuscarCliente'
import ListaClientes from './ListaClientes'

const ClienteScreen = () => {
    let texto = 'holi'
  return (
    <div>ClienteScreen
    {texto}
    <BuscarCliente/>
    <ListaClientes/>
    </div>
  )
}

export default ClienteScreen