import React, { useState} from 'react'
import { Alert ,Autocomplete,InputLabel,FilledInput, OutlinedInput,
        InputAdornment,
        Button,Box ,IconButton, MenuItem, Modal,Stack ,
        Select,TextField, Typography, Grid, FormControl, 
        FormLabel, FormHelperText} from "@mui/material";
import axios from 'axios';
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

const CambioPass = ({row, obtenerUsuarios, handleClose}) => {
    const [open, setOpen]  = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClosePass = () => setOpen(false);  
    const[data,setData] = useState({
        cUsuario : row.cUsuario,
        nombreU: row.nombreU,
        clave: "",
        email: row.email,
        cRolU: row.cRolU,
    })

    const abrir =() =>{
        obtenerUsuarios();
        setData({
            cUsuario : row.cUsuario,
            nombreU: row.nombreU,
            clave: row.clave,
            email: row.email,
            cRolU: row.cRolU,
        });
        handleOpen();
      }
    const handle = (e) =>{
        const newdata={...data}
        newdata[e.target.name]= e.target.value
        setData(newdata)
        obtenerUsuarios();
        console.log(newdata)
    }
    const cambio = (e) =>{
        e.preventDefault()
        axios.put(import.meta.env.VITE_APP_BACKEND_URL+'usuario.php',{
            cUsuario: data.cUsuario,
            email: data.email ,
            clave: data.clave  ,
            cRolU: data.cRolU,
            nombreU: data.nombreU,
        })
        .then(respuesta=>{
            obtenerUsuarios();  
            handleClosePass();
            if(respuesta.data.msg == 'Contraseña cambiada'){
              swal("Usuario editado", {
                  icon: "success",
                  timer: 1000,
                  buttons: false,
              });
          }
          if(respuesta.data.msg == 'Datos insuficientes'){
              swal("No se puedo editar al usuario",{
                  icon:"error",
                  timer: 1000,
                  buttons: false,
              })
          }
        })
    }


    return (
      <div>
        
        <Button
                color = 'primary'
                onClick={abrir}
                title = 'Recuperar contraseña'
                size = 'small'
            >Recuperar contraseña</Button>
          <Modal
              open = {open}
              onClose = {handleClosePass}
              aria-labellebdy = "modal-modal-title"
              aria-describedby = "modal-modal-description"
          >
              
              <Box sx={style} >
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                      Ingrese nueva contraseña
                  </Typography>
                  <Box
                      component="form"
                      sx={{
                          '& .MuiTextField-root': { m: 2, width: '40ch' },
                      }}
                      noValidate
                      autoComplete="off"   
                  >           
                    <TextField 
                        id="clave" 
                        name = 'clave' 
                        type= "password"
                        label="Contraseña" 
                        variant="outlined" 
                        multiline
                        required
                        placeholder = "Contraseña"   
                        onChange={(e)=>handle(e)}     
                         />        
                    <Stack direction="row" spacing={1} justifyContent = 'flex-end' sx={{mx:3}}>
                    <Button  
                        variant ='contained'
                        onClick={cambio}
                        size = 'medium'
                    >
                        Aceptar
                    </Button>
                    <Button 
                        variant ='contained' 
                        onClick={handleClosePass}
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

export default CambioPass