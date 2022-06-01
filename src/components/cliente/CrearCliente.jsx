import { Box, Grid, TextField } from "@mui/material"

const CrearCliente = () => {



    return (
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
    )
}

export default CrearCliente