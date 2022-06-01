import { Button, Grid } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'

const HomeScreen = () => {
  return (
    <Container  >
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
        style={{ height: '100vh', backgroundColor: '#f5f5f5' }}
      >
        <h1>Bienvenido a GES-Talleres</h1>
        <span>Nuestro software de gestión de talleres automotrices</span>
        <Grid>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              style={{ margin: '10px' }}
              onClick={() => {
                window.location.href = '/login'
              }}
            >
              Iniciar Sesión
            </Button>
            <Button
              variant='contained'
              color='secondary'
              style={{ margin: '10px' }}
              onClick={() => {
                window.location.href = '/asistencia'
              }}
            >
              Asistencia
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default HomeScreen