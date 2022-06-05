import { Button, Grid, TextField } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'

const AsistenciaScreen = () => {

  /* formulario state */
  const [form, setForm] = useState({
    nombre: '',
    rut: '',
    telefono: '',
    email: '',
    nombreTallere: '',
    mensaje: ''
  })

  /* onchangeForm */
  const onChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Container>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
        style={{ height: '100vh' }}
      >
        <h1>Formulario de Asistencia</h1>
        <form action="">
          <Grid
            container
            columnSpacing={2}
          >
            <Grid item md={6}  >
              <TextField
                label="Nombre"
                margin="normal"
                variant="outlined"
                fullWidth
                name="nombre"
                value={form.nombre}
                onChange={onChangeForm}
              />
            </Grid>
            <Grid item md={6}  >
              <TextField
                label="Rut"
                margin="normal"
                variant="outlined"
                fullWidth
                name="rut"
                value={form.rut}
                onChange={onChangeForm}
              />
            </Grid>
            <Grid item md={6}  >
              <TextField
                label="Telefono"
                margin="normal"
                variant="outlined"
                fullWidth
                name="telefono"
                value={form.telefono}
                onChange={onChangeForm}
              />
            </Grid>

            <Grid item md={6}  >
              <TextField
                label="Email"
                margin="normal"
                variant="outlined"
                fullWidth
                name="email"
                value={form.email}
                onChange={onChangeForm}
              />
            </Grid>
            <Grid item md={12}  >
              <TextField
                label="Nombre del Taller"
                margin="normal"
                variant="outlined"
                fullWidth
                name="nombreTallere"
                value={form.nombreTallere}
                onChange={onChangeForm}
              />
            </Grid>
            <Grid item md={12}  >
              <TextField
                label="Mensaje"
                margin="normal"
                variant="outlined"
                fullWidth
                name="nombreTallere"
                value={form.mensaje}
                onChange={onChangeForm}
                height="200px"
              />
            </Grid>


            <Grid item md={12}  >
              <Button
                variant='contained'
                color='primary'
                style={{ margin: '10px' }}
                type="submit"
                fullWidth
              >
                Enviar
              </Button>

            </Grid>



          </Grid>

        </form>

      </Grid>
    </Container>
  )
}

export default AsistenciaScreen