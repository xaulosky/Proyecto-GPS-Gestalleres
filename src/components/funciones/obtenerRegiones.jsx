import axios from "axios";

export const obtenerRegiones = async () => {
    const url = "https://apis.digital.gob.cl/dpa/regiones";
    const respuesta = await axios.get(url);
    return respuesta.data;
}