import { Card } from '@mui/material'
import React from 'react'
import ListaVehiculos from './ListaVehiculos'

const VehiculoScreen = () => {

    return (
        <>
            <h1>Lista Vehiculos</h1>
            <Card >
                <ListaVehiculos />

            </Card>
        </>
    )
}

export default VehiculoScreen
