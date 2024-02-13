"use client";
import { Task } from "@/types/task";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";
import Modal from "./Modal";

interface TaskProps {
    task: Task;
}
const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter();
    const [isCompleted, setIsCompleted] = useState<boolean>(task.completed);
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [editTaskValue, setEditTaskValue] = useState(task.name);

    const handleCompleteTask = async () => {
        console.log("completing task" + task.name);
        await editTodo({
            id: task.id,
            name: task.name,
            completed: !isCompleted,
        });
        setIsCompleted(!isCompleted);
        router.refresh();
    }
    const handleSubmitEditTodo = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        console.log("editting task" + task.name);
        await editTodo({
            id: task.id,
            name: editTaskValue,
            completed: task.completed,
        });
        setOpenModalEdit(false);
        router.refresh();
    };
    const handleSubmitDeleteTodo = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        console.log("delete task" + task.name);
        await deleteTodo(task.id);
        setOpenModalDelete(false);
        router.refresh();
    };
    return (
        <tr key={task.id}>
            <th>
                <label>
                    <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={handleCompleteTask}
                        className="checkbox checkbox-success"
                    />
                </label>
            </th>
            <td className={`${isCompleted ? "line-through" : ""}`}>{task.name}</td>
            <td>
                <span className={`badge ${isCompleted ? "badge-success" : "badge-ghost"} badge-sm min-w-24`}>
                    {isCompleted ? "Done" : "Not started"}
                </span>
            </td>
            <th>
                <button
                    onClick={() => setOpenModalEdit(true)}
                    className="btn btn-primary btn-xs mr-3"
                >
                    edit
                </button>
                <Modal
                    modalOpen={openModalEdit}
                    setModalOpen={setOpenModalEdit}
                >
                    <form onSubmit={handleSubmitEditTodo}>
                        <h3 className="font-bold text-md">Edit task</h3>
                        <div className="modal-action">
                            <input
                                value={editTaskValue}
                                onChange={(e) =>
                                    setEditTaskValue(e.target.value)
                                }
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered input-primary w-full font-normal"
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary mt-4 w-full"
                        >
                            Submit
                        </button>
                    </form>
                </Modal>
                <button
                    onClick={() => setOpenModalDelete(true)}
                    className="btn bg-red-400 btn-xs"
                >
                    delete
                </button>
                <Modal
                    modalOpen={openModalDelete}
                    setModalOpen={setOpenModalDelete}
                >
                    <form onSubmit={handleSubmitDeleteTodo}>
                        <h3 className="font-bold text-xl">Are you sure, you want to delete this task?</h3>
                        <div className="modal-action">
                            <button
                                type="submit"
                                className="btn btn-error mt-4"
                            >
                                Delete
                            </button>
                            <button
                                type="button"
                                onClick={() => setOpenModalDelete(false)}
                                className="btn mt-4"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </Modal>
            </th>
        </tr>
    );
};

export default Task;
