import React , { useState } from 'react'

import './App.css'

function App() {
  const [text, setText] = useState(" ");

  const handlechange=(event)=>{
    setText(event.target.value);
  }

  return (
    <>
    <div style={{padding:"20px"}}>
      <input type="text" placeholder='Type Something...' value={text} onChange={handlechange}/>
      <h1>{text}</h1>
    </div>
    </>
  )
}

export default App