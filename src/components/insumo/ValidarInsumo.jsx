const nombreInsumoER = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]{1,100}$/;
const numeroER = /^[0-9]{1,11}$/;


const Validar = ({data }) => {

    
    const nombreInsumoER = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]{1,100}$/;
    const numeroER = /^[0-9]{1,11}$/;

    const [Nombre, cambiarNombre] = useState({
        campo: '',
        valido: null,
    });
    const [Cantidad, cambiarCantidad] = useState({
        campo: '',
        valido: null,
    });
    const [Costo, cambiarCosto] = useState({
        campo: '',
        valido: null,
    });

    const onChangeNombre = (e) => {
        cambiarNombre({
            campo: e.target.value,
        })
    }

    const validarNombre = () => {
        if (!nombreInsumoER.test(Nombre.campo)) {
            cambiarNombre({
                campo: Nombre.campo,
                valido: true,
            })
        } else {
            cambiarNombre({
                campo: Nombre.campo,
                valido: false,
            })
        }
    }
}


export default Validar