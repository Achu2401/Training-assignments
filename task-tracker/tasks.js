export function getTasks() {
    const data = localStorage.getItem("tasks");
    return data ? JSON.parse(data) : [];
}
export function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
export function generateId() {
    return Date.now();
}
export function formatDate(date) {
    return new Date(date).toLocaleDateString();
}
