import { LuDog } from "react-icons/lu";
import Task from "./Task";

interface TodoListProps {
    tasks: Task[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>
                            {/* <label>
                                <input type="checkbox" className="checkbox" />
                            </label> */}
                            <LuDog size={25}/>
                        </th>
                        <th>Tasks</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {tasks.map((task) => (
                        <Task key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TodoList;
