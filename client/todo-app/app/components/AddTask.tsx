"use client";

import { IoIosAddCircle } from "react-icons/io";
import Modal from "./Modal";
import { useState } from "react";
import { addNewTodo } from "@/api";
import { useRouter } from "next/navigation";

const AddTask = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [newTaskValue, setNewTaskValue] = useState<string>("");
    const handleSubmitNewTodo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitting new task");
        await addNewTodo(newTaskValue);
        setNewTaskValue("");
        setModalOpen(false);
        router.refresh();
    };
    return (
        <div>
            <button
                onClick={() => setModalOpen(true)}
                className="btn btn-secondary w-full"
            >
                Add new task
                <IoIosAddCircle size={18} />
            </button>

            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={handleSubmitNewTodo}>
                    <h3 className="font-bold text-md">Add new task</h3>
                    <div className="modal-action">
                        <input
                            value={newTaskValue}
                            onChange={(e) => setNewTaskValue(e.target.value)}
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered input-primary w-full"
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
        </div>
    );
};

export default AddTask;
