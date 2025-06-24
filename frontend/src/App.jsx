import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TodoPage from "./pages/TodoPage";
import TodoDetailsPage from "./pages/TodoDetailsPage"; // 👈 new import
import { TodoProvider } from "./context/TodoContext";
// import "./App.css";
function App() {
  return (
    <TodoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<TodoPage />} />
          <Route path="/todos/:id" element={<TodoDetailsPage />} />{" "}
          {/* 👈 new route */}
        </Routes>
      </Router>
    </TodoProvider>
  );
}

export default App;

