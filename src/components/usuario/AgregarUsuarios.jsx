import React, { useState } from 'react'
import { Alert ,Autocomplete, Button,Box , MenuItem, Modal,Stack ,Select,TextField, Typography, Grid} from "@mui/material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import axios from 'axios';

const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };
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

const AgregarUsuarios = () => {
  
  const [open, setOpen]  = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

    const[data,setData] = useState({
        
        nombreU: "",
        clave: "",
        email: "",
        cTaller: "",
        cRolU: "",
    })
    
        function handle(e){
            
            const newdata={...data}
            newdata[e.target.name]= e.target.value
            setData(newdata)
            console.log(newdata)
        }

    const submit= (e) =>{
        axios.post(import.meta.env.VITE_APP_BACKEND_URL+'usuario.php',{
            
            email: data.email ,
            clave: data.clave  ,
            cRolU: data.cRolU,
            cTaller: data.cTaller,
            nombreU: data.nombreU,
        })
        .then(respuesta=>{
            console.log(respuesta.data)
        })
    }

  return (
    <div>

        <Button
            onClick={ handleOpen}
            variant="outlined" 
            endIcon={<PersonAddAltIcon />}
        >
            Agregar
        </Button>
        
        <Modal
            open = {open}
            onClose={handleClose}
            aria-labellebdy = "modal-modal-title"
            aria-describedby = "modal-modal-description"
        >
            
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Datos de ingreso
                </Typography>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 2, width: '40ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={(e) => submit(e)}
                >
                    <div>
                    <TextField 
                        id="nombreU" 
                        type='text' 
                        name = 'nombreU'
                        value={data.nombreU} 
                        label="Nombre" 
                        variant="outlined" 
                        multiline
                        placeholder = "Nombre"
                        onChange={(e)=>handle(e)} />
                    <TextField 
                        id="clave" 
                        name = 'clave' 
                        type= 'text' 
                        value={data.clave} 
                        label="Contraseña" 
                        variant="outlined" 
                        multiline
                        placeholder = "Contraseña"
                        onChange={(e)=>handle(e)} />
                    </div>
                    <div>
                    <TextField 
                        id="email" 
                        name = 'email'
                        type = 'email' 
                        value={data.email} 
                        label="Email" 
                        fullWidth
                        variant="outlined" 
                        onChange={(e)=>handle(e)} />
                    </div>
                    <Grid sx={{mx:2}}>
                    <Select
                        id='cRolU'
                        value={data.cRolU}
                        name='cRolU'
                        onChange={handle}
                    >    
                        {opciones.map(opcion => (
                        <MenuItem key={opcion.value} value={opcion.value}>
                        {opcion.label}
                    </MenuItem>
                    ))}                
                    </Select>    
                    </Grid>
                          
                    <TextField 
                        id="cTaller"
                        name = 'cTaller'
                        type = 'number' 
                        value={data.cTaller} 
                        label="Taller" 
                        variant="outlined" 
                        onChange={(e)=>handle(e)} 
                    />
                    
                    
                    <Grid  sx={{mx:-3, my:1}} container justifyContent="flex-end">
                    <Button  
                        variant ='outlined'
                        type='submit'
                        size = 'medium'
            
                    >
                        Aceptar
                    </Button>
                    <Button 
                        variant ='outlined' 
                        onClick={handleClose}
                        color = 'error'
                        size = 'medium'
                        
                    >
                        Cancelar
                    </Button>
                    </Grid>
                    
                </Box>
            </Box>
            
            
        </Modal>
    </div>
    
  )
}

export default AgregarUsuarios
