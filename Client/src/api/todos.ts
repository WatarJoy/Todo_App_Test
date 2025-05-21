import type { Todo } from "../types/Todo";
export const USER_ID = 1;

const BASE_URL = "http://localhost:3001";

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${BASE_URL}/tasks`);

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return response.json();
};

export const addTodo = async (title: string): Promise<Todo> => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error("Failed to add todo");
  }

  return response.json();
};

export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
};

export const toggleTodo = async (
  id: number,
  completed: boolean
): Promise<void> => {
  const response = await fetch(`${BASE_URL}/tasks/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });

  if (!response.ok) {
    throw new Error("Failed to toggle todo status");
  }
};

export const updateTodoTitle = async (
  id: number,
  title: string
): Promise<void> => {
  const response = await fetch(`${BASE_URL}/tasks/${id}/title`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo title");
  }
};
