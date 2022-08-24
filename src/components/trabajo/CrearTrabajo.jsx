import {Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import axios from 'axios';
import swal from 'sweetalert';

const opciones = [
  {
      value: 1,
      label: 'Activo',
  },
  {
      value: 2,
      label: 'Inactivo',
  },
  {
    value: 3,
    label: 'Finalizado'
  },
];
const CrearTrabajo = ({obtenerTrabajos}) => {
  const[open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const[data,setData] = useState({
        
    nombreTrabajo: "",
    descripcionTrabajo: "",
    fechaEstimadaT: "",
    fechaRealT: "",
    estadoT: "",
    costoT: "",
    horasT: "",
    cOrdenTrabajo: "",
    cTipoT: "",
    cEmpleado: ""


})
const submit= (e) =>{
  axios.post(import.meta.env.VITE_APP_BACKEND_URL+'trabajo.php',{
      
      nombreTrabajo: data.nombreTrabajo,
      descripcionTrabajo: data.descripcionTrabajo,
      fechaEstimadaT: data.fechaEstimadaT,
      fechaRealT: data.fechaRealT,
      estadoT: data.estadoT,
      costoT: data.costoT,
      horasT: data.horasT,
      cOrdenTrabajo: data.cOrdenTrabajo,
      cTipoT: data.cTipoT,
      cEmpleado: data.cEmpleado
  })
  .then(respuesta=>{
    obtenerTrabajos()
    setOpen(false)
      console.log(respuesta.data)
      if (respuesta.data.msg === 'Agregado Correctamente') {

        swal("CREADO!", "Trabajo creado correctamente", "success");
    } else {
        swal("ERROR", "Error al crear el trabajo", "error");
        console.log(respuesta.data.msg);
    }
    setTimeout(() => {
        swal.close()
    }, 3000);
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
        <Button variant="contained" endIcon={<PersonAddAltIcon />} onClick={() => setOpen(true)}>Crear Trabajo </Button >
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
            margin="dense"
            type="date"
            value={data.fechaEstimadaT} 
            onChange={(e)=>handle(e)}
            />
            <TextField
            fullWidth
            autoFocus
            id="fechaRealT"
            margin="dense"
            type="date"
            value={data.fechaRealT} 
            onChange={(e)=>handle(e)}
            />
            <Autocomplete
             id="estadoT"
             options={opciones}
             getOptionLabel={(option) => option.label}

             onChange={(e, value) => {
                setData({ ...data, estadoT: value.label})
                  }}
             renderInput={(params) => <TextField {...params} label="Estado" 
                 />}
                        
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