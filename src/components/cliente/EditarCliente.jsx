import {
  Select,
  FormControl,
  MenuItem,
  Input,
  InputLabel,
  Stack,
  TextField,
  Container,
  Button,
  Box,
  Modal,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditarCliente = ({ getClientes, row }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [form, setForm] = useState({
    rutC: row.rutC,
    emailC: row.emailC,
    nombreC: row.nombreC,
    apellidoC: row.apellidoC,
    direccionC: row.direccionC,
    cComuna: row.cComuna,
    cCliente: row.cCliente,
  });
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    axios
      .put(import.meta.env.VITE_APP_BACKEND_URL + "cliente.php", form)
      .then((res) => {
        setForm({
          rutC: "",
          emailC: "",
          nombreC: "",
          apellidoC: "",
          direccionC: "",
          cComuna: "",
          cCliente: "",
        });
        getClientes();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [comunas, setComunas] = useState([]);
  const getComunas = async () => {
    await axios
      .get(import.meta.env.VITE_APP_BACKEND_URL + "comuna.php")
      .then((res) => {
        setComunas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    handleClose();
  };

  useEffect(() => {
    getComunas();
  }, []);
  return (
    <>
      <Button
        sx={{
          "& > :not(style)": {
            mx: 0.8,
            py: 1.5,
          },
        }}
        onClick={handleOpen}
        color="primary"
        type={"submit"}
        name={"crear"}
        size={"small"}
        endIcon={<EditIcon />}
      ></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Container maxWidth="lg">
          <Box component="form" onSubmit={onSubmit} sx={style}>
            <Stack spacing={2}>
              <FormControl fullWidth>
                <TextField
                  value={form.rutC}
                  label="Rut"
                  name="rutC"
                  onChange={onChange}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  value={form.emailC}
                  label="Email"
                  name="emailC"
                  onChange={onChange}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  value={form.nombreC}
                  label="Nombre"
                  name="nombreC"
                  onChange={onChange}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  value={form.apellidoC}
                  label="Apellido"
                  name="apellidoC"
                  onChange={onChange}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  value={form.direccionC}
                  label="Direccion"
                  name="direccionC"
                  onChange={onChange}
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Comuna</InputLabel>
                <Select
                  name="cComuna"
                  value={form.cComuna || ""}
                  defaultValue={form.cComuna}
                  onChange={onChange}
                >
                  {comunas.map((comunas) => (
                    <MenuItem key={comunas.cComuna} value={comunas.cComuna}>
                      {comunas.nombreC}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <Button variant="contained" color="primary" type="submit">
                  Editar
                </Button>
              </FormControl>
            </Stack>
          </Box>
        </Container>
      </Modal>
    </>
  );
};

export default EditarCliente;
