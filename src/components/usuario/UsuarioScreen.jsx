import { Grid, Typography } from '@mui/material'
import React from 'react'
import ListaUsuarios from './ListaUsuarios'

const UsuarioScreen = () => {
  return (
    <div>
      <Grid container>
        <Typography variant="h4" align = 'center'>Usuarios</Typography>
        <Grid xs={12}>
          <ListaUsuarios />
        </ Grid>
      </Grid>
    </div>
  )
}

export default UsuarioScreen