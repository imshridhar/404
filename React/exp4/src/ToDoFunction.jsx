import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  return (
    <div style={{ width: 300, margin: "20px auto" }}>
      <h2>To-Do List</h2>

      <input
        placeholder="Add task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button
        onClick={() => {
          if (!task) return;

          setTasks([
            ...tasks,
            { text: task, done: false }
          ]);

          setTask("");
        }}
      >
        Add
      </button>

      <ul style={{ listStyle: "none", padding: 0 }}>

        {tasks.map((t, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10
            }}
          >

            <span
              onClick={() =>
                setTasks(
                  tasks.map((x, j) =>
                    j === i
                      ? { ...x, done: !x.done }
                      : x
                  )
                )
              }
              style={{
                textDecoration:
                  t.done ? "line-through" : "none"
              }}
            >
              {t.text}
            </span>

            <button
              onClick={() =>
                setTasks(tasks.filter((_, j) => j !== i))
              }
            >
              X
            </button>

          </li>
        ))}

      </ul>
    </div>
  );
}