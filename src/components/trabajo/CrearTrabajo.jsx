import {Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import axios from 'axios';

const CrearTrabajo = () => {
  const[open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const[data,setData] = useState({
        
    nombreTrabajo: "",
    descripcionTrabajo: "",
    fechaEstimadaT: "",
    fechaRealT: "",
    costoT: "",
    horasT: "",
    cOrdenTrabajo: "",
    cTipoT: "",
    cEmpleado: "",
    cTipoE: ""


})
const submit= (e) =>{
  axios.post(import.meta.env.VITE_APP_BACKEND_URL+'trabajo.php',{
      
      nombreTrabajo: data.nombreTrabajo,
      descripcionTrabajo: data.descripcionTrabajo,
      fechaEstimadaT: data.fechaEstimadaT,
      fechaRealT: data.fechaRealT,
      costoT: data.costoT,
      horasT: data.horasT,
      cOrdenTrabajo: data.cOrdenTrabajo,
      cTipoT: data.cTipoT,
      cEmpleado: data.cEmpleado,
      cTipoE: data.cTipoE
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
        <button endIcon={<PersonAddAltIcon />} onClick={() => setOpen(true)}>Crear Trabajo </button >
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby='dialog-title'  
        >
            <DialogTitle id='dialog-title'>Crear Trabajo</DialogTitle>
            <DialogContent>
    
            <TextField
            fullWidth
            autoFocus
            margin="dense"
            id="nombreTrabajo"
            label="Nombre del Trabajo"
            type="text"
            value={data.nombreTrabajo} 
            onChange={(e)=>handle(e)}
          />
            <TextField
            fullWidth
            autoFocus
            id="descripcionTrabajo"
            margin="dense"
            type="Multiline"
            multiline
            rows={4}
            label="Descripción"
            variant="outlined"
            value={data.descripcionTrabajo} 
            onChange={(e)=>handle(e)}

            />
            <TextField
            fullWidth
            autoFocus
            id="fechaEstimadaT"
            type="date"
            defaultValue="2022-05-31"
            value={data.fechaEstimadaT} 
            onChange={(e)=>handle(e)}
            />
            <TextField
            fullWidth
            autoFocus
            id="fechaRealT"
            margin="dense"
            type="date"
            defaultValue="2022-05-31"
            value={data.fechaRealT} 
            onChange={(e)=>handle(e)}
            />
          
            <TextField
            fullWidth
            autoFocus
            id="costoT"
            margin="dense"
            type="number"
            label ="Costo"
            InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>}}
            value={data.costoT} 
            onChange={(e)=>handle(e)}
            />
            <TextField
            fullWidth
            autoFocus
            id="horasT"
            margin="dense"
            type="number"
            label="Horas"
            defaultValue="0"
            value={data.horasT} 
            onChange={(e)=>handle(e)}
            />
            <TextField
            fullWidth
            autoFocus
            id="cOrdenTrabajo"
            margin="dense"
            type="number"
            label="Orden de Trabajo"
            defaultValue="0"
            value={data.cOrdenTrabajo} 
            onChange={(e)=>handle(e)}
            />
            <TextField
            fullWidth
            autoFocus
            id="cTipoT"
            margin="dense"
            type="number"
            label="Tipo de Trabajo"
            defaultValue="0"
            value={data.cTipoT} 
            onChange={(e)=>handle(e)}
            />
            <TextField
            fullWidth
            autoFocus
            id="cEmpleado"
            margin="dense"
            type="number"
            label="Empleado"
            defaultValue="0"
            value={data.cEmpleado}
            onChange={(e)=>handle(e)}
            />
              <TextField
            fullWidth
            autoFocus
            id="cTipoE"
            margin="dense"
            type="text"
            label="Estado"
            value={data.cTipoE} 
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
export default CrearTrabajo
