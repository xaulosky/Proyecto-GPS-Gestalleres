import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from "@mui/material";
  import axios from "axios";
  import React, { useState, useContext } from "react";
  import AuthContext from "../../context/AuthContext";
  import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
  
  const RestaurarCliente = ({ getClientes, row }) => {
    /* delete cliente */
    const [open, setOpen] = useState(false);
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {auth} = useContext(AuthContext);
  
    const restoreCliente = async (row) => {
      console.log(row.cCliente);
      await axios
        .delete(import.meta.env.VITE_APP_BACKEND_URL + "cliente_eliminado.php", {
          data: {
            cCliente: row.cCliente,
          },
        })
        .then((res) => {
          handleClose();
          console.log(res);
          getClientes();
          if (res.data.msg === "Cliente restaurado") {
            swal("RESTAURADO", "Cliente restaurado correctamente", "success");
          } else {
            swal("ERROR", "No fue posible restaurar al cliente", "error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const restaurar=(row)=>{
        swal({
            title: "¿Estás seguro?",
            text: "Una vez restaurado, podrás verlo en la lista de clientes",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                restoreCliente(row);
            } else {
                swal("Cancelado", "El cliente no se restauró", "error");
            }
        });
    }
    const restringirBoton = () =>{
      if (auth.cRolU != 3) {
        return false;
      }else{
        return true;
      }
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
          color="primary"
          size="small"
          onClick={()=>restaurar(row)}
          endIcon={<SettingsBackupRestoreIcon />}
          title="Restaurar Cliente"
          disabled={restringirBoton()}
        />
      </div>
    );
  };
  
  export default RestaurarCliente;