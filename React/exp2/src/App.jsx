import React from "react";
import Header from "./Header"
import Footer from "./Footer"

function App() {
const appTitle ="My React props Demo";
const tagline ="Learning React one Prop at a time";
const copyright=`@2026 My company. All rights reserved.`;

  return (
    <>
    <div style={{textAlign:"center"}}>
      <Header title={appTitle}/>
    
        <p style={{padding:"2rem"}}>This content is inside the App componet</p>
        
      <Footer tagline={tagline} copyright={copyright}/>
    </div>
    </>
  )
}

export default App
