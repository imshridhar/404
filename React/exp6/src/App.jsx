import { useState } from "react";
export default function App() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [err, setErr] = useState({});
  const [show, setShow] = useState(false);
  const validate = () => {
    let e = {};
    if (!data.name) e.name = "Name required";
    if (!data.email)
      e.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(data.email))
      e.email = "Invalid email";
    if (data.password.length < 6)
      e.password = "Min 6 characters";
    setErr(e);
    return Object.keys(e).length === 0;
  };
  const submit = (e) => {
    e.preventDefault();
    if (validate())
      alert(JSON.stringify(data));
  };
  return (
    <form onSubmit={submit} style={{ width: 250 }}>
      <input
        placeholder="Name"
        onChange={(e) =>
          setData({ ...data, name: e.target.value })
        }
      />
      <p style={{ color: "red" }}>{err.name}</p>
      <input
        placeholder="Email"
        onChange={(e) =>
          setData({ ...data, email: e.target.value })
        }
      />
      <p style={{ color: "red" }}>{err.email}</p>
      <input
        type={show ? "text" : "password"}
        placeholder="Password"
        onChange={(e) =>
          setData({ ...data, password: e.target.value })
        }
      />
      <p style={{ color: "red" }}>{err.password}</p>
      <button
        type="button"
        onClick={() => setShow(!show)}
      >
        Show
      </button>
      <br /><br />
      <button type="submit">
        Submit
      </button>
    </form>
  );
}