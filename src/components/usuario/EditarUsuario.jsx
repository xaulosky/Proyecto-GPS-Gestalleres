import React, { useState, useContext } from 'react'
import { Alert ,Autocomplete,InputLabel,FilledInput, OutlinedInput,
        InputAdornment,
        Button,Box ,IconButton, MenuItem, Modal,Stack ,
        Select,TextField, Typography, Grid, FormControl, 
        FormLabel, FormHelperText} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import swal from 'sweetalert';
import AuthContext from '../../context/AuthContext';
import CambioPass from './CambioPass';

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
        value: 1,
        label: 'Administrador',
      },
    {
      value: 2,
      label: 'Editor',
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
    const { auth } = useContext(AuthContext)

      const[data,setData] = useState({
          cUsuario : row.cUsuario,
          nombreU: row.nombreU,
          clave: row.clave,
          email: row.email,
          cRolU: row.cRolU,
      })


      const abrir =() =>{
        obtenerUsuarios();
        setData({
            cUsuario : row.cUsuario,
            nombreU: row.nombreU,
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
        function rolDisabled(){
            if(auth.cRolU == 3){
                return true
            }
        }
      const submit= (e) =>{
          e.preventDefault()
          axios.put(import.meta.env.VITE_APP_BACKEND_URL+'usuario.php',{
              
              cUsuario: data.cUsuario,
              email: data.email ,
              cRolU: data.cRolU,
              nombreU: data.nombreU,
          })
          .then(respuesta=>{
              obtenerUsuarios();             
              handleClose();
              if(respuesta.data.msg == 'Actualizado'){
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
    
      const admin = (row) =>{
        if(row.cRolU === 1){
            return true
        }
      }

    return (
      <div>
        
        <Button
                color = 'primary'
                onClick={abrir}
                endIcon={<EditIcon />}
                title = 'Editar usuario'
                type = 'submit'
                disabled = {rolDisabled()}
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
                        disabled = {admin(row)}
                    >  
                        {opciones.map(opcion => (
                            <MenuItem key={opcion.value} value={opcion.value} disabled = {admin(row)}>
                        {opcion.label}
                    </MenuItem>
                    ))}                
                    </Select>    
                    </Grid>
                    </FormControl>
                    <Stack direction="row" spacing={1}  sx={{my:-2,mx:2, width: 360}}>
                        <CambioPass 
                            row={row} 
                            obtenerUsuarios = {obtenerUsuarios} 
                            />
                    </Stack>
                    
                    <Stack direction="row" spacing={1} justifyContent = 'flex-end' sx={{mx:3, my:2}}>
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