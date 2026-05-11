const express = require("express");
const app = express();

app.use(express.json());

let products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Phone", price: 20000 }
];

app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  products.push(req.body);
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  res.json(products[req.params.id - 1]);
});

app.put("/products/:id", (req, res) => {
  products[req.params.id - 1] = req.body;
  res.json(products);
});

app.delete("/products/:id", (req, res) => {
  products.splice(req.params.id - 1, 1);
  res.json(products);
});

app.listen(3000);