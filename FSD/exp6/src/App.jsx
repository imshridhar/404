import React,{ useState,useEffect } from "react";
export default function App() {
  const [count,setCount]=useState(0);

  useEffect(()=>{
    setTimeout(()=>setCount(5),5000);
  },[])

return(
  <div>
    <h3>{count}</h3>
    <button onClick={()=>setCount(count+1)}>+</button>
    <button onClick={()=>setCount(count-1)}>-</button>
    <button onClick={()=>setCount(count*2)}>Double</button>
    <button onClick={()=>setCount(0)}>reset</button>
  </div>
);
}