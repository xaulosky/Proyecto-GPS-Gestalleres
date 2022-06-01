<<<<<<< HEAD
import { Autocomplete, FormControl, FormHelperText, Input, InputLabel, Stack, TextField, Container, InputAdornment  } from '@mui/material'
import React, { useEffect } from 'react'
=======
import { Box, Grid, TextField } from "@mui/material"
>>>>>>> 2384923d2f875fc920bdd487ae4766b6bf6e1485

const CrearCliente = () => {



    return (
<<<<<<< HEAD

        <>
        <Container maxWidth="lg">
        {/* form row */}
        <Stack spacing={2} direction={"row"}>
            <FormControl fullWidth>
                <InputLabel htmlFor="input-with-icon-adornment">Rut</InputLabel>
                <Input
                    id="input-with-icon-adornment"
                    startAdornment={<InputAdornment position="start">Rut</InputAdornment>}
                />
            </FormControl>
            <FormControl fullWidth>
                <InputLabel htmlFor="input-with-icon-adornment">Nombre</InputLabel>
                <Input
                    id="input-with-icon-adornment"
                    startAdornment={<InputAdornment position="start">Nombre</InputAdornment>}
                />
            </FormControl>
            <FormControl fullWidth>
                <InputLabel htmlFor="input-with-icon-adornment">Apellido</InputLabel>
                <Input
                    id="input-with-icon-adornment"
                    startAdornment={<InputAdornment position="start">Apellido</InputAdornment>}
                />
            </FormControl>
            <FormControl fullWidth>
                <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
                <Input
                    id="input-with-icon-adornment"
                    startAdornment={<InputAdornment position="start">Email</InputAdornment>}
                />
            </FormControl>
            <FormControl fullWidth>
                <InputLabel htmlFor="input-with-icon-adornment">Dirección</InputLabel>
                <Input
                    id="input-with-icon-adornment"
                    startAdornment={<InputAdornment position="start">Dirección</InputAdornment>}
                />
            </FormControl>
            <FormControl fullWidth>
                <InputLabel htmlFor="input-with-icon-adornment">Comuna</InputLabel>
                <Autocomplete
                    id="input-with-icon-adornment"
                    options={options}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <TextField {...params} label="Comuna" variant="outlined" />}
                />
            </FormControl>
            <FormControl fullWidth>
                <InputLabel htmlFor="input-with-icon-adornment">Estado</InputLabel>
                <Autocomplete
                    id="input-with-icon-adornment"
                    options={options}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <TextField {...params} label="Estado" variant="outlined" />}
                />
            </FormControl>
        </Stack>
        </Container>
        

        </>
=======
        <Box componet="form" >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        type={'text'}
                        label={'Rut'}
                        name={'rutC'}
                        margin={'normal'}
                        variant={'outlined'}
                    />
                    
                </Grid>
            </Grid>
        </Box>
>>>>>>> 2384923d2f875fc920bdd487ae4766b6bf6e1485
    )
}

export default CrearCliente