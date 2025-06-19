import React, { useState } from "react";
import api from "../api/api";

const NoteModal = ({ todoId, close }) => {
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post(`/todos/${todoId}/notes`, { text: note });
    setNote("");
    close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Note</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your note here..."
            className="w-full h-32 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
