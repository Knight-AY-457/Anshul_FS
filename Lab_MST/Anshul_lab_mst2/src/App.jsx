import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from "react";

export default function TodoApp() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (!task) return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteTask = (i) => {
    setTasks(tasks.filter((_, index) => index !== i));
  };
  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-xl font-bold mb-4">To-Do List</h1>
      <div className="flex gap-2 mb-4">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
          className="border p-2 flex-1 rounded"
        />
        <button onClick={addTask} className="bg-red-500 text-white px-3 py-2 rounded">
          Add
        </button>
      </div>
      <ul className="text-left">
        {tasks.map((t, i) => (
          <li key={i} className="flex justify-between border-b py-2">
            {t}
            <button onClick={() => deleteTask(i)} className="text-red-500">✖</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
