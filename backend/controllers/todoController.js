import Todo from "../models/Todo.js";
import { exportTodosToJSON, exportTodosToCSV } from "../utils/exportUtils.js";

export const createTodo = async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.status(201).json(todo);
};

export const getTodos = async (req, res) => {
  const {
    page = 1,
    limit = 5,
    priority,
    tag,
    user,
    sortBy = "createdAt",
  } = req.query;

  const query = {};
  if (priority) query.priority = priority;
  if (tag) query.tags = tag;
  if (user) query.assignedUsers = user;

  const todos = await Todo.find(query)
    .populate("assignedUsers")
    .sort({ [sortBy]: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const count = await Todo.countDocuments(query);

  res.json({ data: todos, total: count });
};

export const getTodoById = async (req, res) => {
  const todo = await Todo.findById(req.params.id).populate("assignedUsers");
  res.json(todo);
};

export const updateTodo = async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

export const deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};

export const addNote = async (req, res) => {
  const { text } = req.body;
  const todo = await Todo.findById(req.params.id);
  todo.notes.push({ text });
  await todo.save();
  res.json(todo);
};

export const exportTodos = async (req, res) => {
  const todos = await Todo.find({}).populate("assignedUsers");
  if (req.query.format === "csv") {
    const csv = exportTodosToCSV(todos);
    res.header("Content-Type", "text/csv");
    res.attachment("todos.csv");
    return res.send(csv);
  } else {
    return res.json(exportTodosToJSON(todos));
  }
};
