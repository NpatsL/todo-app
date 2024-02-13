import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import { getAllTodos } from "@/api";
import { FcTodoList } from "react-icons/fc";

export default async function Home() {
    const tasks = await getAllTodos();
    console.log(tasks);
    return (
        <main data-theme="cupcake">
            <div className="max-w-4xl mx-auto pt-4">
                <div className="text-center flex flex-col gap-4 my-5">
                    <h1 className="text-2xl font-bold">Todo List</h1>
                    <AddTask />
                </div>
                <TodoList tasks={tasks} />
            </div>
        </main>
    );
}
