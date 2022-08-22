const nombreInsumoER = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]{1,100}$/;
const numeroER = /^[0-9]{1,11}$/;
const consecutivos = /( )\1{2}/;
const espacioIncial = /^[ ]+/;

const validar = (data) => {

    let contador = 0;
    let mensajeError = '', msg1 = '', msg2 = '', msg3 = '', msg4 = '', msg5 = '', msg6 = '', msg7 = '', msg8 = '', msg9 = '';

    if (data.nombreInsumo === '') {
        msg1 = 'El nombre del insumo es requerido.'
        contador++;
    } else if (!nombreInsumoER.test(data.nombreInsumo)) {
        msg2 = 'El nombre del insumo solo permite letras, números, espacios y guiones.'
        contador++;
    } else if (data.nombreInsumo.length > 100 || data.nombreInsumo.length < 1) {
        msg3 = 'El nombre del insumo debe tener entre 1 y 100 caracteres.'
        contador++;
    }

    if (espacioIncial.test(data.nombreInsumo)) {
        msg4 = 'El nombre del insumo no puede comenzar con un espacio en blanco.'
        contador++;
    }
    if (consecutivos.test(data.nombreInsumo)) {
        msg5 = 'El nombre del insumo no puede espacios consecutivos.'
        contador++;
    }

    if (data.cantidad === '') {
        msg6 = 'La cantidad es requerida.'
        contador++;
    } else if (!numeroER.test(data.cantidad)) {

        msg7 = 'La cantidad debe tener entre 1 y 11 cifras.'
        contador++;
    }


    if (data.costo === '') {
        msg8 = 'El precio es requerido.'
        contador++;
    } else if (!numeroER.test(data.costo)) {
        msg9 = 'El precio debe tener entre 1 y 11 cifras.'
        contador++;
    }

    if (contador === 0) {
        return true;
    } else {
        if (msg1 !== '') {
            mensajeError = mensajeError + "ERROR: " + msg1 + "\n\n"
        }
        if (msg2 !== '') {
            mensajeError = mensajeError + "ERROR: " + msg2 + "\n\n"
        }
        if (msg3 !== '') {
            mensajeError = mensajeError + "ERROR: " + msg3 + "\n\n"
        }
        if (msg4 !== '') {
            mensajeError = mensajeError + "ERROR: " + msg4 + "\n\n"
        }
        if (msg5 !== '') {
            mensajeError = mensajeError + "ERROR: " + msg5 + "\n\n"
        }
        if (msg6 !== '') {
            mensajeError = mensajeError + "ERROR: " + msg6 + "\n\n"
        }
        if (msg7 !== '') {
            mensajeError = mensajeError + "ERROR: " + msg7 + "\n"
        }
        if (msg8 !== '') {
            mensajeError = mensajeError + "ERROR: " + msg8 + "\n"
        }
        if (msg9 !== '') {
            mensajeError = mensajeError + "ERROR: " + msg9 + "\n"
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
            , 2500);

        msg1 = '', msg2 = '', msg3 = '', msg4 = '', msg5 = '', msg6 = '', msg7 = '', msg8 = '', msg9 = '',
            contador = 0;
        return false;
    }

}

export default validar; 