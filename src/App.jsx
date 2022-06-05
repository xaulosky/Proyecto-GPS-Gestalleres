import AppRouter from './routes/AppRouter';
import { AuthProvider } from './context/AuthContext';


const init = () => {
  return JSON.parse(localStorage.getItem('user') || { logged: false })
}

function App() {
  return (
    <AuthProvider>
      <AppRouter value={init} />
    </AuthProvider>
  )
}

export default App