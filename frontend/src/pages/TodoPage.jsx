import React, { useState, useEffect, useContext } from "react";
import api from "../api/api";
import { TodoContext } from "../context/TodoContext";
import FilterBar from "../components/FilterBar";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import ExportButton from "../components/ExportButton";
import NoteModal from "../components/NoteModal";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [filters, setFilters] = useState({ tag: "", priority: "", user: "" });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");

  const { noteModalOpen, selectedTodoId, openNoteModal, closeNoteModal } =
    useContext(TodoContext);

  const fetchTodos = async () => {
    try {
      const res = await api.get("/todos", {
        params: { ...filters, page, limit: 5, sortBy, sortDir },
      });

      setTodos(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Failed to fetch todos", err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [filters, page, sortBy, sortDir]);

  const handleDelete = async (id) => {
    await api.delete(`/todos/${id}`);
    fetchTodos();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <FilterBar
            filters={filters}
            setFilters={setFilters}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortDir={sortDir}
            setSortDir={setSortDir}
          />
        </div>

        {/* Todo Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <TodoForm
            fetchTodos={fetchTodos}
            editingTodo={editingTodo}
            clearEdit={() => setEditingTodo(null)}
          />
        </div>

        {/* Todo List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <TodoList
            todos={todos}
            onEdit={setEditingTodo}
            onDelete={handleDelete}
            openNote={openNoteModal}
          />
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:bg-gray-400"
          >
            Prev
          </button>
          <span className="text-gray-700 font-medium">Page {page}</span>
          <button
            disabled={page * 5 >= total}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:bg-gray-400"
          >
            Next
          </button>
        </div>

        {/* Export Button */}
        <div className="text-center">
          <ExportButton />
        </div>

        {/* Note Modal */}
        {noteModalOpen && (
          <NoteModal todoId={selectedTodoId} close={closeNoteModal} />
        )}
      </div>
    </div>
  );
};

export default TodoPage;
