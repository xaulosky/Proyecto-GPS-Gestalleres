import { Grid } from '@mui/material'
import React, {useContext} from 'react'
import ListaInsumo from './ListaInsumo'
import AuthContext from '../../context/AuthContext'


const InsumoScreen = () => {

  const { auth } = useContext(AuthContext)

  const idAuth = auth.cRolU;
  

  return (
    <>
      <ListaInsumo />
    </>
  )
}

export default InsumoScreen