import { useState } from 'react'
import './App.css'

function App() {
  const [info, setInfo] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();

    



  }

  return (
    <form onSubmit={handleSubmit}>
      <button type='submit'>LoadInfo</button>
    </form>
  )


}

export default App
