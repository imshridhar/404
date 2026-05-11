# React Lab Exam - All 10 Experiments

> **🧠 Memory Trick: React = Input(1) → Props(2) → Counter(3) → Todo(4) → Gallery(5) → Form(6) → Card(7) → Reminder(8) → Router(9) → Class(10)**
> Short: **I P C T G F C R R C** = "**I Play Cricket, The Game Feels Cool, Really Really Cool**"

---

## Exp 1: useState - Live Text Input

**🧠 Remember: useState + onChange + display = 3 lines logic**

> Setup for ALL React exps: `npx create-vite exp1 --template react` → `npm install` → `npm run dev`

```jsx
// src/App.jsx
import React, { useState } from 'react'

function App() {
  const [text, setText] = useState(" ");

  const handlechange = (event) => {
    setText(event.target.value);
  }

  return (
    <>
      <div style={{padding:"20px"}}>
        <input type="text" placeholder='Type Something...' value={text} onChange={handlechange}/>
        <h1>{text}</h1>
      </div>
    </>
  )
}
export default App
```

---

## Exp 2: Props - Header & Footer Components

**🧠 Remember: 3 files → App passes props to Header(title) and Footer(tagline,copyright)**

```jsx
// src/Header.jsx
import React from "react"

function Header(props) {
    return(
        <header style={{background:"#282c34", color:'#fff', padding:"1.5rem"}}>
            <h1>{props.title}</h1>
        </header>
    );
}
export default Header;
```

```jsx
// src/Footer.jsx
import React from "react"

function Footer(props) {
    return(
       <footer style={{background:'#f1f1f1', padding:"1rem"}}>
        <p>{props.tagline}</p>
        <small>{props.copyright}</small>
       </footer>
    );
}
export default Footer;
```

```jsx
// src/App.jsx
import React from "react";
import Header from "./Header"
import Footer from "./Footer"

function App() {
  const appTitle = "My React props Demo";
  const tagline = "Learning React one Prop at a time";
  const copyright = `@${new Date().getFullYear()} My company. All rights reserved.`;

  return (
    <>
      <div style={{textAlign:"center", minHeight:"100vh"}}>
        <Header title={appTitle}/>
        <main style={{padding:"2rem"}}>
          <p>This content is inside the App component</p>
        </main>
        <Footer tagline={tagline} copyright={copyright}/>
      </div>
    </>
  )
}
export default App
```

---

## Exp 3: Counter with Step (useState)

**🧠 Remember: TWO useState (count + step) → inc/dec/reset functions → input for step**

```jsx
// src/Counter.jsx
import { useState } from "react";

export default function Counter(){
    const MIN=0;
    const START=0;

    const [count, setCount] = useState(START);
    const [step, setStep] = useState(1);

    const inc = () => setCount(c => c + step);
    const dec = () => setCount(c => Math.max(MIN, c - step));
    const reset = () => setCount(START);

    return(
        <div style={{textAlign:"center", marginTop:50}}>
            <h1>{count}</h1>
            <button onClick={dec}>-</button>
            <button onClick={inc}>+</button>
            <br /><br />
            <input type="number" min="1" value={step} onChange={e => setStep(+e.target.value)}/>
            <br /><br />
            <button onClick={reset}>Reset</button>
        </div>
    )
}
```

```jsx
// src/App.jsx
import Counter from './Counter'
function App() {
  return (<><Counter/></>)
}
export default App
```

---

## Exp 4: Todo List (add, toggle, remove)

**🧠 Remember: tasks array → addTask(spread), toggle(copy+flip), remove(filter)**

