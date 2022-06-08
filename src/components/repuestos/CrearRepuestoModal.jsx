import axios from 'axios'
import React, { useState } from 'react'


const [data, setData] = useState({
    nombreRepuesto: '',
    cantidad: '',
    fechaSolicitud: '',
    fechaLlegada: '',
    estadoRepuesto: '',
    cTaller: ''
})

const submit = (e) => {
    axios.post('http://localhost:8080/apigps/api/repuesto.php',{
        nombreRepuesto: data.nombreRepuesto,
        cantidad: data.cantidad,
        fechaSolicitud: data.fechaSolicitud,
        fechaLlegada: data.fechaLlegada,
        estadoRepuesto: data.estadoRepuesto,
        cTaller: data.cTaller
    })
    .then(respuesta => {
        console.log(respuesta.data)
    })
}

const CrearRepuestoModal = () => {
    return (
        <>

        </>
    )
}



export default CrearRepuestoModal