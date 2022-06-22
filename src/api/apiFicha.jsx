import { useState, useEffect } from 'react'
import axios from 'axios'

export const getFichas = async () => {
    const response = await axios.get(
        import.meta.env.VITE_APP_BACKEND_URL + "ficha.php"
    );
    return response.data
}

export const postFicha = async (data) => {
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

export const deleteFicha = async (data) => {
    const response = await axios.delete(
        import.meta.env.VITE_APP_BACKEND_URL + "ficha.php" + data
    );
    return response.data
}

export const getUltimaFicha = async () => {
    const response = await axios.get(
        import.meta.env.VITE_APP_BACKEND_URL + "ficha.php"
    );
    return response.data[response.data.length - 1]


    /* getFichas().then(response => {
        return response.length - 1
    }).catch(error => {
        console.log(error)
    }) */
}