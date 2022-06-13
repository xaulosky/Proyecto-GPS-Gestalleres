import React from 'react'

const EliminarInsumo = ({ raw }) => {

    function EI(row) {
        eliminar(row)
        handleClose()
    }

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const eliminar = (row) => {
        console.log(row.cInsumo)
        axios.delete(import.meta.env.VITE_APP_BACKEND_URL + 'insumo.php?id=' + row.cInsumo)
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
        title="Eliminar Insumo"
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{
          "Eliminar Insumo "
        }</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>
              ¿Esta seguro de eliminar a {' '}
              <span style={{ color: 'black' }}>{row.nombreInsumo} </span>{' '}
              ?
            </p>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => EI(row)} autoFocus >
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

export default EliminarInsumo