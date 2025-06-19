export const exportTodosToJSON = (todos) => {
  return todos.map((todo) => ({
    id: todo._id,
    title: todo.title,
    description: todo.description,
    priority: todo.priority,
    tags: todo.tags,
    users: todo.assignedUsers.map((u) => u.username),
    notes: todo.notes,
  }));
};

export const exportTodosToCSV = (todos) => {
  const header = "Title,Description,Priority,Tags,AssignedUsers\n";
  const rows = todos.map((todo) => {
    return `"${todo.title}","${todo.description}","${
      todo.priority
    }","${todo.tags.join(";")}","${todo.assignedUsers
      .map((u) => u.username)
      .join(";")}"`;
  });
  return header + rows.join("\n");
};
