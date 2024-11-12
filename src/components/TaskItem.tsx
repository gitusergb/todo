import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { deleteTask, updateTask } from "../redux/slices/tasksSlice";

interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
}

interface TaskItemProps {
    task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);
    const dispatch = useDispatch();

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`https://todo-backend-oidt.onrender.com/${task.id}`, editedTask);
            dispatch(updateTask(response.data));
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://todo-backend-oidt.onrender.com/${task.id}`);
            dispatch(deleteTask(task.id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };
    

 

    return (
        <div className="task-item">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editedTask.title}
                        onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                    />
                    <textarea
                        value={editedTask.description}
                        onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                    />
                    <input
                        type="date"
                        value={editedTask.dueDate}
                        onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                    />
                    <label>
                        Completed
                        <input
                            type="checkbox"
                            checked={editedTask.completed}
                            onChange={(e) => setEditedTask({ ...editedTask, completed: e.target.checked })}
                        />
                    </label>
                    <button onClick={handleUpdate}>Save</button>
                </div>
            ) : (
                <div>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>{task.dueDate}</p>
                    <p>{task.completed ? "Completed" : "Pending"}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </div>
            )}

                <button onClick={handleDelete}>Delete</button>
        </div>

    );
};

export default TaskItem;
