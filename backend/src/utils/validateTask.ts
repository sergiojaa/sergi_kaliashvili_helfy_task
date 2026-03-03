export function validateTaskInput(
    title: unknown,
    description: unknown,
    priority: unknown
  ): string | null {
    if (typeof title !== "string" || title.trim() === "") {
      return "Title is required";
    }
  
    if (typeof description !== "string" || description.trim() === "") {
      return "Description is required";
    }
  
    if (
      priority !== "low" &&
      priority !== "medium" &&
      priority !== "high"
    ) {
      return "Priority must be low, medium, or high";
    }
  
    return null;
  }