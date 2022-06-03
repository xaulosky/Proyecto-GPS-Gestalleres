import {Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'


const CrearTrabajo = () => {
    const[open, setOpen] = useState(false)

    return (
        <>
        <button onClick={() => setOpen(true)}>Crear Trabajo</button>
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
          />
            <TextField
            fullWidth
            autoFocus
            margin="dense"
            type="Multiline"
            multiline
            rows={4}
            label="Descripción"
            name="descripcionTrabajo"
            variant="outlined"

            />
            <TextField
            fullWidth
            autoFocus
            type="date"
            label="Fecha Estimada"
            name="fechaEstimada"
            defaultValue="2022-05-31"
            />
            <TextField
            fullWidth
            autoFocus
            margin="dense"
            type="date"
            label="Fecha Real"
            name="fechaReal"
            defaultValue="2022-05-31"
            />
          
            <TextField
            fullWidth
            autoFocus
            id="standard-adornment-amount"
            margin="dense"
            type="number"
            label ="Costo"
            name="costo"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
            <TextField
            fullWidth
            autoFocus
            margin="dense"
            type="number"
            label="Horas"
            name="horas"
            defaultValue="0"
            />
            <TextField
            fullWidth
            autoFocus
            margin="dense"
            type="number"
            label="Orden de Trabajo"
            name="cOrdenTrabajo"
            defaultValue="0"
            />
            <TextField
            fullWidth
            autoFocus
            margin="dense"
            type="number"
            label="Tipo de Trabajo"
            name="cTipoT"
            defaultValue="0"
            />
              <TextField
            fullWidth
            autoFocus
            margin="dense"
            type="text"
            label="Estado"
            name="tipoEstado"
            />  
            
        

           </DialogContent>
           <DialogActions>
               <Button onClick={() => setOpen(False)}>Cerrar</Button>
               <Button autoFocus onClick = {() => setOpen (False)}>Crear</Button>
               </DialogActions>  

        </Dialog>
        </>
    )
}
export default CrearTrabajo
