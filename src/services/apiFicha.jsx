import { useState, useEffect } from 'react'
import axios from 'axios'

export const getFichas = async (cTaller) => {
    const response = await axios.get(
        import.meta.env.VITE_APP_BACKEND_URL + "ficha.php?cTaller=" + cTaller
    );
    return response.data
}

export const postFicha = async (data, idFicha) => {
    const response = await axios.post(
        import.meta.env.VITE_APP_BACKEND_URL + "ficha.php",
        data
    );

    return response.data
}

export const putFicha = async (data) => {
    const response = await axios.put(
        import.meta.env.VITE_APP_BACKEND_URL + "ficha.php",
        data
    );
    return response.data
}

export const deleteFicha = async (cFicha) => {
    const response = await axios.delete(
        import.meta.env.VITE_APP_BACKEND_URL + "ficha.php?cFicha=" + cFicha
    );
    return response.data
}

export const getUltimaFicha = async (cTaller) => {
    const response = await axios.get(
        import.meta.env.VITE_APP_BACKEND_URL + "ficha.php?Ultima=1&cTaller=" + cTaller
    );
    return response.data[response.data.length - 1]


    /* getFichas().then(response => {
        return response.length - 1
    }).catch(error => {
        console.log(error)
    }) */
}

export const getFichaById = async (cFicha, cTaller) => {
    const response = await axios.get(
        import.meta.env.VITE_APP_BACKEND_URL + "ficha.php?cFicha=" + cFicha + '&cTaller=' + cTaller
    )
    return response.data
}
