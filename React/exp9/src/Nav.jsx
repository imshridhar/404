import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

function Navbar() {
  const linkStyle = ({ isActive }) => ({
    padding: "10px 15px",
    textDecoration: "none",
    borderRadius: "5px",
    marginRight: "10px",
    color: isActive ? "white" : "black",
    backgroundColor: isActive ? "#007bff" : "transparent",
  });

  return (
    <nav style={{ padding: "15px", borderBottom: "1px solid #ccc" }}>
      <NavLink to="/" style={linkStyle} end>
        Home
      </NavLink>
      <NavLink to="/about" style={linkStyle}>
        About
      </NavLink>
      <NavLink to="/contact" style={linkStyle}>
        Contact
      </NavLink>
    </nav>
  );
}

function Home() {
  return (
    <div className="page">
      <h1>Home Page</h1>
      <p>Welcome to the Home page of this React Router demo.</p>
    </div>
  );
}

function About() {
  return (
    <div className="page">
      <h1>About Page</h1>
      <p>This page gives information about the application.</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="page">
      <h1>Contact Page</h1>
      <p>Feel free to reach out through this contact page.</p>
    </div>
  );
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