import swal from "sweetalert";

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    consecutivos: /( )\1{2}/
}

const ValidarCliente = (data) =>{
    if (!expresiones.nombre.test(data.nombreC) || !expresiones.nombre.test(data.apellidoC) || !expresiones.correo.test(data.emailC) || expresiones.consecutivos.test(data.nombreC) || expresiones.consecutivos.test(data.apellidoC) || expresiones.consecutivos.test(data.emailC) || expresiones.consecutivos.test(data.direccionC)) {
        swal({
            title: "Error",
            text: "Uno o mas campos son invalidos",
            icon: "error",
            button: false,
        });
        console.log("ta mal");
        return false;
    }else {
        return true;
    }
}

export default ValidarCliente;