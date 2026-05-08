import React, { useState } from "react";

export default function ReminderApp() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({ name: "", date: "", desc: "" });

  const addTask = () => {
    if (!form.name || !form.date) return;

    const newTask = {
      id: Date.now(),
      name: form.name,
      date: form.date,
      desc: form.desc,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setForm({ name: "", date: "", desc: "" });
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "20px auto",
      fontFamily: "Arial, sans-serif",
    },
    card: {
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "15px",
      marginBottom: "15px",
    },
    input: {
      width: "100%",
      padding: "8px",
      marginBottom: "10px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    button: {
      padding: "8px 12px",
      marginRight: "5px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    taskTitle: (completed) => ({
      fontWeight: "bold",
      textDecoration: completed ? "line-through" : "none",
    }),
  };

  return (
    <div style={styles.container}>
      <h1>Reminder App</h1>

      <div style={styles.card}>
        <input
          style={styles.input}
          placeholder="Task Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          style={styles.input}
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <textarea
          style={styles.input}
          placeholder="Description (optional)"
          value={form.desc}
          onChange={(e) => setForm({ ...form, desc: e.target.value })}
        />
        <button style={styles.button} onClick={addTask}>
          Add Task
        </button>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <button style={styles.button} onClick={() => setFilter("all")}>All</button>
        <button style={styles.button} onClick={() => setFilter("completed")}>Completed</button>
        <button style={styles.button} onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <div>
        {filteredTasks.length === 0 && <p>No tasks found.</p>}

        {filteredTasks.map((task) => (
          <div key={task.id} style={styles.card}>
            <div>
              <div style={styles.taskTitle(task.completed)}>{task.name}</div>
              <div>Due: {task.date}</div>
              {task.desc && <div>{task.desc}</div>}
            </div>

            <div style={{ marginTop: "10px" }}>
              <button
                style={styles.button}
                onClick={() => toggleTask(task.id)}
              >
                {task.completed ? "Completed" : "Mark Done"}
              </button>

              <button
                style={{ ...styles.button, backgroundColor: "#ff4d4d", color: "white" }}
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


