import { useState, useEffect } from 'react';
import axios from 'axios';
export const useVehiculos = ({ idCliente }) => {
    const [vehiculos, setVehiculos] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'vehiculo.php?idCliente=' + idCliente)
            .then(res => {
                setVehiculos(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError(true);
                setLoading(false);
            })
    }, []);

    return { vehiculos, error, loading };
}

