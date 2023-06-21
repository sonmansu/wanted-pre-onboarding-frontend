import { axiosClient } from "../apiClient";

export function getTodos() {
    return axiosClient.get("/todos");
}

export function createTodo(todo: string) {
    return axiosClient.post("/todos", { todo });
}
export function updateTodo(id: number, todo: string, isCompleted: boolean) {
    return axiosClient.put(`/todos/${id}`, { todo, isCompleted });
}
export function deleteTodo(id: number) {
    return axiosClient.delete(`/todos/${id}`);
}
