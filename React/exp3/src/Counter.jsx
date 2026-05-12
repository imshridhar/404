import { useState } from "react";
export default function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h1>{count}</h1>
      <button onClick={() =>setCount(Math.max(0, count - step))}>-</button>
      <button onClick={() =>setCount(count + step)}>+</button>
      <br /><br />
      <input type="number" value={step} onChange={(e) => setStep(+e.target.value)}/>
      <br /><br />
      <button onClick={() => setCount(0)}> Reset </button>
    </div>
  );
}