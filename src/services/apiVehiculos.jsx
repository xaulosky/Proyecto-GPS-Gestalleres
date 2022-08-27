import { useState, useEffect } from 'react'
import axios from 'axios'

export const getVehiculos = async (cTaller) => {
    const response = await axios.get(
        import.meta.env.VITE_APP_BACKEND_URL + "ficha.php?Vehiculos=1&cTaller=" + cTaller
    );
    return response.data
}
export const getVehiculoById = async (id) => {
    const response = await axios.get(
        import.meta.env.VITE_APP_BACKEND_URL + "vehiculo.php?cVehiculo=" + id
    );
    return response.data
}