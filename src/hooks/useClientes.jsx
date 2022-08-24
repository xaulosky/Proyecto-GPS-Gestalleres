import { useState, useEffect } from 'react';
import axios from 'axios';
export const useClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'cliente.php')

            .then(res => {
                setClientes(res.data);
                setLoading(false);
            }
            )
            .catch(err => {
                setError(true);
                setLoading(false);
            }
            )
    }, []);

    return { clientes, error, loading };
}