import type { TaskFilter as TaskFilterType } from "../types/task";

interface TaskFilterProps {
  value: TaskFilterType;
  onChange: (filter: TaskFilterType) => void;
}

function TaskFilter({ value, onChange }: TaskFilterProps) {
  return (
    <div className="app-toolbar">
      <button
        type="button"
        onClick={() => onChange("all")}
        disabled={value === "all"}
      >
        All
      </button>

      <button
        type="button"
        onClick={() => onChange("completed")}
        disabled={value === "completed"}
      >
        Completed
      </button>

      <button
        type="button"
        onClick={() => onChange("pending")}
        disabled={value === "pending"}
      >
        Pending
      </button>
    </div>
  );
}

export default TaskFilter;