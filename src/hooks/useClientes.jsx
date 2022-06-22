import { useState, useEffect } from 'react';
import axios from 'axios';
/* hook api clientes */
export const useClientes = ({ data = null, action }) => {
    const [result, setResult] = useState();

    switch (action) {
        case 'get':
            useEffect(() => {
                const getClientes = async () => {
                    const response = await axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'cliente.php');
                    setResult(response.data);
                }
                getClientes();
            }, [])
            break;
        case 'post':
            useEffect(() => {
                const postCliente = async () => {
                    const response = await axios.post(import.meta.env.BACKEND_URL + 'clientes', data);
                    setResult(response.data);

                }
                postCliente();
            }, [])
            break;
        case 'put':
            useEffect(() => {
                const putCliente = async () => {
                    const response = await axios.put(import.meta.env.BACKEND_URL + 'clientes/', data);
                    setResult(response.data);
                }
                putCliente();
            }, [])
            break;
        case 'delete':
            useEffect(() => {
                const deleteCliente = async () => {
                    const response = await axios.delete(import.meta.env.BACKEND_URL + 'clientes/' + data);
                    setResult(response.data);
                }
                deleteCliente();
            }, [])
            break;
        default:
            break;
    }
    return { result };

}

