import LoginScreen from './components/login/LoginScreen';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Hola</h1>} />
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
