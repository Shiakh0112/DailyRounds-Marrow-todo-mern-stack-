import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onEdit, onDelete, openNote }) => {
  if (!Array.isArray(todos)) {
    return (
      <p className="text-center text-red-500 mt-4 font-semibold">
        No todos available.
      </p>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {todos.length === 0 ? (
        <p className="text-center text-gray-600">No todos found.</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onEdit={onEdit}
            onDelete={onDelete}
            openNote={openNote}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
