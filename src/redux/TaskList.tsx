import axios from "axios";
import { useDispatch } from "react-redux";
import { addTask } from "./slices/tasksSlice";
import { useEffect } from "react";

interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
}

useEffect(() => {
    axios.get("http://localhost:5000/tasks")
        .then(response => dispatch(addTask(response.data)))
        .catch(error => console.error("Error loading tasks", error));
}, [dispatch]);
function dispatch(arg0: { payload: Task; type: "tasks/addTask"; }): any {
    throw new Error("Function not implemented.");
}

