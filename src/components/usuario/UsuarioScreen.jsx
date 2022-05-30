import { Grid, Typography } from '@mui/material'
import React from 'react'
import ListaUsuarios from './ListaUsuarios'

const UsuarioScreen = () => {
  return (
    <div>
      <Grid container>
        <Typography variant="h4">Usuários</Typography>
        <Grid md={12}>
          <ListaUsuarios />
        </ Grid>
      </Grid>
    </div>
  )
}

export default UsuarioScreen