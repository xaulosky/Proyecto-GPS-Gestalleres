import { useState } from 'react'
import TopNavBar from './ui/TopNavBar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <TopNavBar />
  )
}

export default App
