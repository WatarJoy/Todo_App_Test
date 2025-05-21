import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodoStatus,
  updateTodoTitle,
} from "./data/todos";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.get("/tasks", (_, res): void => {
  res.json(getTodos());
});

app.post("/tasks", (req, res): void => {
  const { title } = req.body;
  if (!title) {
    res.status(400).json({ error: "Title is required" });
    return;
  }
  const newTodo = addTodo(title);
  res.status(201).json(newTodo);
});

app.delete("/tasks/:id", (req, res): void => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }
  deleteTodo(id);
  res.status(204).end();
});

app.patch("/tasks/:id/status", (req, res): void => {
  const id = parseInt(req.params.id, 10);
  const { completed } = req.body;
  if (isNaN(id) || typeof completed !== "boolean") {
    res.status(400).json({ error: "Invalid data" });
    return;
  }
  const updated = updateTodoStatus(id, completed);
  if (!updated) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }
  res.json(updated);
});

app.patch("/tasks/:id/title", (req, res): void => {
  const id = parseInt(req.params.id, 10);
  const { title } = req.body;
  if (isNaN(id) || !title) {
    res.status(400).json({ error: "Invalid data" });
    return;
  }
  const updated = updateTodoTitle(id, title);
  if (!updated) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }
  res.json(updated);
});

console.log("✅ Starting server...");

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
