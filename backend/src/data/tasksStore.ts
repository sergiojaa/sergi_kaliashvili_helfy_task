import { Task } from "../types/task";

export const tasks: Task[] = [
  {
    id: 1,
    title: "Review the requirements",
    description: "Go through the details and make sure nothing is missing",
    completed: false,
    createdAt: new Date(),
    priority: "high",
  },
  {
    id: 2,
    title: "Practice guitar",
    description: "Spend some time working on the new chords",
    completed: false,
    createdAt: new Date(),
    priority: "medium",
  },
];

let nextId = 3;

export function getNextId(): number {
  return nextId++;
}