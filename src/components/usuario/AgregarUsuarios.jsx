import React, { useState,useContext } from 'react'
import { Alert ,Autocomplete,InputLabel, 
        Button,Box , MenuItem, Modal,Stack ,
        Select,TextField, Typography, Grid, FormControl,useFormControl,
        FormLabel, FormHelperText} from "@mui/material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import swal from 'sweetalert';


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
      label: 'Editor',
    },
    {  
      value: 3,
      label: 'Mecanico',
    },
  ];

const AgregarUsuarios = ({obtenerUsuarios}) => {
  
  const [open, setOpen]  = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { auth } = useContext(AuthContext)

    const[data,setData] = useState({
        nombreU: "",
        clave: "",
        email: "",
        cTaller: auth.cTaller,
        cRolU: "",
    })
    
    const submit= (e) =>{
        e.preventDefault();
        axios.post(import.meta.env.VITE_APP_BACKEND_URL+'usuario.php',{
            
            email: data.email ,
            clave: data.clave  ,
            cRolU: data.cRolU,
            cTaller: data.cTaller,
            nombreU:data.nombreU,
            
        })
        .then(respuesta=>{
            obtenerUsuarios();
            handleClose();

            if(respuesta.data.msg == 'Agregado'){
                console.log(respuesta.data)
                swal("Usuario agregado", {
                    icon: "success",
                    timer: 1000,
                    buttons: false,
                  });
            }
            if(respuesta.data.msg == 'Datos insuficientes'){
                console.log(respuesta.data)
                swal("No se puedo agregar al usuario",{
                    icon:"error",
                    timer: 1000,
                    buttons: false,
                  })
            }
        })
    }

    function rolDisabled(){
        if(auth.cRolU == 3){
            return true
        }
    }

    function editorRol(){
        if(auth.cRolU == 2){
            return true
        }
    }
    
    function abrir(){
        setData({
            nombreU: "",
            clave: "",
            email: "",
            cTaller: auth.cTaller,
            cRolU: 3,
        });
        handleOpen();
      }
    function handle(e){
        const newdata={...data}
        newdata[e.target.name]= e.target.value;
        console.log(newdata);
        setData(newdata);
    }


  return (
    <div>
       
        <Button
            onClick={abrir}
            variant="contained" 
            endIcon={<PersonAddAltIcon fontSize='small'/>}
            size = 'medium'
            type = 'submit'
            disabled = {rolDisabled()}
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
                    onSubmit={(e) => submit(e)}
                >
                    
                    <TextField 
                        id="nombreU" 
                        type='text' 
                        name = 'nombreU'
                        label="Nombre" 
                        variant="outlined" 
                        multiline
                        required 
                        placeholder = "Nombre"
                        onChange={(e)=>handle(e)} />
                    <TextField 
                        id="clave" 
                        name = 'clave' 
                        type= 'text' 
                        label="Contraseña" 
                        variant="outlined" 
                        multiline
                        required
                        placeholder = "Contraseña"
                        onChange={(e)=>handle(e)} />
                    <TextField 
                        id="email" 
                        name = 'email'
                        type = 'email' 
                        label="Email" 
                        fullWidth
                        required
                        variant="outlined" 
                        onChange={(e)=>handle(e)} />
                    
                    <FormControl>
                    <InputLabel sx={{my:2,mx:2}} >Rol</InputLabel> 
                    <Grid sx={{my:2,mx:2, width: 360}} >
                    <Select
                        id='cRolU'
                        name='cRolU'
                        type='number'
                        fullWidth
                        onChange={handle}
                        label = 'Rol'
                        required
                        disabled = {editorRol()}
                        defaultValue = {3}
                    >  
                        {opciones.map(opcion => (  
                                <MenuItem key={opcion.value} value={opcion.value} disabled = {editorRol()} >
                                    {opcion.label}
                                </MenuItem>
                    ))}                
                    </Select>    
                    </Grid>
                    </FormControl>
                    
                    <Stack direction="row" spacing={1} justifyContent = 'flex-end' sx={{mx:3}}>
                    <Button  
                        variant ='contained'
                        type='submit'
                        size = 'medium'
                    >
                        Aceptar
                    </Button>
                    <Button 
                        variant ='contained' 
                        onClick={handleClose}
                        color = 'error'
                        size = 'medium'
                    >
                        Cancelar
                    </Button>
                    </Stack >
                    
                </Box>
            </Box>
            
            
        </Modal>
    </div>
    
  )
}

export default AgregarUsuarios


