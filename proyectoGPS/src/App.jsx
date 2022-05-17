import LoginScreen from './components/login/LoginScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cliente from './components/cliente/Cliente';
import { AuthProvider } from './context/AuthContex';
function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/clientes" element={<Cliente />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>


  )
}

export default App
