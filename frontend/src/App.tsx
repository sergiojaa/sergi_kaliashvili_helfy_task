import { useEffect, useMemo, useState } from "react";
import TaskFilter from "./components/TaskFilter";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import {
  createTask,
  deleteTask,
  getTasks,
  toggleTask,
  updateTask,
} from "./services/tasksApi";
import "./styles/app.css";
import type {
  CreateTaskBody,
  Task,
  TaskFilter as TaskFilterType,
} from "./types/task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilterType>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        setError("");

        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load tasks");
        }
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  async function handleCreateTask(taskData: CreateTaskBody) {
    const newTask = await createTask(taskData);
    setTasks((currentTasks) => [newTask, ...currentTasks]);
  }

  function handleStartEdit(task: Task) {
    setEditingTask(task);
  }

  function handleCancelEdit() {
    setEditingTask(null);
  }

  async function handleSubmitTask(taskData: CreateTaskBody) {
    if (editingTask) {
      const updatedTask = await updateTask(editingTask.id, taskData);

      setTasks((currentTasks) =>
        currentTasks.map((task) => {
          if (task.id === editingTask.id) {
            return updatedTask;
          }

          return task;
        })
      );

      setEditingTask(null);
      return;
    }

    await handleCreateTask(taskData);
  }

  async function handleToggleTask(id: number) {
    const updatedTask = await toggleTask(id);

    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id === id) {
          return updatedTask;
        }

        return task;
      })
    );
  }

  async function handleDeleteTask(id: number) {
    await deleteTask(id);

    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));

    if (editingTask && editingTask.id === id) {
      setEditingTask(null);
    }
  }

  const filteredTasks = useMemo(() => {
    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    }

    if (filter === "pending") {
      return tasks.filter((task) => !task.completed);
    }

    return tasks;
  }, [tasks, filter]);

  return (
    <div className="app">
      <div className="app-container">
        <h1 className="app-title">Task Manager</h1>

        <TaskForm
          onSubmit={handleSubmitTask}
          initialValues={editingTask}
          isEditing={Boolean(editingTask)}
          onCancel={handleCancelEdit}
        />

        <TaskFilter value={filter} onChange={setFilter} />

        {loading && <p>Loading tasks...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && (
          <>
            <p>Total tasks: {filteredTasks.length}</p>
            <TaskList
              tasks={filteredTasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onEdit={handleStartEdit}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;