import TaskItem from "./TaskItem";
import type { Task } from "../types/task";
import "../styles/list.css";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onEdit: (task: Task) => void;
}

function TaskList({ tasks, onToggle, onDelete, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="task-list-empty">No tasks found.</p>;
  }

  const shouldAnimate = tasks.length > 1;
  const carouselTasks = shouldAnimate ? [...tasks, ...tasks] : tasks;

  return (
    <section className="task-carousel">
      <div
        className={`task-carousel-track ${
          shouldAnimate ? "task-carousel-track-animated" : ""
        }`}
      >
        {carouselTasks.map((task, index) => (
          <div className="task-carousel-slide" key={`${task.id}-${index}`}>
            <TaskItem
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default TaskList;