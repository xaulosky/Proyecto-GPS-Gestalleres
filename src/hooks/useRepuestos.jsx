import { useState, useEffect } from 'react';
import axios from 'axios';
export const useRepuestos = () => {
    const [repuestos, setRepuestos] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'repuesto.php?cTaller=' + cTaller)
            .then(res => {
                setRepuestos(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError(true);
                setLoading(false);
            })
    }, []);

    return { repuestos, error, loading };
}