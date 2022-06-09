import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext, useState } from 'react';
import axios from 'axios';
import { Alert } from '@mui/material';
import AuthContext from '../../context/AuthContext';



function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://gestarlleres.cl">
        gestalleres.cl
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function LoginScreen() {


  const { setAuth } = useContext(AuthContext);

  const [values, setValues] = useState({
    email: '',
    clave: '',
  });

  const [error, setError] = useState(false);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(import.meta.env.VITE_APP_BACKEND_URL + 'login.php', {
      email: values.email,
      clave: values.clave
    })
      .then(res => {
        console.log(res.data)
        if (res.data.msg) {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 3000);
        } else {
          setAuth({
            email: res.data.email,
            cUsuario: res.data.cUsuario,
            nombreU: res.data.nombreU,
            logged: true
          })
          /* guardar en localStorage */
          localStorage.setItem('auth', JSON.stringify({
            email: res.data.email,
            cUsuario: res.data.cUsuario,
            nombreU: res.data.nombreU,
            logged: true
          }));
        }
      })
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar Sesión
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {
                error ?
                  <Alert severity="error">
                    Usuario o contraseña incorrectos
                  </Alert>
                  :
                  null
              }
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange('email')}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="clave"
                label="Contraseña"
                type="password"
                id="clave"
                autoComplete="current-password"
                onChange={handleChange('clave')}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordarme"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar Sesión
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Recuperar Contraseña
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}