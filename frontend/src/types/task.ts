export type Priority = "low" | "medium" | "high";

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  priority: Priority;
}

export interface CreateTaskBody {
  title: string;
  description: string;
  priority: Priority;
}

export interface UpdateTaskBody {
  title: string;
  description: string;
  priority: Priority;
}

export type TaskFilter = "all" | "completed" | "pending";