```jsx
// src/ToDoFunction.jsx
import React, { useState } from "react";

function ToDoFunction() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    if (!task) return;
    setTasks([...tasks, { text: task, done: false }]);
    setTask("");
  };

  const toggle = (i) => {
    const t = [...tasks];
    t[i].done = !t[i].done;
    setTasks(t);
  };

  const remove = (i) => {
    setTasks(tasks.filter((_, index) => index !== i));
  };

  return (
    <div style={styles.box}>
      <h3>To-Do List</h3>
      <div>
        <input value={task} onChange={(e) => setTask(e.target.value)}
          placeholder="Add task" style={styles.input} />
        <button onClick={addTask} style={styles.add}>Add</button>
      </div>
      <ul style={styles.list}>
        {tasks.map((t, i) => (
          <li key={i} style={styles.item}>
            <span onClick={() => toggle(i)}
              style={{ textDecoration: t.done ? "line-through" : "none",
                       color: t.done ? "gray" : "black", cursor: "pointer" }}>
              {t.text}
            </span>
            <button onClick={() => remove(i)} style={styles.del}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  box: { width: "320px", margin: "40px auto", fontFamily: "Arial", textAlign: "center" },
  input: { padding: "6px", width: "65%" },
  add: { padding: "6px 10px", marginLeft: "5px" },
  list: { listStyle: "none", padding: 0, marginTop: "15px" },
  item: { display: "flex", justifyContent: "space-between", padding: "6px", borderBottom: "1px solid #ddd" },
  del: { background: "red", color: "white", border: "none", padding: "3px 7px", cursor: "pointer" }
};

export default ToDoFunction;
```

```jsx
// src/App.jsx
import ToDoFunction from "./ToDoFunction"
function App() {
  return (<><ToDoFunction/></>)
}
export default App
```

---

## Exp 5: Image Gallery (add, remove, error handling)

**🧠 Remember: TWO components → BasicFigure(card) + FigureList(parent with add/remove)**

```jsx
// src/imageGallery.jsx
import React, { useState } from "react";

function BasicFigure({ url, caption, onRemove }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div style={{ border: "1px solid #ccc", padding: 10, borderRadius: 8,
                  width: "100%", boxSizing: "border-box", textAlign: "center" }}>
      {!imgError ? (
        <img src={url} alt={caption} onError={() => setImgError(true)}
          style={{ width: "100%", height: "150px", objectFit: "cover",
                   borderRadius: 6, display: "block" }} />
      ) : (
        <div style={{ height: 150, display: "flex", alignItems: "center",
                      justifyContent: "center", background: "#eee" }}>
          Invalid Image URL
        </div>
      )}
      <p style={{ margin: "8px 0" }}>{caption}</p>
      <button onClick={onRemove}>Remove</button>
    </div>
  );
}

export default function FigureList() {
  const [figures, setFigures] = useState([
    { url: "https://picsum.photos/300/200?1", caption: "Image 1" },
    { url: "https://picsum.photos/300/200?2", caption: "Image 2" }
  ]);
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");

  const addFigure = () => {
    if (!url || !caption) return;
    setFigures([...figures, { url, caption }]);
    setUrl("");
    setCaption("");
  };

  const removeFigure = (index) => {
    setFigures(figures.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <div style={{ marginBottom: 15 }}>
        <input placeholder="Image URL" value={url}
          onChange={(e) => setUrl(e.target.value)} style={{ marginRight: 8 }} />
        <input placeholder="Caption" value={caption}
          onChange={(e) => setCaption(e.target.value)} style={{ marginRight: 8 }} />
        <button onClick={addFigure}>Add</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 15 }}>
        {figures.map((fig, i) => (
          <BasicFigure key={i} url={fig.url} caption={fig.caption} onRemove={() => removeFigure(i)} />
        ))}
      </div>
    </div>
  );
}
```

---

## Exp 6: Form Validation (name, email, password)

**🧠 Remember: 3 useState(data, err, show) → validate function → red border on error**

