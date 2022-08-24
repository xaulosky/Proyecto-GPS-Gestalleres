import { useState, useEffect } from 'react'
import axios from 'axios'

export const getPartesv = async () => {
    const response = await axios.get(
        import.meta.env.VITE_APP_BACKEND_URL + "partesvehiculo.php"
    );
    return response.data
}

