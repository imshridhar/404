import React from "react";
import Header from "./Header"
import Footer from "./Footer"

function App() {
const appTitle ="My React props Demo";
const tagline ="Learning React one Prop at a time";
const copyright=`@${new Date().getFullYear()} My company. All rights reserved.`;

  return (
    <>
    <div style={{textAlign:"center" , minHeight:"20%"}}>
      <Header title={appTitle}/>
      <main style={{padding:"2rem"}}>
        <p>This content is inside the App componet</p>
      </main>
      <Footer tagline={tagline} copyright={copyright}/>
    </div>
    </>
  )
}

export default App
