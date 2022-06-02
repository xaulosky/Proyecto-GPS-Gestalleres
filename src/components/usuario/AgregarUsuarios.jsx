import React, { useState } from 'react'
import { Alert , Button,Box , MenuItem, Modal,Stack ,TextField, Typography} from "@mui/material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import axios from 'axios';

const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const currencies = [
    {
      value: '2',
      label: 'Secretaria',
    },
    {
      value: '3',
      label: 'Mecanico',
    },
  ];

const AgregarUsuarios = () => {
  
  const [open, setOpen]  = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
    const url = ""
    const[data,setData] = useState({
        
        nombreU: "",
        clave: "",
        email: "",
        cRolU: "",
        cTaller: ""
    })

    const submit= (e) =>{
        axios.post('http://localhost/apigps/api/usuario.php',{
            
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

    function handle(e){
        const newdata={...data}
        newdata[e.target.id]= e.target.value
        setData(newdata)
        console.log(newdata)
    }

    const [currency, setCurrency] = React.useState('EUR');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

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
                        '& > :not(style)': { m: 2, width: '40ch' },
                    }}
                    noValidat
                    autoComplete="off"
                    onSubmit={(e) => submit(e)}
                >
                    
                    
                    <TextField id="nombreU" type='text' value={data.nombreU} label="Nombre" variant="outlined" onChange={(e)=>handle(e)} />
                    <TextField id="clave" type= 'text' value={data.clave} label="Contraseña" variant="outlined" onChange={(e)=>handle(e)} />
                    <TextField id="email" type = 'email' value={data.email} label="Email" variant="outlined" onChange={(e)=>handle(e)} />
                    <TextField 
                        id="cRolU" 
                        type = 'number' 
                        value={data.cRolU} 
                        label="Rol" 
                        variant="outlined" 
                        onChange={(e)=>handle(e)}
                        
                    >
                        {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                        ))}
                    </TextField>
                    <TextField id="cTaller" type = 'number' value={data.cTaller} label="Taller" variant="outlined" onChange={(e)=>handle(e)} />
            
                    <Button  
                        variant ='contained'
                        type='submit'
                    >
                        Aceptar
                    </Button>
                </Box>
            </Box>
            
            
        </Modal>
    </div>
    
  )
}

export default AgregarUsuarios

//<TextField id="cUsuario" type='number' value={data.cUsuario} label="Id" variant="standard" onChange={(e)=>handle(e)} />