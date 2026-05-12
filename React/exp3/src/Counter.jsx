import { useState } from "react";

export default function Counter(){
    const MIN=0;
    const START=0;

    const[count , setCount]=useState(START);
    const[step , setStep]=useState(1);

    const inc = ()=> setCount(c=>c+step);
    const dec = ()=> setCount(c=> Math.max(MIN ,c - step));
    const reset = ()=> setCount(START);

    return(
        <div style ={{textAlign:"center" , marginTop:50}}>

            <h1>{count}</h1>
            <button onClick={dec}>-</button>
            <button onClick={inc}>+</button>
            <br /><br />
            <input type="number" min="1" value={step} onChange={e=> setStep(+e.target.value)}/>
            <br /><br />
            <button onClick={reset}>Reset</button>
        </div>
    )
}