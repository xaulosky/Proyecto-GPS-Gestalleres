import { useState, useEffect } from "react";
import axios from "axios";

export const usePartes = () => {
    const [partes, setPartes] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'partesvehiculo.php')
            .then(res => {
                setPartes(res.data);
                setLoading(false);
            }
            )
            .catch(err => {

                setError(true);
                setLoading(false);
            }
            )
    }, []);

    return { partes, error, loading };
}


