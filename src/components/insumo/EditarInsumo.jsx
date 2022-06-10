import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const EditarInsumo = (row) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    return (
        <>
            <Button onClick={handleOpen}
                variant="contained"
                color="primary"
                type={'submit'}
                name={'actualizar'}
                endIcon={<InventoryIcon />}
            >
                Actualizar Insumo
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
                        ACTUALIZAR INSUMO
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextField fullWidth
                            id="standard-basic"
                            label="Nombre insumo"
                            margin="normal"
                            variant="outlined"
                            type={'text'}
                            name={'nombreInsumo'}
                            //onChange={(e) => handle(e)}
                        />
                        <TextField fullWidth
                            id="standard-basic"
                            label="Cantidad"
                            margin="normal"
                            variant="outlined"
                            type={'text'}
                            name={'cantidad'}
                            //onChange={(e) => handle(e)}
                        />
                        <TextField fullWidth
                            id="standard-basic"
                            label="Valor"
                            margin="normal"
                            variant="outlined"
                            type={'text'}
                            name={'costo'}
                            //onChange={(e) => handle(e)}
                        />
                        <Grid item xs={12} sm={12} style={{ height: '100px' }}>
                            <Button
                                onClick={submit}
                                variant="contained"
                                color="primary"
                                name={'actualizar'}

                            >
                                Actualizar
                            </Button>
                            <Button
                                onClick={handleClose}
                                variant="contained"
                                color="error"
                                name={'cancelar'}
                            >
                                Cancelar
                            </Button>
                        </Grid>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default EditarInsumo