import { axiosClient } from "../apiClient";

export function getTodos() {
    return axiosClient.get("/todos", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
}

export function createTodo(todo: string) {
    return axiosClient.post(
        "/todos",
        { todo },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }
    );
}
export function updateTodo(id: number, todo: string, isCompleted: boolean) {
    return axiosClient.put(
        `/todos/${id}`,
        { todo, isCompleted },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }
    );
}
export function deleteTodo(id: number) {
    return axiosClient.delete(`/todos/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
}
