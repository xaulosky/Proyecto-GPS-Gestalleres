import {Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import axios from 'axios';
import { AccountCircle } from '@mui/icons-material';

const CrearEmpleado = () => {
  const[open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const[data,setData] = useState({
        
    rutEmpleado: "",
    nombreEmpleado: "",
    apellidoEmpleado: "",
    emailEmpleado: "",
    numeroTelefonoEmpleado: "",
    cRolE: "",
    cTaller: ""


})
const submit= (e) =>{
  axios.post(import.meta.env.VITE_APP_BACKEND_URL+'empleado.php',{
      
      rutEmpleado: data.rutEmpleado,
      nombreEmpleado: data.nombreEmpleado,
      apellidoEmpleado: data.apellidoEmpleado,
      emailEmpleado: data.emailEmpleado,
      numeroTelefonoEmpleado: data.numeroTelefonoEmpleado,
      cRolE: data.cRolE,
      cTaller: data.cTaller
  })
  .then(respuesta=>{
    setOpen(false)
      console.log(respuesta.data)
  })
}
function handle(e){
  const newdata={...data}
  newdata[e.target.id]= e.target.value
  setData(newdata)
  console.log(newdata)
}

    return (
        <>
        <button endIcon={<PersonAddAltIcon />} onClick={() => setOpen(true)}>Agregar Empleado </button >
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby='dialog-title'  
        >
            <DialogTitle id='dialog-title'>Agregar Empleado</DialogTitle>
            <DialogContent>
    
            <TextField
            fullWidth
            autoFocus
            margin="dense"
            id="rutEmpleado"
            label="Rut del Empleado"
            type="text"
            value={data.rutEmpleado} 
            onChange={(e)=>handle(e)}
          />
            <TextField
            fullWidth
            autoFocus
            id="nombreEmpleado"
            margin="dense"
            label="Nombre del Empleado"
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            variant="standard"
            type="text"
            value={data.nombreEmpleado} 
            onChange={(e)=>handle(e)}

            />
            <TextField
            fullWidth
            autoFocus
            id="apellidoEmpleado"
            label="Apellido del Empleado"
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            type="text"
            value={data.apellidoEmpleado} 
            onChange={(e)=>handle(e)}
            />
            <TextField
            fullWidth
            autoFocus
            id="emailEmpleado"
            margin="dense"
            type="text"
            label ="Email"
            value={data.emailEmpleado} 
            onChange={(e)=>handle(e)}
            />
          
            <TextField
            fullWidth
            autoFocus
            id="numeroTelefonoEmpleado"
            margin="dense"
            type="number"
            label ="Número de Teléfono"
            value={data.numeroTelefonoEmpleado}
            onChange={(e)=>handle(e)}
            />
            <TextField
            fullWidth
            autoFocus
            id="cRolE"
            margin="dense"
            type="text"
            label="Rol"
            value={data.cRolE} 
            onChange={(e)=>handle(e)}
            />
            <TextField
            fullWidth
            autoFocus
            id="cTaller"
            margin="dense"
            type="text"
            label="Taller"
            value={data.cTaller}
            onChange={(e)=>handle(e)}
            />
            
        
           </DialogContent>
           <DialogActions>
               <Button onClick={() => setOpen(false)}>Cerrar</Button>
               <Button autoFocus onClick = {() => submit()}>Crear</Button>
               </DialogActions>  

        </Dialog>
        </>
    )
}
export default CrearEmpleado
