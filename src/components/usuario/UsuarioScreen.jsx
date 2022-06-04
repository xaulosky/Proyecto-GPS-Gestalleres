import { Grid, Typography } from '@mui/material'
import React from 'react'
import ListaUsuarios from './ListaUsuarios'
import AgregarUsuarios from './AgregarUsuarios'

const UsuarioScreen = () => {
  return (
    <div>
      <Grid container>
        <Grid item  xs={12}>
          <Typography variant="h4">Usuarios</Typography>
        </Grid>
        <Grid item xs={12} align='right'>
          <AgregarUsuarios />
        </Grid>
        <Grid item xs={12}>
          <ListaUsuarios />
        </ Grid>
      </Grid>
    </div>
  )
}

export default UsuarioScreen