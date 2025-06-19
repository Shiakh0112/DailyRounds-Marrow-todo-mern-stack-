import React from "react";
import api from "../api/api";

const ExportButton = () => {
  const handleExport = async (format) => {
    const res = await api.get(`/todos/export?format=${format}`, {
      responseType: "blob",
    });
    const blob = new Blob([res.data], {
      type: format === "csv" ? "text/csv" : "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `todos.${format}`;
    link.click();
  };

  return (
    <div className="flex gap-4 mt-6 justify-center">
      <button
        onClick={() => handleExport("json")}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
      >
        Export JSON
      </button>
      <button
        onClick={() => handleExport("csv")}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
      >
        Export CSV
      </button>
    </div>
  );
};

export default ExportButton;
