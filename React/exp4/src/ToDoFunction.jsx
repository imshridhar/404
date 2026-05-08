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
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add task"
          style={styles.input}
        />
        <button onClick={addTask} style={styles.add}>Add</button>
      </div>

      <ul style={styles.list}>
        {tasks.map((t, i) => (
          <li key={i} style={styles.item}>
            <span
              onClick={() => toggle(i)}
              style={{
                textDecoration: t.done ? "line-through" : "none",
                color: t.done ? "gray" : "black",
                cursor: "pointer"
              }}
            >
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
  box: { 
    width: "320px", margin: "40px auto", fontFamily: "Arial", textAlign: "center" 
    },
  input: { 
    padding: "6px", width: "65%" 
  },
  add: { 
    padding: "6px 10px", marginLeft: "5px" 
},
  list: { 
    listStyle: "none", padding: 0, marginTop: "15px" 
},
  item: { 
    display: "flex", justifyContent: "space-between", padding: "6px", borderBottom: "1px solid #ddd" 
},
  del: {
     background: "red", color: "white", border: "none", padding: "3px 7px", cursor: "pointer" 
    }
};

export default ToDoFunction;