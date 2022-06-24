import React from 'react'

const nombreInsumoER = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]*$/;
const numeroER = /^[0-9]{1,11}$/;

const validarInsumo = (data) => {

    let contador = 0;
    let mensajeError = '', msg1 = '', msg2 = '', msg3 = '', msg4 = '', msg5 = '', msg6 = '',msg7='';

    if (data.nombreInsumo === '') {
        msg1 = 'El nombre del insumo es requerido, además debe tener entre 1 y 100 caracteres.'
        contador++;
    } else if (!nombreInsumoER.test(data.nombreInsumo)) {
        msg2 = 'El nombre del insumo solo permite letras, números, espacios y guiones.'
        contador++;
    }else if (data.nombreInsumo.length > 100 || data.nombreInsumo.length < 1) {
        msg3 = 'El nombre del insumo debe tener entre 1 y 100 caracteres.'
        contador++;
    }
    if (data.cantidad === '') {
        msg4 = 'La cantidad es requerida.'
        contador++;
    } else if (!numeroER.test(data.cantidad)) {

        msg5 = 'La cantidad debe tener entre 1 y 10 caracteres.'
        contador++;
    }
    if (data.costo === '') {
        msg6 = 'El costo es requerido.'
        contador++;
    } else if (!numeroER.test(data.costo)) {
        msg7 = 'El costo debe tener entre 1 y 10 caracteres.'
        contador++;
    }
    if (contador === 0) {
        return true;
    } else {
        if (msg1 !== '') {
            mensajeError = mensajeError + " 'ERROR 1: " + msg1 + "'"
        }
        if (msg2 !== '') {
            mensajeError = mensajeError + " 'ERROR 2: " + msg2 + "'"
        }
        if (msg3 !== '') {
            mensajeError = mensajeError + " 'ERROR 3: " + msg3 + "'"
        }
        if (msg4 !== '') {
            mensajeError = mensajeError + " 'ERROR 4: " + msg4 + "'"
        }
        if (msg5 !== '') {
            mensajeError = mensajeError + " 'ERROR 5: " + msg5 + "'"
        }
        if (msg6 !== '') {
            mensajeError = mensajeError + " 'ERROR 6: " + msg6 + "'"
        }
        if (msg7 !== '') {
            mensajeError = mensajeError + " 'ERROR 7: " + msg7 + "'"
        }
        swal({
            title: "Error",
            text: mensajeError,
            icon: "error",
            button: false,
        });
        setTimeout(() => {
            swal.close();
        }
            , 2000);

        msg1 = '', msg2 = '', msg3 = '', msg4 = '', msg5 = '', msg6 = '',
            contador = 0;
        return false;
    }

}

export default validarInsumo