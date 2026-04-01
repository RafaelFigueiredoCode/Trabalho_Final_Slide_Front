import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <section id="center">
        <button onClick={() => setCount((count) => count + 1)}>
          ({count}) faz click
        </button>
      </section>
  )
}

export default App
