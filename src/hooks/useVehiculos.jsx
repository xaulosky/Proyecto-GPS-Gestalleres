import { useState, useEffect } from 'react';
import axios from 'axios';
export const useVehiculos = ({ data = null, action }) => {
    const [result, setResult] = useState();
    switch (action) {
        case 'get':
            useEffect(() => {
                const getVehiculos = async () => {
                    const response = await axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'vehiculo.php');
                    setResult(response.data);
                }
                getVehiculos();
            }, [])
            break;
        case 'post':
            useEffect(() => {
                const postVehiculo = async () => {
                    const response = await axios.post(import.meta.env.BACKEND_URL + 'vehiculos', data);
                    setResult(response.data);
                }
                postVehiculo();
            }, [])
            break;
        case 'put':
            useEffect(() => {
                const putVehiculo = async () => {
                    const response = await axios.put(import.meta.env.BACKEND_URL + 'vehiculos/', data);
                    setResult(response.data);
                }
                putVehiculo();
            }, [])
            break;
        case 'delete':
            useEffect(() => {

                const deleteVehiculo = async () => {
                    const response = await axios.delete(import.meta.env.BACKEND_URL + 'vehiculos/' + data);
                    setResult(response.data);
                }
                deleteVehiculo();
            }, [])
            break;
        default:

            break;
    }
    return { result };
}