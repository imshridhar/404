import { useState } from "react";

export default function ReminderApp() {

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");

  const addTask = () => {
    if (!name || !date) return;

    setTasks([
      {
        id: Date.now(),
        name,
        date,
        desc,
        done: false
      },
      ...tasks
    ]);

    setName("");
    setDate("");
    setDesc("");
  };

  const toggle = (id) => {
    setTasks(
      tasks.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const del = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filtered = tasks.filter(t =>
    filter === "all"
      ? true
      : filter === "completed"
      ? t.done
      : !t.done
  );

  return (
    <div style={{ width: 300, margin: "20px auto" }}>

      <h2>Reminder App</h2>

      <input
        placeholder="Task"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <br /><br />

      <button onClick={addTask}>Add</button>

      <hr />

      <button onClick={() => setFilter("all")}>All</button>

      <button onClick={() => setFilter("completed")}>
        Completed
      </button>

      <button onClick={() => setFilter("pending")}>
        Pending
      </button>

      <hr />

      {filtered.length === 0 && <p>No tasks found</p>}

      {filtered.map(t => (
        <div key={t.id}>

          <h4 style={{
            textDecoration: t.done ? "line-through" : "none"
          }}>
            {t.name}
          </h4>

          <p>{t.date}</p>

          {t.desc && <p>{t.desc}</p>}

          <button onClick={() => toggle(t.id)}>
            {t.done ? "Completed" : "Mark Done"}
          </button>

          <button onClick={() => del(t.id)}>
            Delete
          </button>

          <hr />

        </div>
      ))}

    </div>
  );
}