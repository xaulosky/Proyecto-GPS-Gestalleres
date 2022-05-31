import { Autocomplete, FormControl, FormHelperText, Input, InputLabel, Stack, TextField, Container, InputAdornment  } from '@mui/material'
import React, { useEffect } from 'react'

const CrearCliente = () => {
    
    const options = [
        "aa",
        "bb",
        "cc",
    ];
    return (

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
    )
}

export default CrearCliente