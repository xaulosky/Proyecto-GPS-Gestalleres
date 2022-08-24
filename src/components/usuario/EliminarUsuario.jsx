import React, { useEffect, useState, useContext } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import swal from 'sweetalert';
import AuthContext from '../../context/AuthContext';

<<<<<<< HEAD
const EliminarUsuario = ({ row }) => {

  function prueba(row) {

    eliminar(row)
    handleClose()
  }

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const eliminar = (row) => {
    console.log(row.cUsuario)
    axios.delete(import.meta.env.VITE_APP_BACKEND_URL + 'usuario.php?id=' + row.cUsuario)
      .then(respuesta => {
        console.log(respuesta)
      })

  }

  return (
    <div>

      <Button
        sx={{
          '& > :not(style)': {
            m: -0.05,
            py: 1.5
          },
        }}
        color='error'
        size="small"
        onClick={handleOpen}
        endIcon={<DeleteIcon />}
        title="Eliminar Usuario"
      />




      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{
          "Eliminar usuario "
        }</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>
              ¿Esta seguro de eliminar a {' '}
              <span style={{ color: 'black' }}>{row.nombreU} </span>{' '}
              ?
            </p>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => prueba(row)} autoFocus >
            Aceptar
          </Button>
          <Button onClick={handleClose}>
            Cancelar
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
=======
import {  Button, 
    Dialog, DialogActions, DialogContent, 
    DialogContentText, DialogTitle, Slide, 
    FormControl, FormLabel, FormGroup, 
    FormHelperText, TextField, Grid, Divider, 
    MenuItem, InputLabel, Select, Modal, Box, makeStyles, Typography } from '@mui/material'

const EliminarUsuario = ({row,obtenerUsuarios}) => {
  
    const { auth } = useContext(AuthContext)
    const eliminar = (row) =>{
        console.log(row.cUsuario)
        axios.delete(import.meta.env.VITE_APP_BACKEND_URL+'usuario.php?id='+row.cUsuario)
        .then(respuesta =>{
            console.log(respuesta)
            obtenerUsuarios();
          if(respuesta.data.msg == 'Eliminado'){
              console.log(respuesta.data)
              swal("Usuario eliminado", {
                icon: "success",
                timer: 1000,
                buttons: false,
              });
          }
          if(respuesta.data.msg == 'Datos insuficientes'){
              console.log(respuesta.data)
              swal("No se puedo eliminar al usuario",{
                icon:"error",
                timer: 1000,
                buttons: false,
              })
          }
        })
   
    }

    const alerta=(row)=>{
      swal({
        title: "Eliminar Usuario",
        text: "¿Esta seguro de eliminar a "+row.nombreU,
        icon: "warning",
        dangerMode:true,
        buttons:{
          confirm:{
            text: "Aceptar",
            value: true,
            visible: true,
            className: "",
            color: "#4962B3" ,
            closeModal: true,
          },
          cancel: {
            text: "Cancelar",
            value: null,
            visible: true,
            className: "",
            closeModal: true,
          }
        },
        
      })
      .then((willDelete) => {
        if (willDelete) {
          eliminar(row)
        }
      });
    }
    function rolDisabled(){
      if(auth.cRolU == 3){
          return true
      }
      if(row.cRolU == 1 && auth.cRolU != 1){
        return true
      }
  }   
 
    return (
      <div>
          <Button
                  color = 'error'
                  onClick= {()=>alerta(row)}
                  endIcon={<DeleteOutlineIcon />}
                  title = 'Eliminar Usuario'
                  disabled = {rolDisabled()}
              />       
      </div>
    );
>>>>>>> 02b20192149bff93656308b9db1f054e1c540c42
}

export default EliminarUsuario
