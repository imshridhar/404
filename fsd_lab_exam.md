# 🔥 FSD Lab Exam - All 8 Experiments

> **🧠 Memory Trick: FSD = JS basics (1-4) → React intro (5-6) → Backend (7-8)**

---

## Exp 1a: JavaScript Basics (alert + function)

**🧠 Remember: script tag → function → alert**

```html
<!DOCTYPE html>
<html>
<body>
    <script>
        console.log("This is FSD LAB");
        function sum(a, b) {
            return a + b;
        }
        alert("The sum is: " + sum(5, 10));
    </script>
</body>
</html>
```

## Exp 1b: Arrays (push, shift, for loop)

**🧠 Remember: push=last, shift=remove first, for loop with template literal**

```js
let cities = ["Vijayapur", "Bagalkot", "Hubli", "Dharwad", "Bangalore"]
console.log("Total number of cities", cities.length);
cities.push("Bijapur")
console.log("push element last in array", cities);
cities.shift()
console.log("removed first element", cities);
for(let i=0; i<cities.length; i++){
    console.log(`city name : ${cities[i]} , index number ${i}`);    
}
```

HTML file just links JS:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>exp1b</title>
    <script src="index1b.js"></script>
</head>
<body></body>
</html>
```

---

## Exp 2: String Operations (length, includes, replace, palindrome)

**🧠 Remember: 4 things → length, includes+substring, replace, palindrome(split-reverse-join)**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <script>
        let str=prompt("Enter a String:");
        console.log("length of the string:",str.length);

        let extractedWord="";
        if(str.includes("JavaScript")){
            extractedWord=str.substring(str.indexOf("JavaScript"),
            str.indexOf("JavaScript")+"JavaScript".length);
            console.log("Extracted Word",extractedWord);
        } else {
            console.log("JavaScript not found in the string");
        }

        let newStrig=str.replace("JavaScript","JS");
        console.log("Updated String :",newStrig);

        function isPalindrome(str){
            let cleanedStr=str.toLowerCase().replace(/[^a-z0-9]/g,"");
            let reversedStr=cleanedStr.split("").reverse().join("");
            return cleanedStr === reversedStr;
        }
        let palindromeInput=prompt("Enter a string to check palindrome : ");
        console.log("Is palendrome ?", isPalindrome(palindromeInput));
    </script>
</body>
</html>
```

> **🧠 Palindrome trick:** clean → split("") → reverse() → join("") → compare

---

## Exp 3: Objects (student object, methods, dynamic property)

**🧠 Remember: object with method → function adds property → for...in loop**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <script>
        let student = {
            name: "Shridhar",
            grade: 85,
            subjects: ["Math", "Science", "English"],
            displayInfo: function () {
                console.log("Student Name:", this.name);
                console.log("Grade:", this.grade);
                console.log("Subjects:", this.subjects.join(", "));
            }
        };

        function addGradeProperty(student) {
            const propertyName = student.grade >= 60 ? "passed" : "failed";
            student[propertyName] = true;
        }

        student.displayInfo();
        addGradeProperty(student);

        console.log("\nStudent Object Details:");
        for (const key in student) {
            if (student.hasOwnProperty(key)) {
                console.log(key + ": ", student[key]);
            }
        }
    </script>
</body>
</html>
```

---

## Exp 4: DOM Event Listeners (click, mouseover, keydown)

**🧠 Remember: 3 events → click(button), mouseover/mouseout(image), keydown(document)**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Event Listeners</title>
<style>
#myImage{
  width:300px;
  border:2px solid transparent;
  transition:border-color 0.3s;
}
</style>
</head>
<body>

<button id="clickMeButton">Click Me</button>
<br><br>
<img id="myImage" src="https://www.spiritmiracle.com/wp-content/uploads/2024/02/Hanuman-leaping-across-ocean.jpg" alt="HANUMAN">

<script>
document.getElementById("clickMeButton").addEventListener("click", function(){
  console.log("Button clicked!");
});

const image = document.getElementById("myImage");

image.addEventListener("mouseover", function(){
  image.style.borderColor = "blue";
});

image.addEventListener("mouseout", function(){
  image.style.borderColor = "transparent";
});

document.addEventListener("keydown", function(event){
  console.log("Key pressed:", event.key);
});
</script>
</body>
</html>
```

---

## Exp 5: React - Issue Tracker (map + list rendering)

**🧠 Remember: array of objects → .map() → key={id} → display title,desc,status**

> Setup: `npx create-vite exp5 --template react` → `npm install` → `npm run dev`

```jsx
// src/App.jsx
import React from "react";
const issues=[
  {id:1,title:"Login Issue",description:"Button not working",status:"open"},
  {id:2,title:"UI Bug",description:"Alignment Problem",status:"closed"},
];

function App() {
  return(
    <div>
      <h1>Issue Tracker</h1>
      {issues.map((issue)=>(
        <div key={issue.id}>
          <h3>{issue.title}</h3>
          <p>{issue.description}</p>
          <p>{issue.status}</p>
          <hr />
        </div>
      ))}
    </div>
  )
}
export default App
```

---

## Exp 6: React - Counter with useState + useEffect

**🧠 Remember: useState for count → 4 buttons (+,-,double,reset) → useEffect sets 5 after 5sec**

```jsx
// src/App.jsx
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
```

---

## Exp 7: Node.js Express REST API (Products CRUD)

**🧠 Remember: express + app.route() → GET,POST on /products → GET,PUT,DELETE on /products/:id**

> Setup: `npm init -y` → `npm install express`

```js
// index.js
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
```

> Run: `node index.js` → Test with browser/Postman

---

## Exp 8: Full Stack MERN (MongoDB + Express + React)

**🧠 Remember: Backend = express+mongoose+cors → 4 routes (GET,POST,PUT,DELETE) | Frontend = fetch + useState + useEffect**

### Backend (index.js)
> Setup: `npm init -y` → `npm install express mongoose cors`

```js
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
```

### Frontend (App.jsx)
```jsx
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
```

---

## 🧠 FSD Repeating Patterns (Easy Memory!)

| Pattern | Used In | Code to Remember |
|---------|---------|-----------------|
| `console.log()` | Exp 1,2,3,4 | Print output |
| `prompt()` | Exp 2 | Get user input |
| `getElementById` | Exp 4 | Select DOM element |
| `addEventListener` | Exp 4 | click, mouseover, keydown |
| `useState` | Exp 5,6,8 | `const [x, setX] = useState(0)` |
| `useEffect` | Exp 6,8 | `useEffect(()=>{}, [])` |
| `.map()` | Exp 5,8 | Loop array → JSX |
| `key={id}` | Exp 5,8 | Always in .map() |
| `express + routes` | Exp 7,8 | GET/POST/PUT/DELETE |
| `fetch()` | Exp 8 | Frontend calls backend |
| `mongoose.model` | Exp 8 | Schema for MongoDB |

> **🔑 THE GOLDEN PATTERN:** useState → useEffect(load,[]) → fetch → setData → .map() to display
> This pattern is used in **Exp 6, 8** and most React apps!
