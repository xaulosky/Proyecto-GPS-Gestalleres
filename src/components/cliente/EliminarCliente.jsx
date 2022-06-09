import React from 'react'

const EliminarCliente = () => {
  /* delete cliente */
  const [clientes, setClientes] = useState([])

  const getClientes = async () => {
    await axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'cliente.php')
      .then(res => {
        setClientes(res.data)
      }
      )
  }

  const deleteCliente = async (id) => {
    await axios.delete(import.meta.env.VITE_APP_BACKEND_URL + 'cliente.php?id=' + id)
      .then(res => {
        console.log(res);
        getClientes();
      }
      )
      .catch(err => {
        console.log(err);
      }
      )
  }

  useEffect(() => {
    getClientes();
  }, [])

  return (
    <div>EliminarCliente</div>
  )
}

export default EliminarCliente