import type { Task } from "../types/task";
import "../styles/item.css";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onEdit: (task: Task) => void;
}

function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  async function handleDelete() {
    const shouldDelete = window.confirm("Are you sure you want to delete this task?");

    if (!shouldDelete) {
      return;
    }

    await onDelete(task.id);
  }

  return (
    <article className={`task-item ${task.completed ? "task-item-completed" : ""}`}>
      <div className="task-item-header">
        <h3 className="task-item-title">{task.title}</h3>
        <span className={`task-item-priority task-item-priority-${task.priority}`}>
          {task.priority}
        </span>
      </div>

      <p className="task-item-description">{task.description}</p>

      <div className="task-item-footer">
        <span className="task-item-status">
          {task.completed ? "Completed" : "Pending"}
        </span>

        <span className="task-item-date">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="task-item-actions">
        <button
          className="task-item-button"
          type="button"
          onClick={() => onToggle(task.id)}
        >
          {task.completed ? "Mark as Pending" : "Mark as Completed"}
        </button>

        <button
          className="task-item-button"
          type="button"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          className="task-item-button task-item-button-danger"
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskItem;