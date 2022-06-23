import React, { useState, useContext } from 'react'
import { Alert ,Autocomplete,InputLabel, 
        Button,Box , MenuItem, Modal,Stack ,
        Select,TextField, Typography, Grid, FormControl, 
        FormLabel, FormHelperText} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
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

//editar usuario
const EditarUsuario = ({row, obtenerUsuarios}) => {
    const [open, setOpen]  = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);  

      const[data,setData] = useState({
          cUsuario : row.cUsuario,
          nombreU: row.nombreU,
          clave: row.clave,
          email: row.email,
          cRolU: row.cRolU,
      })

      function abrir(){
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
      function handle(e){
            const newdata={...data}
            newdata[e.target.name]= e.target.value
            setData(newdata)
            obtenerUsuarios();
            console.log(newdata)
        }
  
      const submit= (e) =>{
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
              handleClose();
              console.log(respuesta.data)
              if(respuesta.data.msg == 'Actualizado'){
                console.log(respuesta.data)
                swal("Usuario editado", {
                    icon: "success",
                    timer: 1000,
                    buttons: false,
                });
            }
            if(respuesta.data.msg == 'Datos insuficientes'){
                console.log(respuesta.data)
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
                endIcon={<EditIcon />}
                title = 'Editar usuario'
                type = 'submit'
            />
          <Modal
              open = {open}
              onClose={handleClose}
              aria-labellebdy = "modal-modal-title"
              aria-describedby = "modal-modal-description"
          >
              
              <Box sx={style} >
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
                      <TextField 
                        id="nombreU" 
                        type='text' 
                        name = 'nombreU'
                        value={data.nombreU} 
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
                        value={data.clave} 
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
                        value={data.email} 
                        label="Email" 
                        fullWidth
                        required
                        variant="outlined" 
                        onChange={(e)=>handle(e)} />

                    <FormControl>
                    <InputLabel sx={{my:2,mx:2}}>Rol</InputLabel>
                    <Grid sx={{my:2,mx:2, width: 360}} >
                    <Select
                        id='cRolU'
                        value={data.cRolU}
                        name='cRolU'
                        fullWidth
                        onChange={handle}
                        label = 'Rol'
                    >  
                        {opciones.map(opcion => (
                        <MenuItem key={opcion.value} value={opcion.value}>
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

export default EditarUsuario