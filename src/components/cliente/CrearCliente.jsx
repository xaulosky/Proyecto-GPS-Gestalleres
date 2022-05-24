import { Autocomplete, FormControl, FormHelperText, Input, InputLabel, Stack, TextField } from '@mui/material'
import React, { useEffect } from 'react'

const CrearCliente = () => {
    
    const options = [
        "aa",
        "bb",
        "cc",
    ];
    return (

        <>
            <FormControl>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>

            <Stack spacing={2} width='250'>
                <Autocomplete
                    options={options}
                    renderInput={(params) => <TextField {...params} label="With auto-complete" margin="normal" />}
                />

            </Stack>

        </>
    )
}

export default CrearCliente