import { useState, useFfect } from 'react';

export const useInsumos = () => {
    const [insumos, setInsumos] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useFfect(() => {

        setLoading(true);
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'insumo.php')

            .then(res => {
                setInsumos(res.data);
                setLoading(false);
            }
            )
            .catch(err => {
                setError(true);
                setLoading(false);
            }
            )
    }, []);

    return { insumos, error, loading };
}