// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import TodoPage from "./pages/TodoPage";
// import TodoDetailsPage from "./pages/TodoDetailsPage"; // 👈 new import
// import { TodoProvider } from "./context/TodoContext";
// // import "./App.css";
// function App() {
//   return (
//     <TodoProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/todos" element={<TodoPage />} />
//           <Route path="/todos/:id" element={<TodoDetailsPage />} />{" "}
//           {/* 👈 new route */}
//         </Routes>
//       </Router>
//     </TodoProvider>
//   );
// }

// export default App;

// TaskTracker.jsx
import React, { useState } from "react";

// Initial 2D array
const initialTasks = [
  ["Task 1", "Task 2", "Task 3"], // Work
  ["Task 4", "Task 5"], // Personal
  ["Task 6", "Task 7", "Task 8"], // Shopping
];

const categories = ["Work", "Personal", "Shopping"];

const App = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [completed, setCompleted] = useState(new Set());
  const [newTask, setNewTask] = useState("");
  const [categoryIndex, setCategoryIndex] = useState(0);

  // ✅ Add task to selected category
  const handleAddTask = () => {
    if (newTask.trim() === "") return;

    const updatedTasks = [...tasks];
    updatedTasks[categoryIndex] = [...updatedTasks[categoryIndex], newTask];
    setTasks(updatedTasks);
    setNewTask("");
  };

  // ✅ Toggle completion
  const toggleComplete = (catIdx, taskIdx) => {
    const key = `${catIdx}-${taskIdx}`;
    const updated = new Set(completed);
    if (updated.has(key)) {
      updated.delete(key);
    } else {
      updated.add(key);
    }
    setCompleted(updated);
  };

  // ✅ Clear all completed
  const clearCompleted = () => {
    const newTasks = tasks.map((catTasks, catIdx) =>
      catTasks.filter((_, taskIdx) => !completed.has(`${catIdx}-${taskIdx}`))
    );
    setTasks(newTasks);
    setCompleted(new Set());
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">📝 Task Tracker</h1>

      {/* Add Task Form */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task..."
          className="border p-2 rounded w-full"
        />
        <select
          value={categoryIndex}
          onChange={(e) => setCategoryIndex(Number(e.target.value))}
          className="border p-2 rounded"
        >
          {categories.map((cat, idx) => (
            <option key={cat} value={idx}>
              {cat}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddTask}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Task Grid Table */}
      <table className="table-auto w-full border">
        <thead>
          <tr>
            {categories.map((cat) => (
              <th key={cat} className="border p-2 bg-gray-200">
                {cat}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({
            length: Math.max(...tasks.map((arr) => arr.length)),
          }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {tasks.map((catTasks, catIdx) => {
                const task = catTasks[rowIndex];
                if (!task) return <td key={catIdx} className="border p-2"></td>;
                const isCompleted = completed.has(`${catIdx}-${rowIndex}`);
                return (
                  <td key={catIdx} className="border p-2">
                    <label className="flex gap-2 items-center">
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={() => toggleComplete(catIdx, rowIndex)}
                      />
                      <span
                        className={`${
                          isCompleted ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {task}
                      </span>
                    </label>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-center">
        <button
          onClick={clearCompleted}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default App;
