# 🎯 FSD & React Lab Exam - Quick Study Guide

> **Exam: Monday** | Focus: Practical Code Writing | Keep it simple, get it right ✅

---

## 📋 Table of Contents

1. [React Basics](#1-react-basics)
2. [Components & Props](#2-components--props)
3. [State & Hooks](#3-state--hooks)
4. [Forms & Events](#4-forms--events)
5. [React Router](#5-react-router)
6. [API Calls (fetch/axios)](#6-api-calls)
7. [useEffect & Lifecycle](#7-useeffect--lifecycle)
8. [useContext (Global State)](#8-usecontext)
9. [Node.js + Express Backend](#9-nodejs--express)
10. [MongoDB + Mongoose CRUD](#10-mongodb--mongoose)
11. [Full Stack App Example](#11-full-stack-example)
12. [Common Lab Questions](#12-common-lab-questions)

---

## 1. React Basics

### Create React App (Terminal)
```bash
npx create-react-app my-app
cd my-app
npm start
```

### Basic App.js Structure
```jsx
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <p>Welcome to React</p>
    </div>
  );
}

export default App;
```

> [!TIP]
> Every React file must return **ONE parent element**. Wrap in `<div>` or `<>...</>` (fragment).

---

## 2. Components & Props

### Function Component
```jsx
// Greeting.js
function Greeting(props) {
  return <h2>Hello, {props.name}!</h2>;
}
export default Greeting;
```

### Using Component with Props
```jsx
// App.js
import Greeting from './Greeting';

function App() {
  return (
    <div>
      <Greeting name="Shridhar" />
      <Greeting name="React" />
    </div>
  );
}
export default App;
```

### Props with Destructuring (Cleaner)
```jsx
function StudentCard({ name, roll, dept }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{name}</h3>
      <p>Roll: {roll}</p>
      <p>Dept: {dept}</p>
    </div>
  );
}
```

---

## 3. State & Hooks

### useState - Counter Example
```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
export default Counter;
```

### useState - Toggle Example
```jsx
function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <h2>{isOn ? 'ON' : 'OFF'}</h2>
      <button onClick={() => setIsOn(!isOn)}>Toggle</button>
    </div>
  );
}
```

> [!IMPORTANT]
> **useState pattern:** `const [value, setValue] = useState(initialValue);`
> Never modify state directly! Always use the setter function.

---

## 4. Forms & Events

### Controlled Form (Most Common in Exams)
```jsx
import React, { useState } from 'react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert(`Name: ${formData.name}, Email: ${formData.email}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registration Form</h2>
      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={formData.name}
        onChange={handleChange}
      /><br/><br/>
      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleChange}
      /><br/><br/>
      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={formData.password}
        onChange={handleChange}
      /><br/><br/>
      <button type="submit">Register</button>
    </form>
  );
}
export default RegistrationForm;
```

> [!TIP]
> **Key points for forms:**
> - `e.preventDefault()` stops page reload
> - `[e.target.name]: e.target.value` dynamically updates the right field
> - `...formData` spreads existing values (keeps other fields)

---

## 5. React Router

### Install
```bash
npm install react-router-dom
```

### Setup Routing
```jsx
// App.js
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/about">About</Link> | 
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
```

### Page Components
```jsx
// Home.js
function Home() {
  return <h1>Home Page</h1>;
}
export default Home;

// About.js
function About() {
  return <h1>About Page</h1>;
}
export default About;
```

### URL Parameters
```jsx
// Route
<Route path="/user/:id" element={<UserDetail />} />

// Component
import { useParams } from 'react-router-dom';

function UserDetail() {
  const { id } = useParams();
  return <h2>User ID: {id}</h2>;
}
```

---

## 6. API Calls

### Fetch Data from API
```jsx
import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}
export default UserList;
```

### Using Axios
```bash
npm install axios
```
```jsx
import axios from 'axios';
import { useState, useEffect } from 'react';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => setPosts(res.data));
  }, []);

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}><b>{post.title}</b></li>
      ))}
    </ul>
  );
}
```

---

## 7. useEffect & Lifecycle

### Pattern
```jsx
useEffect(() => {
  // Runs on mount + when dependencies change
  console.log('Component mounted or updated');

  return () => {
    // Cleanup (runs on unmount)
    console.log('Cleanup');
  };
}, [dependency]); // [] = run once | [value] = run when value changes
```

### Timer Example
```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup
  }, []);

  return <h2>Timer: {seconds}s</h2>;
}
```

---

## 8. useContext

### Create & Use Context (3 Steps)

```jsx
// Step 1: Create Context - ThemeContext.js
import { createContext } from 'react';
const ThemeContext = createContext();
export default ThemeContext;
```

```jsx
// Step 2: Provide Context - App.js
import { useState } from 'react';
import ThemeContext from './ThemeContext';
import Content from './Content';

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div style={{ background: theme === 'dark' ? '#333' : '#fff', 
                     color: theme === 'dark' ? '#fff' : '#000',
                     minHeight: '100vh', padding: '20px' }}>
        <h1>Theme: {theme}</h1>
        <Content />
      </div>
    </ThemeContext.Provider>
  );
}
export default App;
```

```jsx
// Step 3: Consume Context - Content.js
import { useContext } from 'react';
import ThemeContext from './ThemeContext';

