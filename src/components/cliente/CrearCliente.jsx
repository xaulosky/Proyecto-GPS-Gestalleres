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
    Box
  } from "@mui/material";
  import axios from "axios";
  import React, { useEffect, useState } from "react";
  
  const CrearCliente = ({getClientes}) => {
      const [form, setForm] = useState({
          rutC: "",
          emailC: "",
          nombreC: "",
          apellidoC: "",
          direccionC: "",
          estadoC: "",
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
              .post(import.meta.env.VITE_APP_BACKEND_URL+"cliente.php", form)
              .then((res) => {
                setForm({
                  rutC: "",
                  emailC: "",
                  nombreC: "",
                  apellidoC: "",
                  direccionC: "",
                  estadoC: "",
                  cComuna: "",
              });
                  console.log(res);
                  getClientes();
                  
              })
              .catch((err) => {
                  console.log(err);
              });
      };
      
      const [comunas, setComunas] = useState([]);
      const getComunas = async () => {
          await axios.get(import.meta.env.VITE_APP_BACKEND_URL+"comuna.php")
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
        <Container maxWidth="lg">
          <Box component="form" onSubmit={onSubmit}>
            <Stack spacing={2} direction={"row"}>
              <FormControl fullWidth>
                <TextField id="rutC" value={form.rutC} label="Rut" name="rutC" onChange={onChange}/>
              </FormControl>
              <FormControl fullWidth>
                <TextField id="emailc" value={form.emailC} label="Email" name="emailC" onChange={onChange}/>
              </FormControl>
              <FormControl fullWidth>
                <TextField id="nombreC" value={form.nombreC} label="Nombre" name="nombreC" onChange={onChange}/>
              </FormControl>
              <FormControl fullWidth>
                <TextField id="apellidoC" value={form.apellidoC} label="Apellido" name="apellidoC" onChange={onChange}/>
              </FormControl>
              <FormControl fullWidth>
                <TextField id="direccionC" value={form.direccionC} label="Direccion" name="direccionC" onChange={onChange}/>
              </FormControl>
              <FormControl fullWidth>
                {/* select */}
                <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="estadoC"
                  value={form.estadoC}
                  defaultValue={form.estadoC}
                  onChange={onChange}
                >
                  <MenuItem value={1}>Activo</MenuItem>
                  <MenuItem value={2}>Inactivo</MenuItem>
                </Select>
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
                    <MenuItem key={comunas.cComuna} value={comunas.cComuna}>{comunas.nombreC}</MenuItem>
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
      </>
    );
  };
  
  export default CrearCliente;
