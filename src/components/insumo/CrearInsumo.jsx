import { Box, Button, Grid, TextField } from '@mui/material'
import React from 'react'


const CrearInsumo = () => {
    return (
        <>
            <Box component="form" >
                <Grid container spacing={2} alignItems= {"center"} justifyContent ={'center'}>

                    <Grid item xs={12} sm={3}>
                        <TextField fullWidth
                            id="standard-basic"
                            label="Nombre insumo"
                            margin="normal"
                            variant="outlined"
                            type={'text'}
                            name={'nombreInsumo'}
                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <TextField fullWidth
                            id="standard-basic"
                            label="Cantidad"
                            margin="normal"
                            variant="outlined"
                            type={'text'}
                            name={'cantidad'}
                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <TextField fullWidth
                            id="standard-basic"
                            label="Valor"
                            margin="normal"
                            variant="outlined"
                            type={'text'}
                            name={'costo'}
                        />
                    </Grid>

                    <Grid item xs={12} sm={3} style = {{ height:'100px' }}>
                        <Button 
                            variant="contained"
                            color="primary"
                            type={'submit'}
                            name={'crear'}
                        >
                            Crear
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default CrearInsumo
