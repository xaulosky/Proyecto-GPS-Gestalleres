import { useState, useEffect } from "react";
import axios from "axios";

export const useFichas = ({ action, data = null }) => {
    const [result, setResult] = useState();
    switch (action) {
        case "get":
            useEffect(() => {
                const getFichas = async () => {
                    const response = await axios.get(
                        import.meta.env.VITE_APP_BACKEND_URL + "ficha.php"
                    );
                    setResult(response.data);
                }
                getFichas();
            }, [])
            break;
        case "post":
            useEffect(() => {
                const postFicha = async () => {
                    const response = await axios.post(
                        import.meta.env.VITE_APP_BACKEND_URL + "ficha.php",
                        data
                    );
                    setResult(response.data);
                }
                postFicha();
            }, [])
            break;
        case "put":
            useEffect(() => {
                const putFicha = async () => {
                    const response = await axios.put(
                        import.meta.env.BACKEND_URL + "ficha.php",
                        data
                    );
                    setResult(response.data);
                }
                putFicha();
            }, [])
            break;
        case "delete":
            useEffect(() => {
                const deleteFicha = async () => {
                    const response = await axios.delete(
                        import.meta.env.BACKEND_URL + "ficha.php" + data
                    );
                    setResult(response.data);
                }
                deleteFicha();
            }, [])
            break;
        default:
            break;
    }

    return { result };

}