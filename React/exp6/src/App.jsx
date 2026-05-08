import React, { useState } from "react";

export default function App() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState({});
  const [show, setShow] = useState(false);

  const validate = () => {
    let e = {};
    if (!data.name) e.name = "Name required";

    if (!data.email) e.email = "Email required";
    else if (!/^\S+@\S+\.\S+$/.test(data.email))
      e.email = "Invalid email format";

    if (data.password.length < 6)
      e.password = "Password must be 6 characters";

    setErr(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (validate()) alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={submit} style={{ width: 250 }}>
      <input
        placeholder="Name"
        onChange={(e) => setData({ ...data, name: e.target.value })}
        style={{ border: err.name ? "2px solid red" : "" }}
      />
      {err.name && <p style={{ color: "red" }}>{err.name}</p>}

      <input
        placeholder="Email"
        onChange={(e) => setData({ ...data, email: e.target.value })}
        style={{ border: err.email ? "2px solid red" : "" }}
      />
      {err.email && <p style={{ color: "red" }}>{err.email}</p>}

      <input
        type={show ? "text" : "password"}
        placeholder="Password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
        style={{ border: err.password ? "2px solid red" : "" }}
      />
      {err.password && <p style={{ color: "red" }}>{err.password}</p>}

      <button type="button" onClick={() => setShow(!show)}>
        Show
      </button>

      <br /><br />
      <button type="submit">Submit</button>
    </form>
  );
}