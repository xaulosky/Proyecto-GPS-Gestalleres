import useAuth from './useAuth';
import { useState, useFfect } from 'react';
import axios from 'axios';


export const useInsumos = ({accion, dato}) => {
    const [insumos, setInsumos] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();

    useFfect(() => {

        setLoading(true);
        axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'insumo.php?cTaller=' + auth.cTaller
        )
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