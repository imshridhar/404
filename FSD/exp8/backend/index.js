const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/shop");

const Product = mongoose.model("Product", {
  name: String,
  price: Number,
});

app.get("/products", async (req, res) => {
  const data = await Product.find();
  res.json(data);
});

app.post("/products", async (req, res) => {
  const p = new Product(req.body);
  await p.save();
  res.json(p);
});

app.put("/products/:id", async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.send("Updated");
});


app.delete("/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

app.listen(5000, () => console.log("Server running"));