import { Box, Grid, TextField } from '@mui/material'
import React from 'react'

const CrearTrabajo = () => {
    return (
        <Box component="form" m={1} style={{maxWidth: "600px"}}>
            <Grid container spacing={3} direction = "column">
                <Grid item>
                    <TextField fullWidth
                        type="text"
                        label="Nombre del Trabajo"
                        name="nombreTrabajo"

                    />
                </Grid>
                <Grid item >
                    <TextField fullWidth
                        type="Multiline"
                        multiline
                        rows={4}
                        label="Descripción"
                        name="descripcionTrabajo"
                        variant="outlined"
                    />
                </Grid>
                <Grid item >
                    <TextField fullWidth
                        type="date"
                        label="Fecha Estimada"
                        name="fechaEstimada"
                        defaultValue="2022-05-31"


                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default CrearTrabajo