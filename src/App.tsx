import React from "react";
import "./App.css";
import { useSelector } from "react-redux";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem"; 
import { RootState } from "./redux/store";

const App: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do App</h1>
        
        {/* TaskForm for adding new tasks */}
        <TaskForm />

        {/* Task list */}
        <ul className="task-list">
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      </header>
    </div>
  );
};

export default App;
