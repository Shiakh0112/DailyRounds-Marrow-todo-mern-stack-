import React, { useState, useEffect } from "react";
import api from "../api/api";

const TodoForm = ({ fetchTodos, editingTodo, clearEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [priority, setPriority] = useState("Low");
  const [users, setUsers] = useState("");

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
      setTags(editingTodo.tags.join(","));
      setPriority(editingTodo.priority);
      setUsers(editingTodo.assignedUsers.map((u) => u._id).join(","));
    }
  }, [editingTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      tags: tags.split(",").map((t) => t.trim()),
      priority,
      assignedUsers: users.split(",").map((u) => u.trim()),
    };
    if (editingTodo) {
      await api.put(`/todos/${editingTodo._id}`, data);
      clearEdit();
    } else {
      await api.post("/todos", data);
    }
    setTitle("");
    setDescription("");
    setTags("");
    setPriority("Low");
    setUsers("");
    fetchTodos();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-md p-6 my-6 w-full max-w-2xl mx-auto space-y-4"
    >
      <h2 className="text-xl font-semibold text-blue-700 mb-2">
        {editingTodo ? "Edit Todo" : "Add New Todo"}
      </h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
      />

      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma-separated)"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <input
        value={users}
        onChange={(e) => setUsers(e.target.value)}
        placeholder="User IDs comma-separated"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all"
      >
        {editingTodo ? "Update Todo" : "Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;
