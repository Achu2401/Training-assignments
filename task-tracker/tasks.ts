export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
}

export function getTasks(): Task[] {
  const data = localStorage.getItem("tasks");
  return data ? JSON.parse(data) : [];
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function generateId(): number {
  return Date.now();
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString();
}