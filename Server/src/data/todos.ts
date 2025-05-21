import fs from "fs";
import path from "path";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const DATA_PATH = path.join(__dirname, "../../data/todos.json");

const readTodos = (): Todo[] => {
  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, "[]");
  }

  const raw = fs.readFileSync(DATA_PATH, "utf-8");

  if (!raw.trim()) {
    return [];
  }

  return JSON.parse(raw);
};

const writeTodos = (todos: Todo[]): void => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(todos, null, 2));
};

export const getTodos = (): Todo[] => readTodos();

export const addTodo = (title: string): Todo => {
  const todos = readTodos();
  const newTodo: Todo = {
    id: Date.now(),
    title,
    completed: false,
  };
  todos.push(newTodo);
  writeTodos(todos);
  return newTodo;
};

export const deleteTodo = (id: number): void => {
  const todos = readTodos().filter((todo) => todo.id !== id);
  writeTodos(todos);
};

export const updateTodoStatus = (
  id: number,
  completed: boolean
): Todo | null => {
  const todos = readTodos();
  const todo = todos.find((t) => t.id === id);
  if (!todo) return null;

  todo.completed = completed;
  writeTodos(todos);
  return todo;
};

export const updateTodoTitle = (id: number, title: string): Todo | null => {
  const todos = readTodos();
  const todo = todos.find((t) => t.id === id);
  if (!todo) return null;

  todo.title = title;
  writeTodos(todos);
  return todo;
};