function Content() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}
export default Content;
```

---

## 9. Node.js + Express

### Setup
```bash
mkdir backend && cd backend
npm init -y
npm install express cors mongoose
```

### Basic Express Server
```js
// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Sample data
let students = [
  { id: 1, name: 'Shridhar', dept: 'CSE' },
  { id: 2, name: 'Ravi', dept: 'ECE' }
];

// GET all
app.get('/api/students', (req, res) => {
  res.json(students);
});

// GET by id
app.get('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ msg: 'Not found' });
  res.json(student);
});

// POST - add new
app.post('/api/students', (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    dept: req.body.dept
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT - update
app.put('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ msg: 'Not found' });
  student.name = req.body.name;
  student.dept = req.body.dept;
  res.json(student);
});

// DELETE
app.delete('/api/students/:id', (req, res) => {
  students = students.filter(s => s.id !== parseInt(req.params.id));
  res.json({ msg: 'Deleted' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
```

---

## 10. MongoDB + Mongoose

### Connect to MongoDB
```js
// server.js (add at top)
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/labexam')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
```

### Create Model
```js
// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roll: { type: String, required: true },
  dept: { type: String, required: true },
  year: { type: Number, default: 1 }
});

module.exports = mongoose.model('Student', studentSchema);
```

### CRUD Routes with MongoDB
```js
// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET all students
router.get('/', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// GET one student
router.get('/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
});

// POST - create student
router.post('/', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.status(201).json(student);
});

// PUT - update student
router.put('/:id', async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(student);
});

// DELETE student
router.delete('/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Student deleted' });
});