```jsx
// src/App.jsx
import React, { useState } from "react";

export default function App() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState({});
  const [show, setShow] = useState(false);

  const validate = () => {
    let e = {};
    if (!data.name) e.name = "Name required";
    if (!data.email) e.email = "Email required";
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Invalid email format";
    if (data.password.length < 6) e.password = "Password must be 6 characters";
    setErr(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (validate()) alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={submit} style={{ width: 250 }}>
      <input placeholder="Name"
        onChange={(e) => setData({ ...data, name: e.target.value })}
        style={{ border: err.name ? "2px solid red" : "" }} />
      {err.name && <p style={{ color: "red" }}>{err.name}</p>}

      <input placeholder="Email"
        onChange={(e) => setData({ ...data, email: e.target.value })}
        style={{ border: err.email ? "2px solid red" : "" }} />
      {err.email && <p style={{ color: "red" }}>{err.email}</p>}

      <input type={show ? "text" : "password"} placeholder="Password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
        style={{ border: err.password ? "2px solid red" : "" }} />
      {err.password && <p style={{ color: "red" }}>{err.password}</p>}

      <button type="button" onClick={() => setShow(!show)}>Show</button>
      <br /><br />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## Exp 7: Profile Card (Props + CSS + hover)

**🧠 Remember: ProfileCard component with props(name,bio,image,bgColor) + hover scale effect**

```jsx
// src/App.jsx
import React, { useState } from "react";
import "./ProfileCard.css";

