const express = require("express");
const app = express();

app.use(express.json());
app.use((req, res, next) => { console.log(req.method, req.url); next(); });

let products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Phone", price: 20000 }
];

app.get("/", (req, res) => res.send("Hello, Express!"));

app.route("/products")
  .get((req, res) => res.json(products))
  .post((req, res) => {
    const p = { id: products.length + 1, ...req.body };
    products.push(p);
    res.status(201).json(p);
  });

app.route("/products/:id")
  .get((req, res) => {
    const p = products.find(x => x.id == req.params.id);
    p ? res.json(p) : res.status(404).json({ message: "Not found" });
  })
  .put((req, res) => {
    const p = products.find(x => x.id == req.params.id);
    if (!p) return res.status(404).json({ message: "Not found" });
    Object.assign(p, req.body);
    res.json(p);
  })
  .delete((req, res) => {
    const i = products.findIndex(x => x.id == req.params.id);
    if (i < 0) return res.status(404).json({ message: "Not found" });
    const deleted = products.splice(i, 1)[0];
    res.json(deleted);
  });

app.listen(3000);