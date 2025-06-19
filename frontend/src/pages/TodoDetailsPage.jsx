import React from "react";
import { useParams } from "react-router-dom";
import TodoDetails from "../components/TodoDetails";

const TodoDetailsPage = () => {
  const { id } = useParams(); // get ID from URL

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Todo Details</h2>
        <TodoDetails id={id} />
      </div>
    </div>
  );
};

export default TodoDetailsPage;
