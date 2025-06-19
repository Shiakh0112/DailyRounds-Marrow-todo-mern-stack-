import { createContext, useState } from "react";
export const TodoContext = createContext();
export const TodoProvider = ({ children }) => {
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const openNoteModal = (id) => {
    setSelectedTodoId(id);
    setNoteModalOpen(true);
  };
  const closeNoteModal = () => {
    setSelectedTodoId(null);
    setNoteModalOpen(false);
  };
  return (
    <TodoContext.Provider
      value={{ noteModalOpen, selectedTodoId, openNoteModal, closeNoteModal }}
    >
      {children}
    </TodoContext.Provider>
  );
};
