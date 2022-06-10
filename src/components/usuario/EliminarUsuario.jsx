import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import {
  Button,
  Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Slide,
  FormControl, FormLabel, FormGroup,
  FormHelperText, TextField, Grid, Divider,
  MenuItem, InputLabel, Select, Modal, Box, makeStyles, Typography
} from '@mui/material'

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
}

export default EliminarUsuario

