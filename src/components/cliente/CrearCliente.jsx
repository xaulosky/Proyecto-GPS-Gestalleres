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
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

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

const CrearCliente = ({ getClientes }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [form, setForm] = useState({
    rutC: "",
    emailC: "",
    nombreC: "",
    apellidoC: "",
    direccionC: "",
    cComuna: "",
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
      .post(import.meta.env.VITE_APP_BACKEND_URL + "cliente.php", form)
      .then((res) => {
        setForm({
          rutC: "",
          emailC: "",
          nombreC: "",
          apellidoC: "",
          direccionC: "",
          cComuna: "",
        });
        console.log(res);
        getClientes();
      })
      .catch((err) => {
        console.log(err);
      });
    handleClose();
  };

  const [comunas, setComunas] = useState([]);
  const getComunas = async () => {
    await axios
      .get(import.meta.env.VITE_APP_BACKEND_URL + "comuna.php")
      .then((res) => {
        setComunas(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getComunas();
  }, []);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        type={"submit"}
        name={"crear"}
        endIcon={<PersonAddAltIcon />}
      >
        Agregar Cliente
      </Button>
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
                  id="rutC"
                  value={form.rutC}
                  label="Rut"
                  name="rutC"
                  onChange={onChange}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  id="emailc"
                  value={form.emailC}
                  label="Email"
                  name="emailC"
                  onChange={onChange}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  id="nombreC"
                  value={form.nombreC}
                  label="Nombre"
                  name="nombreC"
                  onChange={onChange}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  id="apellidoC"
                  value={form.apellidoC}
                  label="Apellido"
                  name="apellidoC"
                  onChange={onChange}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  id="direccionC"
                  value={form.direccionC}
                  label="Direccion"
                  name="direccionC"
                  onChange={onChange}
                />
              </FormControl>
              <FormControl fullWidth>
                {/* select */}
                <InputLabel id="demo-simple-select-label">Comuna</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="cComuna"
                  value={form.cComuna}
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
                  Crear Cliente
                </Button>
              </FormControl>
            </Stack>
          </Box>
        </Container>
      </Modal>
    </>
  );
};

export default CrearCliente;
