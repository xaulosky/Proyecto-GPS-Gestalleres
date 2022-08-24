import { Grid } from '@mui/material'
import React from 'react'

const DashboardHome = () => {
  return (
    <Grid container height={"80vh"} sx={{ display: "flex", justifyContent: "center", mt: "50px" }}>
      <h1>Bienvenido al sistema de gestión de tu taller</h1>
    </Grid>
  )
}

export default DashboardHome