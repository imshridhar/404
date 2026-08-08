import { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const load = () => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(setProducts);
  };

  useEffect(load, []);

  const add = () => {
    fetch("http://localhost:5000/products", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ name, price })
    }).then(load);
  };

  const del = (id) => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE"
    }).then(load);
  };

  const update = (id) => {
    const newName = prompt("New name?");
    const newPrice = prompt("New price?");
    
    fetch(`http://localhost:5000/products/${id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ name: newName, price: newPrice })
    }).then(load);
  };

  return (
    <div>
      <h2>Products</h2>

      {products.map(p => (
        <div key={p._id}>
          {p.name} - ₹{p.price}
          <button onClick={() => del(p._id)}>Delete</button>
          <button onClick={() => update(p._id)}>Update</button>
        </div>
      ))}

      <h3>Add</h3>
      <input placeholder="name" onChange={e => setName(e.target.value)} />
      <input placeholder="price" onChange={e => setPrice(e.target.value)} />
      <button onClick={add}>Add</button>
    </div>
  );
}