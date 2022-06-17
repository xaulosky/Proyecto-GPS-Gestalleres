import { Box, Button, Grid, TextField } from '@mui/material'
import React from 'react'
import { Add } from '@mui/icons-material';


const CrearRepuesto = () => {
    return (
        <>
            <Box component="form">
                <Grid container spacing={2} alignItems={'center'} justifyContent={'center'}>
                    <Grid item xs={12} sm={3}>
                        <TextField required fullWidth id='standard-basic' label='Nombre Repuesto' margin='normal' variant='outlined' type={'text'} name={'nombreRepuesto'}
                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <TextField required fullWidth id='standard-basic' label="Cantidad" margin='normal' variant='outlined' type={'number'} name={'cantidad'} onChange={(event) =>
                            event.target.value < 0
                                ? (event.target.value = 0)
                                : event.target.value}
                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <TextField required fullWidth id='standard-basic' label='Fecha Solicitud' margin='normal' variant='outlined' type={'date'} name={'fechaSolicitud'}
                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <TextField fullWidth id='standard-basic' label="Fecha Llegada" margin='normal' variant='outlined' type={'date'} name={'fechaLlegada'}
                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <Button variant="contained" color="primary" type={'submit'} name={'addRepuesto'} startIcon={<Add />} style={{ height: '55px' }}>
                            Añadir Repuesto
                        </Button>
                    </Grid>

                    Hay que arreglar XDDDD
                </Grid>
            </Box>
        </>
    )
}

export default CrearRepuesto