module.exports = router;
```

### Use Routes in Server
```js
// server.js (add this)
const studentRoutes = require('./routes/studentRoutes');
app.use('/api/students', studentRoutes);
```

---

## 11. Full Stack Example - Student CRUD App

### React Frontend (connects to Express backend)
```jsx
// App.js - Full CRUD
import React, { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: '', roll: '', dept: '' });
  const [editId, setEditId] = useState(null);

  const API = 'http://localhost:5000/api/students';

  // Fetch all students
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    fetch(API)
      .then(res => res.json())
      .then(data => setStudents(data));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      // UPDATE
      fetch(`${API}/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }).then(() => {
        fetchStudents();
        setFormData({ name: '', roll: '', dept: '' });
        setEditId(null);
      });
    } else {
      // CREATE
      fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }).then(() => {
        fetchStudents();
        setFormData({ name: '', roll: '', dept: '' });
      });
    }
  };

  // Delete
  const handleDelete = (id) => {
    fetch(`${API}/${id}`, { method: 'DELETE' })
      .then(() => fetchStudents());
  };

  // Edit
  const handleEdit = (student) => {
    setFormData({ name: student.name, roll: student.roll, dept: student.dept });
    setEditId(student._id);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Student Management</h1>
      
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /><br/><br/>
        <input name="roll" placeholder="Roll No" value={formData.roll} onChange={handleChange} required /><br/><br/>
        <input name="dept" placeholder="Department" value={formData.dept} onChange={handleChange} required /><br/><br/>
        <button type="submit">{editId ? 'Update' : 'Add'} Student</button>
      </form>

      <h2>Students List</h2>
      <table border="1" cellPadding="8" style={{ width: '100%' }}>
        <thead>
          <tr><th>Name</th><th>Roll</th><th>Dept</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.roll}</td>
              <td>{s.dept}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button onClick={() => handleDelete(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;
```

---

## 12. Common Lab Questions - Quick Answers

### Q1: Todo List App
```jsx
import { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, done: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Add todo" />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(t => (
          <li key={t.id} style={{ textDecoration: t.done ? 'line-through' : 'none' }}>
            {t.text}
            <button onClick={() => toggleTodo(t.id)}>✓</button>
            <button onClick={() => deleteTodo(t.id)}>✗</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default TodoApp;
```

### Q2: Calculator
```jsx
import { useState } from 'react';

function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');

  const calculate = (op) => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    switch(op) {
      case '+': setResult(a + b); break;
      case '-': setResult(a - b); break;
      case '*': setResult(a * b); break;
      case '/': setResult(b !== 0 ? a / b : 'Error'); break;
      default: break;
    }
  };

  return (
    <div>
      <h1>Calculator</h1>
      <input type="number" value={num1} onChange={e => setNum1(e.target.value)} placeholder="Num 1" />
      <input type="number" value={num2} onChange={e => setNum2(e.target.value)} placeholder="Num 2" />
      <div>
        <button onClick={() => calculate('+')}>+</button>
        <button onClick={() => calculate('-')}>-</button>
        <button onClick={() => calculate('*')}>×</button>
        <button onClick={() => calculate('/')}>÷</button>
      </div>
      <h2>Result: {result}</h2>
    </div>
  );
}
export default Calculator;
```

### Q3: Login Form with Validation
```jsx
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('All fields required!');
    } else if (password.length < 6) {
      setError('Password must be 6+ characters');
    } else {
      setError('');
      alert('Login successful!');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/><br/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br/><br/>
      <button type="submit">Login</button>
    </form>
  );
}
export default LoginForm;
```

---

## 🧠 Quick Memory Cheat Sheet

| Concept | Syntax | Remember |
|---------|--------|----------|
| **State** | `const [x, setX] = useState(0)` | Always use setter |
| **Props** | `function Comp({ name })` | Read-only, parent→child |
| **Effect** | `useEffect(() => {}, [])` | `[]` = run once |
| **Context** | `createContext → Provider → useContext` | 3 steps |
| **Router** | `BrowserRouter > Routes > Route` | Wrap in BrowserRouter |
| **Link** | `<Link to="/path">` | NOT `<a href>` |
| **Params** | `useParams()` | For `/user/:id` |
| **Map** | `arr.map(item => <li key={item.id}>)` | Always add `key` |
| **Form** | `e.preventDefault()` | Stops page reload |
| **Fetch** | `fetch(url).then(res => res.json())` | Returns promise |
| **Mongoose** | `.find() .findById() .save() .findByIdAndUpdate() .findByIdAndDelete()` | 5 main methods |

> [!CAUTION]
> **Common Mistakes in Exams:**
> - Forgetting `import React` (older versions need it)
> - Missing `key` prop in `.map()`
> - Not using `e.preventDefault()` in forms
> - Forgetting `export default ComponentName`
> - Using `class` instead of `className` in JSX
> - Not wrapping multiple elements in a parent `<div>` or `<>`

---

**Good luck on Monday, Shridhar! 🚀 Focus on Forms, CRUD, and Routing — they come up the most!**
