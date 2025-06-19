import React, { useEffect, useState } from "react";
import api from "../api/api";

const TodoDetails = ({ id }) => {
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await api.get(`/todos/${id}`);
        setTodo(res.data);
      } catch (error) {
        console.error("Failed to fetch todo details:", error.message);
      }
    };
    fetchTodo();
  }, [id]);

  if (!todo) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">{todo.title}</h2>

      <p className="mb-2">
        <span className="font-semibold">Description:</span> {todo.description}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Priority:</span> {todo.priority}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Tags:</span>{" "}
        {todo.tags?.join(", ") || "No tags"}
      </p>
      <p className="mb-4">
        <span className="font-semibold">Assigned Users:</span>{" "}
        {todo.assignedUsers?.map((user) => user.username).join(", ") || "None"}
      </p>

      <div>
        <h3 className="text-lg font-semibold mb-2">Notes:</h3>
        <ul className="list-disc list-inside space-y-1">
          {todo.notes && todo.notes.length > 0 ? (
            todo.notes.map((note, idx) => (
              <li key={idx} className="text-gray-700">
                {note.text}
              </li>
            ))
          ) : (
            <li className="text-gray-500 italic">No notes</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoDetails;
