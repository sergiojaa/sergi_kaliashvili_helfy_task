import type { CreateTaskBody, Task, UpdateTaskBody } from "../types/task";

const BASE_URL = "http://localhost:4000/api/tasks";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = "Something went wrong";

    try {
      const errorData = await response.json();
      if (errorData.message) {
        message = errorData.message;
      }
    } catch {
      // ignore json parse errors
    }

    throw new Error(message);
  }

  return response.json();
}

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(BASE_URL);
  return handleResponse<Task[]>(response);
}

export async function createTask(taskData: CreateTaskBody): Promise<Task> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  return handleResponse<Task>(response);
}

export async function updateTask(
  id: number,
  taskData: UpdateTaskBody
): Promise<Task> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  return handleResponse<Task>(response);
}

export async function deleteTask(id: number): Promise<{ message: string }> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  return handleResponse<{ message: string }>(response);
}

export async function toggleTask(id: number): Promise<Task> {
  const response = await fetch(`${BASE_URL}/${id}/toggle`, {
    method: "PATCH",
  });

  return handleResponse<Task>(response);
}