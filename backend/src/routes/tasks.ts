import { Router } from "express";
import { tasks, getNextId } from "../data/tasksStore";
import { CreateTaskBody, UpdateTaskBody, Priority } from "../types/task";
import { validateTaskInput } from "../utils/validateTask";
import { parseTaskId } from "../utils/parseTaskId";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json(tasks);
});

router.post("/", (req, res) => {
  const { title, description, priority } = req.body as Partial<CreateTaskBody>;

  const error = validateTaskInput(title, description, priority);

  if (error) {
    return res.status(400).json({ message: error });
  }

  const safeTitle = title as string;
  const safeDescription = description as string;
  const safePriority = priority as Priority;

  const newTask = {
    id: getNextId(),
    title: safeTitle.trim(),
    description: safeDescription.trim(),
    completed: false,
    createdAt: new Date(),
    priority: safePriority,
  };

  tasks.push(newTask);

  return res.status(201).json(newTask);
});

router.put("/:id", (req, res) => {
    const taskId = parseTaskId(req.params.id);
  
    if (taskId === null) {
      return res.status(400).json({ message: "Invalid task id" });
    }
  
    const task = tasks.find((item) => item.id === taskId);
  
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
  
    const { title, description, priority } = req.body as Partial<UpdateTaskBody>;
  
    const error = validateTaskInput(title, description, priority);
  
    if (error) {
      return res.status(400).json({ message: error });
    }
  
    task.title = (title as string).trim();
    task.description = (description as string).trim();
    task.priority = priority as Priority;
  
    return res.status(200).json(task);
  });

  router.delete("/:id", (req, res) => {
    const taskId = parseTaskId(req.params.id);
  
    if (taskId === null) {
      return res.status(400).json({ message: "Invalid task id" });
    }
  
    const taskIndex = tasks.findIndex((item) => item.id === taskId);
  
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }
  
    tasks.splice(taskIndex, 1);
  
    return res.status(200).json({ message: "Task deleted successfully" });
  });

  router.patch("/:id/toggle", (req, res) => {
    const taskId = parseTaskId(req.params.id);
  
    if (taskId === null) {
      return res.status(400).json({ message: "Invalid task id" });
    }
  
    const task = tasks.find((item) => item.id === taskId);
  
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
  
    task.completed = !task.completed;
  
    return res.status(200).json(task);
  });

export default router;