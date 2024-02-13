import { Task } from "./types/task";

const baseUrl = "http://localhost:4001";

export const getAllTodos = async (): Promise<Task[]> => {
    const response = await fetch(`${baseUrl}/api/todos`, { cache: "no-store" });
    const todos = await response.json();
    return todos;
};

export const addNewTodo = async (todo: string): Promise<string> => {
    const response = await fetch(`${baseUrl}/api/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: todo
        }),
    });
    const newTodo = await response.json();
    return newTodo;
}

export const deleteTodo = async (id: string): Promise<string> => {
    const response = await fetch(`${baseUrl}/api/todos/${id}`, {
        method: "DELETE",
    });
    const deletedTodo = await response.json();
    return deletedTodo;
}

export const editTodo = async (task: Task): Promise<Task> => {
    const response = await fetch(`${baseUrl}/api/todos/${task.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: task.name,
            complete: task.completed,
        }),
    });
    const editedTodo = await response.json();
    return editedTodo;
}
