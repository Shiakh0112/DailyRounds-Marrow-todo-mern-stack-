import React from "react";
import { useNavigate } from "react-router-dom";

const TodoItem = ({ todo, onEdit, onDelete, openNote }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-md p-5 mb-4">
      <h4
        className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer"
        onClick={() => navigate(`/todos/${todo._id}`)}
      >
        {todo.title}
      </h4>

      <p className="text-gray-700 my-2">{todo.description}</p>

      <p className="text-sm text-gray-600">
        <span className="font-medium">Priority:</span> {todo.priority} |{" "}
        <span className="font-medium">Tags:</span> {todo.tags.join(", ")} |{" "}
        <span className="font-medium">Users:</span>{" "}
        {todo.assignedUsers.map((u) => u.username).join(", ")}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => onEdit(todo)}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo._id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
        <button
          onClick={() => openNote(todo._id)}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
        >
          Add Note
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
