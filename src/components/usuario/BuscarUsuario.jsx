import React from 'react'
import { Alert ,Autocomplete,InputLabel, 
  Button,Box , MenuItem, Modal,Stack ,
  Select,TextField, Typography, Grid, FormControl,useFormControl,
  FormLabel, FormHelperText} from "@mui/material"
const opciones = [
  {
    value: 2,
    label: 'Secretaria',
  },
  {  
    value: 3,
    label: 'Mecanico',
  },
];

const BuscarUsuario = () => {
  return (
    <div>
      <FormControl>
                    <InputLabel sx={{my:2,mx:2}}>Rol</InputLabel>
                    <Grid sx={{my:2,mx:2, width: 360}} >
                    <Select
                        id='cRolU'
                        name='cRolU'
                        type='number'
                        fullWidth
                        
                        label = 'Rol'
                        required
                    >  
                        {opciones.map(opcion => (
                        <MenuItem key={opcion.value} value={opcion.value}>
                        {opcion.label}
                    </MenuItem>
                    ))}                
                    </Select>    
                    </Grid>
                    </FormControl>
    </div>
  )
}

export default BuscarUsuario