import { Autocomplete, Box, Button, Checkbox, Chip, FormControlLabel, Grid, IconButton, Stack, TextField } from '@mui/material'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { clearRUT, validarRUT } from 'validar-rut'
import AuthContext from '../../context/AuthContext';

import VisibilityIcon from '@mui/icons-material/Visibility';
import { render } from 'react-dom';

export default function FichaScreen() {

  /* trae al usuario loggeado */
  const { auth } = useContext(AuthContext);

  const [clientes, setClientes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);

  const [observaciones, setObservaciones] = useState('');

  const [partesVehiculo, setPartesVehiculo] = useState([]);
  const [partesVehiculoSeleccionado, setPartesVehiculoSeleccionado] = useState([]);


  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);

  const [ficha, setFicha] = useState({
    fechaIngresoFicha: new Date().toISOString().substring(0, 10),
    cTaller: auth.cTaller,
    cUsuario: auth.cUsuario,
    cVehiculo: '',
    cEntrega: '',
    kilometraje: '',
  });

  const [cliente, setCliente] = useState({
    cCliente: '',
    nombreC: "",
    apellidoC: "",
    rutC: '',
    emailC: '',
  })

  const [vehiculo, setVehiculo] = useState({
    cVehiculo: '',
    patenteV: "",
    modeloV: "",
    colorV: "",
    estadoRegistroTecnicaV: "",
    montoAseguradora: "",
    cAseguradora: "",
    cTipoCarroceria: "",
    cCliente: "",
  })

  const validateRUT = (rut) => {
    return validarRUT(rut);
  }

  const handleChangeCliente = (event) => {
    setCliente({ ...cliente, [event.target.name]: event.target.value });
  }

  const handleChangeVehiculo = (event) => {
    setVehiculo({ ...vehiculo, [event.target.name]: event.target.value });
  }

  const handleChangeFicha = (event) => {
    setFicha({ ...ficha, [event.target.name]: event.target.value });
  }

  const handleChangeObservaciones = (event) => {
    setObservaciones(event.target.value);
  }
  /* obtener vehiculos del cliente seleccionado */
  const getVehiculos = async () => {
    const response = await axios.get(import.meta.env.VITE_APP_BACKEND_URL + "vehiculo.php?cCliente=" + clienteSeleccionado.cCliente);
    setVehiculos(response.data);
  }


  /* incia obteniendo los clientes y partes vehiculos desde la bbdd */
  useEffect(() => {
    axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'cliente.php')
      .then(res => {
        setClientes(res.data);
      })
      .catch(err => console.log(err));

    axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'partesvehiculo.php')
      .then(res => {
        setPartesVehiculo(res.data);
        console.log(res.data)
      })
      .catch(err => console.log(err));


  }, [])
  /* setea vehiculos por cliente seleccionado */
  useEffect(() => {
    if (clienteSeleccionado) {
      getVehiculos();
    } else {
      setVehiculos([]);
      setVehiculo({ ...vehiculo, cVehiculo: '', patenteV: '', modeloV: '', colorV: '', estadoRegistroTecnicaV: '', montoAseguradora: '', cAseguradora: '', cTipoCarroceria: '', cCliente: '' });
    }
  }, [clienteSeleccionado])
  /* selecciona vehiculo */
  useEffect(() => {
    if (vehiculoSeleccionado) {
      setVehiculo({ ...vehiculo, cVehiculo: vehiculoSeleccionado.cVehiculo });
    } else {
      setVehiculos([]);
      setVehiculo({ ...vehiculo, cVehiculo: '', patenteV: '', modeloV: '', colorV: '', estadoRegistroTecnicaV: '', montoAseguradora: '', cAseguradora: '', cTipoCarroceria: '', cCliente: '' });
      setVehiculoSeleccionado(null);
    }
  }, [vehiculoSeleccionado])

  return (

    <Grid container spacing={2}>
      {/* cliente */}
      <Grid item xs={6}>
        <h1>Crear ficha de ingreso </h1>
      </Grid>
      <Grid item xs={6} justifyContent="end" display={"flex"}>
        <NavLink to="/fichas">
          <Button variant="contained" color="primary">
            <IconButton >
              <VisibilityIcon style={{ color: "white" }} />
            </IconButton>
            Ver Fichas
          </Button>
        </NavLink>
      </Grid>
      <Grid item md={6}>
        <Box component={'form'}>
          <h4>Cliente</h4>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Autocomplete
                value={clienteSeleccionado}
                options={clientes}
                getOptionLabel={option => option.nombreC + ' ' + option.apellidoC + ' | ' + option.rutC}
                onChange={(event, value) => {
                  if (value) {
                    setClienteSeleccionado(null);
                    setCliente({ ...cliente, nombreC: value.nombreC, apellidoC: value.apellidoC, rutC: value.rutC, cCliente: value.cCliente, emailC: value.emailC });
                    setVehiculoSeleccionado(null);
                    setClienteSeleccionado(value);
                  } else {
                    setCliente({ ...cliente, nombreC: '', apellidoC: '', rutC: '', cCliente: '', emailC: '' })
                    setClienteSeleccionado(null);
                    setVehiculoSeleccionado(null);
                  }
                }}
                renderInput={(params) => <TextField {...params} label="Selecciona Cliente" variant="outlined" />}
              />

            </Grid>
            <Grid item md={6}>
              <TextField
                label="Nombre"
                value={cliente.nombreC}
                onChange={handleChangeCliente}
                fullWidth
                name='nombreC'
                data
                disabled={clienteSeleccionado ? true : false}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                label="Apellido"
                value={cliente.apellidoC}
                fullWidth
                onChange={handleChangeCliente}
                name='apellidoC'
                disabled={clienteSeleccionado ? true : false}

              />
            </Grid>
            <Grid item md={6}>
              <TextField
                label="Rut"
                value={cliente.rutC}
                fullWidth
                onChange={handleChangeCliente}
                error={cliente.rutC == '' ? false : !validateRUT(cliente.rutC)}
                name='rutC'
                required
                disabled={clienteSeleccionado ? true : false}

              />
            </Grid>
            <Grid item md={6}>
              <TextField
                label="Email"
                value={cliente.emailC}
                fullWidth
                onChange={handleChangeCliente}
                type='email'
                name='emailC'
                required
                disabled={clienteSeleccionado ? true : false}
              />
            </Grid>
            <Grid item md={12}>
              <Button
                fullWidth
                type='submit'
                disabled={clienteSeleccionado ? true : false}
                value="Guardar"
                variant="contained"
                color="primary"
              >
                Agregar Cliente
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* vehiculo */}
      <Grid item md={6}>
        <Box component={'form'}>
          <h4>Vehiculo</h4>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Autocomplete
                value={vehiculoSeleccionado}
                options={vehiculos}
                getOptionLabel={option => option.patenteV + ' | ' + option.modeloV}
                onChange={(event, value) => {
                  if (value) {
                    setVehiculo({ ...vehiculo, patenteV: value.patenteV, modeloV: value.modeloV, cVehiculo: value.cVehiculo, cCliente: value.cCliente, cTipoCarroceria: value.cTipoCarroceria, estadoRegistroTecnicaV: value.estadoRegistroTecnicaV, montoAseguradora: value.montoAseguradora, cAseguradora: value.cAseguradora, colorV: value.colorV })
                    setVehiculoSeleccionado(value);
                  } else {
                    setVehiculo({ ...vehiculo, patenteV: '', modeloV: '', cVehiculo: '', cCliente: '', cTipoCarroceria: '', estadoRegistroTecnicaV: '', montoAseguradora: '', cAseguradora: '', colorV: '' })
                    setVehiculoSeleccionado(null);
                  }
                }}
                renderInput={(params) => <TextField {...params} label="Selecciona Vehículo " variant="outlined" />}
              />

            </Grid>
            <Grid item md={6} >
              <TextField
                label="Patente"
                value={vehiculo.patenteV}
                fullWidth
                onChange={handleChangeVehiculo}
                type='email'
                name='rutC'
                required
                disabled={vehiculoSeleccionado ? true : false}

              />
            </Grid>
            <Grid item md={6} >
              <TextField
                type={'text'}
                label="Modelo"
                name="modeloV"
                variant="outlined"
                fullWidth
                onChange={handleChangeVehiculo}
                value={vehiculo.modeloV}
                disabled={vehiculoSeleccionado ? true : false}

              />
            </Grid>
            <Grid item md={6} >
              <TextField
                type={'text'}
                label="Color"
                name="colorV"
                variant="outlined"
                fullWidth
                onChange={handleChangeVehiculo}
                value={vehiculo.colorV}
                disabled={vehiculoSeleccionado ? true : false}

              />
            </Grid>
            <Grid item md={6} >
              <TextField
                type={'text'}
                label="Aseguradora"
                name="cAseguradora"
                variant="outlined"
                fullWidth
                onChange={handleChangeVehiculo}
                value={vehiculo.cAseguradora}
                disabled={vehiculoSeleccionado ? true : false}

              />
            </Grid>
            <Grid item md={12}>
              <Button
                fullWidth
                type='submit'
                disabled={vehiculoSeleccionado ? true : false}
                value="Guardar"
                variant="contained"
                color="primary"
              >
                Agregar Vehículo
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* kilometraje */}
      <Grid item md={6}>
        <h4>Kilometraje</h4>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <TextField
              label="Kilometraje"
              value={ficha.kilometraje}
              fullWidth
              onChange={handleChangeFicha}
              type='number'
              name='kilometraje'
              required
            />

          </Grid>
        </Grid>
      </Grid>
      {/* fehca ingreso */}
      <Grid item md={6}>
        <h4>Fecha Ingreso</h4>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <TextField
              label="Fecha Ingreso"
              value={ficha.fechaIngresoFicha}
              fullWidth
              onChange={handleChangeFicha}
              type='date'
              name='fechaIngresoFicha'
              required
            />
          </Grid>
        </Grid>
      </Grid>

      {/* partes vehiculo */}
      <Grid container spacing={2} sx={{ m: 2 }}>
        <Grid item md={12}>
          <h2>Partes Dañadas</h2>
        </Grid>
        <Grid item md={12}>
          <Grid container spacing={2}>
            {/* selecciona partes del vehiculo dañadas */}
            <Grid item md={12}>
              {/* autocomplete multilpe partes vehiculos seleccionados */}
              <Autocomplete
                multiple={true}
                value={partesVehiculoSeleccionado}
                options={partesVehiculo}
                getOptionLabel={option => option.nombrePV}
                onChange={(event, value) => {
                  if (value) {
                    setPartesVehiculoSeleccionado(value);
                  } else {
                    setPartesVehiculoSeleccionado([]);
                  }
                }
                }
                renderInput={(params) => <TextField {...params} label="Selecciona Partes del Vehículo " variant="outlined" />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Area de texto observaciones */}
      <Grid item md={12}>
        <h4>Observaciones</h4>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <TextField
              label="Observaciones"
              value={observaciones}
              fullWidth
              onChange={handleChangeObservaciones}
              type='text'
              name='observaciones'
              rows={4}
              multiline
            />
          </Grid>
        </Grid>
      </Grid>

    </Grid>
  )
}

/* 
{
  partesVehiculo.map(parte => (
    <Grid item md={3}>
      <FormControlLabel
        name={parte.nombrePV}
        value={parte.cParte}
        control={<Checkbox />}
        label={parte.nombrePV}
      />
    </Grid>
  ))
} */