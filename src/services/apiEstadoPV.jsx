import { useState, useEffect } from 'react'
import axios from 'axios'

export const getEstadosPV = async (cFicha) => {
    const response = await axios.get(
        import.meta.env.VITE_APP_BACKEND_URL + "estadoPV.php?cFicha=" + cFicha
    );
    return response.data
}
export const postEstadosPV = async (data, ultimaFicha) => {
    const response = await axios.post(
        import.meta.env.VITE_APP_BACKEND_URL + `estadoPV.php?ultima=${ultimaFicha}`, data
    );

    return response.data
}