import { Grid, Typography } from '@mui/material'
import React from 'react'
import ListaUsuarios from './ListaUsuarios'
import AgregarUsuarios from './AgregarUsuarios'

const UsuarioScreen = () => {
  return (
    <div>
      <Grid container>
        <Grid xs={12}>
        <Typography variant="h4">Usuarios</Typography>
        </Grid>
        <Grid xs={12} align = 'right'>
          <AgregarUsuarios/>
        </Grid>
        <Grid xs={12}>
          <ListaUsuarios />
        </ Grid>
      </Grid>
    </div>
  )
}

export default UsuarioScreen