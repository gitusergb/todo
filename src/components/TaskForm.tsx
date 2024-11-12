import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addTask } from "../redux/slices/tasksSlice";

const TaskForm: React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [completed, setCompleted] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newTask = { title, description, dueDate, completed };

        try {
            const response = await axios.post("http://localhost:5000/tasks", newTask);
            dispatch(addTask(response.data)); 
        } catch (error) {
            console.error("Error adding task:", error);
        }

        setTitle("");
        setDescription("");
        setDueDate("");
        setCompleted(false);
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <label>
                Completed
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                />
            </label>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
