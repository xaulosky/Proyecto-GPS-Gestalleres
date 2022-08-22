import { useState, useEffect } from 'react';
import axios from 'axios';
/* hook api Aseguradora */
export const useAseguradora = ({ data = null, action }) => {
    const [result, setResult] = useState();

    switch (action) {
        case 'GET':
            useEffect(() => {
                const get_aseguradoras = async () => {
                    const response = await axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'aseguradora.php');
                    setResult(response.data);
                }
                get_aseguradoras();
            }, [])
            break;
    }
    return { result };

}