function ProfileCard({ name, bio, image, bgColor }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="profile-card"
      style={{ backgroundColor: bgColor || "#ffffff",
               transform: hovered ? "scale(1.03)" : "scale(1)",
               transition: "all 0.3s ease" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <img src={image} alt={name}
        style={{ borderRadius: "50%", width: "120px", height: "120px",
                 objectFit: "cover", marginBottom: "15px" }} />
      <h2 className="profile-name">{name}</h2>
      <p className="profile-bio">{bio}</p>
    </div>
  );
}

export default function App() {
  const [color, setColor] = useState("#f5f7ff");
  return (
    <div className="app-container">
      <ProfileCard name="Shridhar Havinal"
        bio="Frontend developer passionate about React"
        image="./assets/shridhar.jpeg" bgColor={color} />
      <div className="buttons">
        <button onClick={() => setColor("#f5f7ff")}>Default</button>
        <button onClick={() => setColor("#ffe8e8")}>Pink</button>
        <button onClick={() => setColor("#e8fff1")}>Green</button>
        <button onClick={() => setColor("#e8f0ff")}>Blue</button>
      </div>
    </div>
  );
}
```

---

## Exp 8: Reminder App (CRUD + Filter)

**🧠 Remember: Like Todo but with date+desc+filter(all/completed/pending). Uses form object state.**

```jsx
// src/ReminderApp.jsx
import React, { useState } from "react";

export default function ReminderApp() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({ name: "", date: "", desc: "" });

  const addTask = () => {
    if (!form.name || !form.date) return;
    setTasks([{ id: Date.now(), ...form, completed: false }, ...tasks]);
    setForm({ name: "", date: "", desc: "" });
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h1>Reminder App</h1>
      <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 15, marginBottom: 15 }}>
        <input placeholder="Task Name" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })} /><br/>
        <input type="date" value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })} /><br/>
        <textarea placeholder="Description" value={form.desc}
          onChange={e => setForm({ ...form, desc: e.target.value })} /><br/>
        <button onClick={addTask}>Add Task</button>
      </div>

      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      {filteredTasks.map(task => (
        <div key={task.id} style={{ border: "1px solid #ccc", padding: 15, margin: "10px 0" }}>
          <div style={{ fontWeight: "bold",
                        textDecoration: task.completed ? "line-through" : "none" }}>
            {task.name}
          </div>
          <div>Due: {task.date}</div>
          {task.desc && <div>{task.desc}</div>}
          <button onClick={() => toggleTask(task.id)}>
            {task.completed ? "Completed" : "Mark Done"}
          </button>
          <button onClick={() => deleteTask(task.id)}
            style={{ backgroundColor: "#ff4d4d", color: "white" }}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

---

## Exp 9: React Router (NavLink + Routes)

**🧠 Remember: `npm install react-router-dom` → BrowserRouter > Navbar + Routes > Route**

```jsx
// src/Nav.jsx
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

function Navbar() {
  const linkStyle = ({ isActive }) => ({
    padding: "10px 15px", textDecoration: "none", borderRadius: "5px",
    marginRight: "10px",
    color: isActive ? "white" : "black",
    backgroundColor: isActive ? "#007bff" : "transparent",
  });

  return (
    <nav style={{ padding: "15px", borderBottom: "1px solid #ccc" }}>
      <NavLink to="/" style={linkStyle} end>Home</NavLink>
      <NavLink to="/about" style={linkStyle}>About</NavLink>
      <NavLink to="/contact" style={linkStyle}>Contact</NavLink>
    </nav>
  );
}

function Home() {
  return (<div><h1>Home Page</h1><p>Welcome to the Home page.</p></div>);
}
function About() {
  return (<div><h1>About Page</h1><p>This is the About page.</p></div>);
}
function Contact() {
  return (<div><h1>Contact Page</h1><p>This is the Contact page.</p></div>);
}

export default function Nav() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
```

---

## Exp 10: Class Component + Lifecycle + API Fetch

**🧠 Remember: `class extends Component` → state={} → componentDidMount → componentDidUpdate → render**

```jsx
// src/App.jsx
import React, { Component } from "react";

class DataFetcher extends Component {
  state = { data: [], search: "", loading: false, error: null };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.search !== this.state.search) this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      this.setState({ data, loading: false });
    } catch (e) {
      this.setState({ error: e.message, loading: false });
    }
  };

  render() {
    return (
      <div style={{ padding: 20 }}>
        <h2>React Lifecycle Methods with API Data Fetching</h2>
        <input placeholder="Search user..."
          value={this.state.search}
          onChange={(e) => this.setState({ search: e.target.value })} />
        <button onClick={this.fetchData}>Refresh</button>

        {this.state.loading && <p>Loading...</p>}
        {this.state.error && <p style={{ color: "red" }}>{this.state.error}</p>}

        <table border="1" style={{ marginTop: 10 }}>
          <thead>
            <tr><th>ID</th><th>Name</th><th>Email</th></tr>
          </thead>
          <tbody>
            {this.state.data.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td><td>{u.name}</td><td>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default function App() {
  return <DataFetcher />;
}
```

---

## 🧠 REPEATING PATTERNS (Memorize These Once, Use Everywhere!)

| Pattern                   | Exp Numbers   | Code                                      |
| ------------------------- | ------------- | ----------------------------------------- |
| `useState`              | 1,3,4,5,6,7,8 | `const [x, setX] = useState("")`        |
| `onChange` handler      | 1,3,4,5,6,8   | `onChange={e => setX(e.target.value)}`  |
| `...spread` to update   | 4,5,6,8       | `setData({...data, name: val})`         |
| `.map()` to render list | 4,5,8,9,10    | `arr.map(item => <div key={id}>)`       |
| `.filter()` to remove   | 4,5,8         | `arr.filter((_, i) => i !== index)`     |
| Props passing             | 2,5,7         | `<Comp name={val} />` → `props.name` |
| Inline style object       | ALL           | `style={{ color: "red" }}`              |
| Conditional render        | 5,6,8,10      | `{err && <p>{err}</p>}`                 |
| `export default`        | ALL           | Last line of every component              |

> [!IMPORTANT]
> **THE 3 PATTERNS that solve 90% of questions:**
>
> 1. **Add item:** `setArr([...arr, newItem])`
> 2. **Remove item:** `setArr(arr.filter((_, i) => i !== index))`
> 3. **Toggle item:** `setArr(arr.map(t => t.id === id ? {...t, done: !t.done} : t))`
