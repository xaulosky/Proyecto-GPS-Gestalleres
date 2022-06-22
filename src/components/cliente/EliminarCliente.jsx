import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const EliminarCliente = ({ getClientes, row }) => {
  /* delete cliente */
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteCliente = async (row) => {
    console.log(row.cCliente);
    await axios
      .delete(import.meta.env.VITE_APP_BACKEND_URL + "cliente.php", {
        data: {
          cCliente: row.cCliente,
        },
      })
      .then((res) => {
        handleClose();
        console.log(res);
        getClientes();
        if (res.data.msg === "Cliente eliminado") {
          swal("ELIMINADO", "Cliente eliminado correctamente", "success");
        } else {
          swal("ERROR", "No fue posible eliminar al cliente", "error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Button
        sx={{
          "& > :not(style)": {
            m: -0.05,
            py: 1.5,
          },
        }}
        color="error"
        size="small"
        onClick={handleOpen}
        endIcon={<DeleteIcon />}
        title="Eliminar Cliente"
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Eliminar cliente "}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Esta seguro de eliminar a{" "}
            <span style={{ color: "black" }}>{row.nombreC} </span> ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deleteCliente(row)} autoFocus>
            Aceptar
          </Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EliminarCliente;
