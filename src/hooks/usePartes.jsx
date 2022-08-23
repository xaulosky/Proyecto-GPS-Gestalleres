import { useState, useEffect } from "react";
import axios from "axios";

export const usePartes = ({ action, data = null }) => {
    const [result, setResult] = useState();
    switch (action) {
        case "get":
            useEffect(() => {
                const getPartes = async () => {
                    const response = await axios.get(
                        import.meta.env.VITE_APP_BACKEND_URL + "partesvehiculo.php"
                    );
                    setResult(response.data);
                }
                getPartes();
            }, [])
            break;
        case "post":
            useEffect(() => {
                const postParte = async () => {
                    const response = await axios.post(
                        import.meta.env.BACKEND_URL + "partesvehiculo.php",
                        data
                    );
                    setResult(response.data);
                }
                postParte();
            }, [])
            break;
        case "put":
            useEffect(() => {
                const putParte = async () => {
                    const response = await axios.put(
                        import.meta.env.BACKEND_URL + "partesvehiculo.php",
                        data
                    );
                    setResult(response.data);
                }
                putParte();
            }, [])
            break;
        case "delete":
            useEffect(() => {
                const deleteParte = async () => {
                    const response = await axios.delete(
                        import.meta.env.BACKEND_URL + "partesvehiculo.php" + data
                    );
                    setResult(response.data);
                }
                deleteParte();
            }, [])
            break;
        default:
            break;
    }

    return { result };

}


