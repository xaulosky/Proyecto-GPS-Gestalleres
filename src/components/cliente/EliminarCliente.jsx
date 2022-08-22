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

  const eliminar=(row)=>{
    swal({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este registro",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteCliente(row);
      } else {
        swal("Cancelado", "El cliente no se eliminó", "error");
      }
    });
  }
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
        onClick={()=>eliminar(row)}
        endIcon={<DeleteIcon />}
        title="Eliminar Cliente"
      />
    </div>
  );
};

export default EliminarCliente;
