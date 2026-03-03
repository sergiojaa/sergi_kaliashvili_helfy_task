
import { useEffect, useState, type FormEvent } from "react";
import "../styles/form.css";
import type { CreateTaskBody, Priority, Task } from "../types/task";

interface TaskFormProps {
  onSubmit: (taskData: CreateTaskBody) => Promise<void>;
  initialValues?: Task | null;
  isEditing?: boolean;
  onCancel?: () => void;
}

function TaskForm({
  onSubmit,
  initialValues = null,
  isEditing = false,
  onCancel,
}: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title);
      setDescription(initialValues.description);
      setPriority(initialValues.priority);
      setError("");
      return;
    }

    setTitle("");
    setDescription("");
    setPriority("medium");
    setError("");
  }, [initialValues]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        priority,
      });

      if (!isEditing) {
        setTitle("");
        setDescription("");
        setPriority("medium");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to save task");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2 className="task-form-title">
        {isEditing ? "Edit Task" : "Add Task"}
      </h2>

      <div className="task-form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter task title"
        />
      </div>

      <div className="task-form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Enter task description"
          rows={4}
        />
      </div>

      <div className="task-form-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(event) => setPriority(event.target.value as Priority)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {error && <p className="task-form-error">{error}</p>}

      <div className="task-form-actions">
        <button
          className="task-form-button"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Saving..."
            : isEditing
            ? "Save Changes"
            : "Add Task"}
        </button>

        {isEditing && onCancel && (
          <button
            className="task-form-button task-form-cancel-button"
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;